const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();




router.get('/', async (req, res, next) => {

    try {
        const ContactForm = require('../models/contactForm');
        const contactForm = await ContactForm.find();
        res.json(contactForm);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    
    
    }
});






module.exports = router;