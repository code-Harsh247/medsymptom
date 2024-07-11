const express = require('express');
const cors = require('cors');
require('dotenv').config();
const langflowAPI = require('./langflowAPI');

const app = express();
app.use(cors());
app.use(express.json());

const convertToJSON = (input) => {
    try {
        // Split the input string into an array of condition descriptions
        const conditions = input.output.split('\n\n');
        
        // Parse each condition into an object
        const jsonOutput = conditions.map(condition => {
            const lines = condition.split('\n');
            const conditionObj = {};
            lines.forEach(line => {
                if (line.includes(':')) {
                    let [key, value] = line.split(': ');
                    key = key.replace(/^\d+\./, '').trim(); // Remove numbering if present
                    // Remove extra quotes, backslashes, and trailing commas
                    value = value.replace(/^"|"$/g, '').replace(/\\"/g, '"').replace(/\\$/, '').trim();
                    conditionObj[key] = value;
                }
            });
            return conditionObj;
        }).filter(condition => Object.keys(condition).length > 0);  // Remove any empty objects

        // Return the structured JSON
        return JSON.stringify(jsonOutput, null, 2);
    }
    catch (error) {
        console.error('Error in convertToJSON:', error);
        throw error;
    }
}


app.post('/diagnose', async (req, res) => {
    try {
        const { age, gender, medicalHistory, symptoms } = req.body;
        console.log(req.body);
        const output = await langflowAPI.getDiagnosis(age, gender, medicalHistory, symptoms);
        // const jsonOutput = convertToJSON({output});
        // console.log(jsonOutput);
        res.send({output});
    } catch (error) {
        console.error('Error in /diagnose route:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});