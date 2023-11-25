var session = require('express-session')
const express = require('express'); 
const helmet = require("helmet");
const connectDB = require('./config/db');
const cors = require('cors');
const port =  process.env.PORT ||5000;
const dotenv = require('dotenv');
const colors = require('colors');





const app = express(); 

app.use(helmet.xssFilter())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(cors());

connectDB();
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/weather', require('./routes/weather'));
app.use('/api/contactform', require('./routes/contactForm'));
app.use('/api/newsletter', require('./routes/subscribers'));

app.use('/api/analytics', require('./routes/Visitors'));

app.use('/api/list', require('./routes/airtable'));
app.use('/customers', require('./routes/customerQueries'));
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
//location data
app.use('/api/location', require('./routes/locationRoutes'));
//icons
app.use('/api/icon', require('./routes/iconsRoutes'));



app.listen(port, () => console.log(`Server running on port ${port}`.yellow.bold));




