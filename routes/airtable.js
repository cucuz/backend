const express = require('express');
const router = express.Router();




router.get('/', async (req, res, next) => {
// get data from mongodb
const Subscriber = require('../models/newsletter');
const subscribers = await Subscriber.find();
res.json(subscribers);


});

// post the email to the latest subscribers data to the api



module.exports = router;