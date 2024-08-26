const mongoose = require('mongoose')

const authModel = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    penName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'writer'
    },  
    password: {
        type: String,
        required: true
    },
    bionarasi: {
        type: String,
        default: '-'
    },
    instagram: {
        type: String,
        default: '-'
    },
    year: {
        type: String,
        default: '-'
    },
    gender: {
        type: String,
        default: '-'
    },
    avatar: {
        type: String,
        default: 'default'
    },
    country: {
        type: String,
        default: 'Indonesia'
    },
    tokenResetPassword: {
        type: String,
        default: '-'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('account', authModel)
