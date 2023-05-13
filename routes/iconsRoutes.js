const express = require('express');
const router = express.Router();
const needle = require('needle');
const dotenv = require('dotenv');
dotenv.config();

const ICON_URL = process.env.ICON_URL;
router.get('/', async (req, res) => {
     icon = await needle('get', `${ICON_URL}`);
    try {
        res.send(icon.body);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;



