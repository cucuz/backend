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
app.use('/api/weather', require('./backend/routes/weather'));
app.use('/api/contactform', require('./backend/routes/contactForm'));
app.use('/api/newsletter', require('./backend/routes/subscribers'));

app.use('/api/analytics', require('./backend/routes/Visitors'));

app.use('/api/list', require('./backend/routes/airtable'));
app.use('/customers', require('./backend/routes/customerQueries'));
app.use('/api/goals', require('./backend/routes/goalRoutes'));
app.use('/api/users', require('./backend/routes/userRoutes'));
//location data
app.use('/api/location', require('./backend/routes/locationRoutes'));
//icons
app.use('/api/icon', require('./backend/routes/iconsRoutes'));



app.listen(port, () => console.log(`Server running on port ${port}`.yellow.bold));




