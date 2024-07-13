require('dotenv').config();
const express = require('express');
const cors = require('cors');
const langflowAPI = require('./langflowAPI');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000; // Default to 4000 if PORT is not set
console.log(`Port: ${port}`);

app.get('/', (req, res) => {
    res.send('This is the medSymptom API');
});

app.post('/diagnose', async (req, res) => {
    try {
        const { age, gender, medicalHistory, symptoms } = req.body;
        console.log(req.body);
        const output = await langflowAPI.getDiagnosis(age, gender, medicalHistory, symptoms);
        res.send({ output });
    } catch (error) {
        console.error('Error in /diagnose route:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
