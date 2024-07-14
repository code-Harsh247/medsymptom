const express = require('express');
const cors = require('cors');
require('dotenv').config();
const langflowAPI = require('./langflowAPI');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send(`${process.env.LANGFLOW_DOMAIN}`);
});

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});