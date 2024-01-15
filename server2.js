const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/logindata'; // Replace with your actual MongoDB URI
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/login', async (req, res) => {
    const { mobile, otp } = req.body;

    // Insert the login data into the MongoDB database
    try {
        await client.connect();
        const database = client.db('logindata'); // Replace with your actual database name
        const collection = database.collection('mydb');

        // Insert the login data
        await collection.insertOne({
            mobile: mobile,
            otp: otp,
            timestamp: new Date(),
        });

        res.status(200).json({ success: true, message: 'Login data stored successfully.' });
    } catch (error) {
        console.error('Error storing login data:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
