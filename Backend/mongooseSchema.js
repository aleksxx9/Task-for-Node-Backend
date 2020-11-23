const mongoose = require('mongoose');

const actionSchema = mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Log', actionSchema)