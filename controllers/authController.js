const authModel = require('../models/authModel');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const cloudinary = require('../config/cloudinary');

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await authModel.findOne({ email });
    if (!existUser) return res.json({ status: 404, message: 'Account not found!' });

    const isMatch = password === existUser.password;
    if (!isMatch) return res.json({ status: 401, message: 'Incorrect password!' });

    const token = jsonwebtoken.sign({ user_id: existUser.user_id }, 'puitisy', { expiresIn: '12h' });

    return res.json({ status: 200, message: 'Successfully signed in!', token, data: existUser });
  } catch (error) {
    return res.json({ status: 500, message: 'Server error!', error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { penName, email, password } = req.body;

    const existUser = await authModel.findOne({ email });
    if (existUser) return res.json({ status: 400, message: 'Email already in use!' });

    const tokenRandom = crypto.randomBytes(17).toString('hex');

    const newUser = new authModel({
      user_id: tokenRandom,
      penName,
      email,
      password
    });

    await newUser.save();
    return res.json({ status: 200, message: 'Successfully registered at Puitisy!' });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to sign up', error: error.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const users = await authModel.find();
    if (!users) return res.json({ status: 404, message: 'No data available!' });

    return res.json({ status: 200, message: 'Successfully retrieved data', data: users });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve data', error: error.message });
  }
};

const updateAccount = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const { penName, country, gender, year, bionarasi, instagram } = req.body;


      console.log(req.body)
      console.log(req.params)
      const existUser = await authModel.findOne({ user_id });
      if (!existUser) {
        return res.status(404).json({ status: 404, message: 'Account not found!' });
      }
      
      if (existUser.avatar && (existUser.avatar !== 'default' || existUser.avatar !== '-')) {
        await cloudinary.uploader.destroy(existUser.avatar);
      }
  
      existUser.penName = penName;
      existUser.country = country;
      existUser.gender = gender;
      existUser.year = year;
      existUser.bionarasi = bionarasi;
      existUser.instagram = instagram;
  
      if (req.file) {
        existUser.avatar = req.file.path; // URL gambar yang di-upload
      }
  
      await existUser.save();
  
      return res.status(200).json({ status: 200, message: 'Account successfully updated!' });
    } catch (error) {
      console.error('Error updating account:', error);
      return res.status(500).json({ status: 500, message: 'Failed to update account', error: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
      const user_id = req.params.user_id;
      const { newPassword } = req.body;


      const existUser = await authModel.findOne({ user_id });
      if (!existUser) {
        return res.status(404).json({ status: 404, message: 'Account not found!' });
      }
      
      existUser.password = newPassword;
      existUser.tokenResetPassword = '-';
  
      await existUser.save();
  
      return res.status(200).json({ status: 200, message: 'Password successfully updated!' });
    } catch (error) {
      console.error('Error updating account:', error);
      return res.status(500).json({ status: 500, message: 'Failed to update account', error: error.message });
    }
};

const removeAccount = async (req, res) => {
  try {
    const { user_id } = req.params;

    const existUser = await authModel.findOneAndDelete({ user_id });
    if (!existUser) return res.json({ status: 404, message: 'Account not found!' });

    return res.json({ status: 200, message: 'Account successfully deleted!', data: existUser });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to delete account', error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const { user_id } = req.params;

    const existUser = await authModel.findOne({ user_id });
    if (!existUser) return res.json({ status: 404, message: 'Account not found!' });

    return res.json({ status: 200, message: 'Successfully retrieved account', data: existUser });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve account', error: error.message });
  }
};

const getAccountByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const existUser = await authModel.findOne({ tokenResetPassword: token });
    if (!existUser) return res.json({ status: 404, message: 'Account not found!' });

    return res.json({ status: 200, message: 'Successfully retrieved account', data: existUser });
  } catch (error) {
    return res.json({ status: 500, message: 'Failed to retrieve account', error: error.message });
  }
};

module.exports = {
  signin,
  signup,
  getAllAccounts,
  updateAccount,
  updatePassword,
  removeAccount,
  getAccountByToken,
  getAccountById
};
