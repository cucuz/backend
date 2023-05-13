const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        
    },
    subscriberId: {
        type: String,
        id: true
    },
    
    read: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'subscribers'
    },

},
 { timestamps: true
    
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
