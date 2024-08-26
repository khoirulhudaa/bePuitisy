const mongoose = require('mongoose')

const poetryModel = new mongoose.Schema({
    poetry_id: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },  
    book_id: {
        type: String,
        required: true
    },  
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: '-'
    },
    originalWork: {
        type: String,
        default: '-'
    },
    source: {
        type: String,
        default: '-'
    },
    publish: {
        type: String,
        default: '-'
    },
    typeNumberBook: {
        type: String,
        default: '-'
    },
    numberBook: {
        type: String,
        default: '-'
    },
    timeMarker: {
        type: String,
        default: '-'
    },
    cover: {
        type: String,
        default: '-'
    },
    author: {
        type: String,
        default: '-'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('poetry', poetryModel)
