const bookModel = require('../models/bookModel');
const crypto = require('crypto');

const createBook = async (req, res) => {
  try {
     // Validate if cover file exists
     if (!req.file) {
      return res.json({ status: 400, message: 'Cover is required!' });
    }

    // Check if the file format is valid (e.g. jpg, jpeg, png)
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validFormats.includes(req.file.mimetype)) {
          return res.json({ status: 400, message: 'Invalid file format! Only jpg, jpeg, and png are allowed.' });
    }

    const { title, theme, synopsis, year, authorName } = req.body;
    const tokenRandom = crypto.randomBytes(10).toString('hex');
    
    // Create a new book entry
    const newBook = new bookModel({
      book_id: tokenRandom,
      title,
      theme,
      synopsis,
      authorName,
      year,
      cover: req.file.path,
      authorId: req.params.user_id
    });

    // Save to th   e database
    await newBook.save();
    
    return res.json({ status: 200, message: 'Successfully added book!' });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to add book!', error: error.message });
  }
};

const getAllBook = async (req, res) => {
  try {
    // Retrieve all book records
    const bookList = await bookModel.find();
    
    if (bookList.length === 0) {
      return res.json({ status: 404, message: 'No book data found!' });
    }

    return res.json({ status: 200, message: 'Successfully retrieved book data', data: bookList });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve book data!', error: error.message });
  }
};

const getBookById = async (req, res) => {
    try {
      const { book_id } = req.params;
  
      const existBook = await bookModel.findOne({ book_id });
      if (!existBook) return res.json({ status: 404, message: 'Book not found!' });
  
      return res.json({ status: 200, message: 'Successfully retrieved book', data: existBook });
    } catch (error) {
      return res.json({ status: 500, message: 'Failed to retrieve book', error: error.message });
    }
};

const getBookByAuthorId = async (req, res) => {
    try {
      const { user_id } = req.params;
  
      const existBook = await bookModel.find({ authorId: user_id });
      if (!existBook) return res.json({ status: 404, message: 'Book not found!' });
  
      return res.json({ status: 200, message: 'Successfully retrieved book', data: existBook });
    } catch (error) {
      return res.json({ status: 500, message: 'Failed to retrieve book', error: error.message });
    }
};

const updateBook = async (req, res) => {
  try {
    const { book_id } = req.params;
    console.log(book_id)
    const { title, authorName, year, synopsis, theme } = req.body;

    // Find the existing book by ID
    const existbook = await bookModel.findOne({ book_id });
    if (!existbook) {
      return res.json({ status: 404, message: 'book not found!' });
    }

    // Update the fields only if they are provided
    if (authorName) existbook.authorName = authorName;
    if (title) existbook.title = title;
    if (year) existbook.year = year;
    if (theme) existbook.theme = theme;
    if (synopsis) existbook.synopsis = synopsis;

    // Handle cover update if file is provided
    if (req.file) {
      try {
        // Delete the old cover from cloudinary
        if (existbook.cover) {
          await cloudinary.uploader.destroy(existbook.cover);
        }
        // Set the new cover path
        existbook.cover = req.file.path;
      } catch (error) {
        return res.status(500).json({ status: 500, message: 'Failed to update cover!', error: error.message });
      }
    }

    // Save the updated book data
    await existbook.save();
    
    return res.json({ status: 200, message: 'Successfully updated book!' });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to update book!', error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  getBookByAuthorId
};
