const PoetryModel = require('../models/poetryModel');
const BookModel = require('../models/bookModel');
const crypto = require('crypto');

const createPoetry = async (req, res) => {
  try {
    const { title, originalWork, author, cover, typeNumberBook, numberBook, genre, source, publish, timeMarker, content } = req.body;

    // Generate a random token for poetry ID
    const tokenRandom = crypto.randomBytes(7).toString('hex');
    
    // Create a new poetry entry
    const newPoetry = new PoetryModel({
      poetry_id: tokenRandom,
      title,
      authorId: req.params.user_id,
      book_id: req.params.book_id,
      originalWork,
      typeNumberBook,
      numberBook,
      genre,
      author,
      cover,
      source,
      publish,
      timeMarker,
      content
    });

    // Save to the database
    await newPoetry.save();
    
    return res.json({ status: 200, message: 'Successfully created poetry!' });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to created poetry!', error: error.message });
  }
};

const getAllPoetry = async (req, res) => {
  try {
    // Retrieve all poetry records
    const poetryList = await PoetryModel.find();
    
    if (poetryList.length === 0) {
      return res.json({ status: 404, message: 'No poetry data found!' });
    }

    return res.json({ status: 200, message: 'Successfully retrieved poetry data', data: poetryList });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve poetry data!', error: error.message });
  }
};

const getAllPoetryByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    // Retrieve all poetry records
    const poetryList = await PoetryModel.find({ authorId });
    
    if (poetryList.length === 0) {
      return res.json({ status: 404, message: 'No poetry data found!' });
    }

    return res.json({ status: 200, message: 'Successfully retrieved poetry data', data: poetryList });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve poetry data!', error: error.message });
  }
};

const getAllPoetryByBookId = async (req, res) => {
  try {
    const { book_id } = req.params;

    // Retrieve all poetry records
    const poetryList = await PoetryModel.find({ book_id });
    
    if (poetryList.length === 0) {
      return res.json({ status: 404, message: 'No poetry data found!' });
    }

    return res.json({ status: 200, message: 'Successfully retrieved poetry data', data: poetryList });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve poetry data!', error: error.message });
  }
};

const updatePoetry = async (req, res) => {
  try {
    const { poetry_id } = req.params;
    console.log(poetry_id)
    const { title, originalWork, author, cover, typeNumberBook, numberBook, genre, source, publish, timeMarker, content } = req.body;

    // Find the existing poetry by ID
    const existPoetry = await PoetryModel.findOne({ poetry_id });
    if (!existPoetry) {
      return res.json({ status: 404, message: 'Poetry not found!' });
    }

    // Update the fields
    existPoetry.title = title;
    existPoetry.originalWork = originalWork;
    existPoetry.typeNumberBook = typeNumberBook;
    existPoetry.numberBook = numberBook;
    existPoetry.genre = genre;
    existPoetry.author = author;
    existPoetry.cover = cover;
    existPoetry.source = source;
    existPoetry.publish = publish;
    existPoetry.timeMarker = timeMarker;
    existPoetry.content = content;

    // Save the updated poetry data
    const updatedPoetry = await existPoetry.save();
    
    return res.json({ status: 200, message: 'Successfully updated poetry!', data: updatedPoetry });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to update poetry!', error: error.message });
  }
};

const removePoetry = async (req, res) => {
  try {
    const { poetry_id } = req.params;

    // Find and delete the poetry by ID
    const deletedPoetry = await PoetryModel.findOneAndDelete({ poetry_id });
    if (!deletedPoetry) {
      return res.json({ status: 404, message: 'Poetry not found!' });
    }

    return res.json({ status: 200, message: 'Successfully deleted poetry!', data: deletedPoetry });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to delete poetry!', error: error.message });
  }
};

const removePoetryByBookId = async (req, res) => {
  try {
      const { book_id } = req.params;

      // Find the book by ID
      const book = await BookModel.findOne({ book_id });
      if (!book) {
          return res.json({ status: 404, message: 'Book not found!' });
      }

      // Delete all poetry related to the book
      const result = await PoetryModel.deleteMany({ book_id });

      // Delete the book regardless of whether any poetry was deleted or not
      await BookModel.deleteOne({ book_id });

      // Provide response with deleted poetry count and confirm book deletion
      return res.json({ status: 200, message: 'Successfully deleted all poetry related to the book and the book itself!'});
  } catch (error) {
      return res.json({ status: 500, message: 'Failed to delete poetry and/or book!', error: error.message });
  }
};

module.exports = {
  createPoetry,
  getAllPoetry,
  getAllPoetryByBookId,
  getAllPoetryByAuthorId,
  updatePoetry,
  removePoetry,
  removePoetryByBookId,
};
