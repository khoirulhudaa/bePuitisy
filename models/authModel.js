const mongoose = require('mongoose')

const authModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'super-sub-admin'
    },  
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('account', authModel)
