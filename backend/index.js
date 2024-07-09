const express = require('express');
const cors = require('cors');
require('dotenv').config();
const langflowAPI = require('./langflowAPI');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/diagnose', async (req, res) => {
    try {
        const { age, gender, medicalHistory, symptoms } = req.body;
        const output = await langflowAPI.getDiagnosis(age, gender, medicalHistory, symptoms);

        res.json({ output });
    } catch (error) {
        console.error('Error in /diagnose route:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});