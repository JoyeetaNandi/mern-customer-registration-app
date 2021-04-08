const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
    customer_description: {
        type: String
    },
    customer_responsible: {
        type: String
    },
    customer_priority: {
        type: String
    },
    customer_completed: {
        type: Boolean
    }
});

module.exports = mongoose.model('Customer', Customer);