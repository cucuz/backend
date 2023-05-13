const mongoose = require('mongoose');

const contactForm = new mongoose.Schema({

 

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    
    },

    queryId: {
        type: String,
        id: true,
        unique: true
        
    },


    type: {
        type: String,
        default: 'queries'
    },
    //timestamp
},
{
  timestamps: true,
}

    
);

module.exports = mongoose.model('ContactForm', contactForm)