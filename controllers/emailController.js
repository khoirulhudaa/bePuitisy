const Email = require('../models/emaiModel')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

const addNewEmail = async (req, res) => {
    try {
        const { email } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newEmail = new Email({
            email_id: tokenRandom,
            email,
        })

        await newEmail.save()
        return res.json({ status: 200, message: 'Berhasil kirim email!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const createMessageEmailAllUser = async (req,res) => {
    try {

        const { subject, message } = req.body
        const emails = await Email.find()

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'muhammadkhoirulhuda111@gmail.com',
                pass: 'pwdi hnbx usqq xwnh'
            }
        })
        
        const cssPath = path.join(__dirname, '../styles/style.css');
        const cssStyles = fs.readFileSync(cssPath, 'utf8');
        
        const emailContent = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        ${cssStyles}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>ecousantara - ${new Date().getFullYear()}!</h2>
                        <br />
                        <div className='custom-content' dangerouslySetInnerHTML={{ __html: ${message} }}></div>
                    </div>
                </body>
            </html>
        `;
  
        const mailOptions = {
            to: emails.map(data => data.email).join(','),
            from: 'ecoNusantara111@gmail.com',
            subject: subject,
            html: emailContent
        }
  
        transporter.sendMail(mailOptions, async (err) => {
            if(err) return res.json({ status: 500, message: 'Gagal kirim email saat transfer!', error: err })
            
            return res.json({ status: 200, message: 'Berhasil Kirim Pesan!' })
        })
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllEmail = async (req, res) => {
    try {
        const existEmail = await Email.find()
        
        if(!existEmail) return res.json({ status: 404, message: 'Email belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil email', data: existEmail })
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeEmailUser = async (req, res) => {
    try {
        const { email_id } = req.params

        const existEmail = await Email.findOneAndDelete({ email_id })
        if(!existEmail) return res.json({ status: 404, message: 'Email tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existEmail })
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createMessageEmailAllUser,
    getAllEmail,
    removeEmailUser,
    addNewEmail
}