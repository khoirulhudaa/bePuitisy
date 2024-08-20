const authModel = require('../models/authModel')
const jsonwebtoken = require('jsonwebtoken')
const crypto = require('crypto')

const signin = async (req, res) => {
    try {

        const { email, password } = req.body

        const existUser = await authModel.findOne({ email })
        if(!existUser) return res.json({ status: 404, message: 'User tidak ditemukan!' })
       
        const isMatch = password === existUser.password
        if(!isMatch) return res.json({ status: 401, message: 'Kata sandi salah!' })

        const token = jsonwebtoken.sign({ user_id: existUser.email }, 'ecoNusantara', { expiresIn: '1h' })

        return res.json({ status: 200, message: 'Successfully signin!', token, data: existUser })

    } catch (error) {
        return res.json({ status: 200, message: 'Server bermasalah!', error: error.message })
    }
}

const signup = async (req, res) => {
    try {
        const { penName, email, password } = req.body
       
        const existUser = await authModel.findOne({ email })
        if(existUser) return res.json({ status: 400, message: 'Email sudah terpakai!' })
 
        const tokenRandom = crypto.randomBytes(6).toString('hex')
          
        const newuser = new authModel({
            user_id: tokenRandom,
            penName,
            email,
            password
        })

        await newuser.save()
        return res.json({ status: 200, message: 'Successfully Register at Puitisy!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Failed to signUp', error: error });
    }
}

const getAllUAccount = async (req,res) => {
    try {
        const existUser = await authModel.find()
        
        if(!authModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existUser })

    } catch (error) {
        return res.json({ status: 500, message: 'Failed to signUp', error: error });
    }
}

const updateAccount = async (req, res) => {
    try {

        const { user_id } = req.params
        const { username, email } = req.body

        const existUser = await authModel.findOne({ user_id })
        if(!existUser) return res.json({ status: 404, message: 'Data tidak ada!' })

        existUser.username = username
        existUser.email = email
        existUser.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
        
    } catch (error) {
        return res.json({ status: 500, message: 'Failed to signUp', error: error });
    }
}

const removeAccount = async (req, res) => {
    try {
        
        const { user_id } = req.params

        const existUser = await authModel.findOneAndDelete({ user_id })
        if(!existUser) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existUser })

    } catch (error) {
        return res.json({ status: 500, message: 'Failed to signUp', error: error });
    }
}

module.exports = {
    signin,
    signup,
    getAllUAccount,
    updateAccount,
    removeAccount
}