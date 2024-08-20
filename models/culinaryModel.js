const mongoose = require('mongoose')

const culinaryModel = new mongoose.Schema({
    culinary_id: {
        type: String,
        required: true
    },
    name_culinary: {
        type: String,
        required: true
    },
    island: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: '-'
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('culinary', culinaryModel)
