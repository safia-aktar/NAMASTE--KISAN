const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/verify-otp', (req, res) => {
    const { mobile, otp } = req.body;

    // In a real application, you would verify the OTP against the generated OTP on the server.
    // For simplicity, let's assume the verification is successful.
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});