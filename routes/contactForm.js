// submit form data to mongodb database

const express = require('express');
const router = express.Router();
const ContactForm = require('../models/contactForm');
const dotenv = require('dotenv');
dotenv.config();


router.post('/', (req, res) => {
    const newContactForm = new ContactForm({
       // insert items and add date using GMT +3 time
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
        date: new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' })
        
    });



    
    newContactForm.save()
        .then(contactForm => res.json(contactForm))
        .catch(err => console.log(err));
    }

    // if email exists, send error message



    
);




module.exports = router;
