const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Received form data:', { name, email, message }); // Log received data

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Set up email options
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Submission from portfolio',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log error
            return res.status(500).send('Error: ' + error.message);
        }
        console.log('Email sent:', info.response); // Log success
        res.send('Message sent successfully!');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
