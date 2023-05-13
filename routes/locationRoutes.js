const express = require('express');
const router = express.Router();
const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();


const URL_JSON = process.env.URL_JSON;

router.get('/', async (req, res) => {

     location = await needle('get', `${URL_JSON}`);
    try {
        res.json(location.body);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
