const User = require('../models/authModel')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const path = require('path')
const fs = require('fs')

const createMessageEmailAllUser = async (req,res) => {
    try {

       console.log(req.body.email)
       const user = await User.findOne({ email: req.body.email });

       if (!user) {
           return res.json({ status: 404, message: 'Account not available!' });
       }

       console.log(0)
       const token = jwt.sign({ email: user.email }, 'puitisy', { expiresIn: '1h' });
       console.log(1)
       const transporter = nodemailer.createTransport({
           service: 'Gmail',
           auth: {
               user: 'puitisy@gmail.com',
               pass: 'nfyx aarf edgi htum'
            }
        })
        console.log(2)
        
        const cssPath = path.join(__dirname, '../styles/style.css');
        const cssStyles = fs.readFileSync(cssPath, 'utf8');
        console.log(3)
        
        const resetUrl = `http://localhost:3000/reset-password/${token}`; // Sesuaikan dengan URL reset password
        console.log(4)
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
                        <h2>Reset Your Password</h2>
                        <p>Hi there,</p>
                        <p>You requested a password reset. Please click the button below to reset your password:</p>
                        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
                        <p>If you did not request a password reset, please ignore this email.</p>
                        <br />
                        <p>Thank you,</p>
                        <p>Your Company Team</p>
                    </div>
                </body>
            </html>
        `;

        console.log(5)
        
        const mailOptions = {
            to: req.body.email,
            from: 'puitisy@gmail.com',
            subject: "Reset-password",
            html: emailContent
        }
        console.log(6)
  
        transporter.sendMail(mailOptions, async (err) => {
            if(err) return res.json({ status: 500, message: 'Gagal kirim email saat transfer!', error: err })
                
            user.tokenResetPassword = token;
            await user.save();            
            return res.json({ status: 200, message: 'Berhasil Kirim Pesan!' })
        })
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createMessageEmailAllUser,
}