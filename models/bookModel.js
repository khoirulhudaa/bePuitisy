const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({
    book_id: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },  
    authorName: {
        type: String,
        required: true
    },  
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        default: '-'
    },
    theme: {
        type: String,
        default: '-'
    },
    cover: {
        type: String,
        default: 'default'
    },
    year: {
        type: String,
        default: '-'
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('book', bookModel)
