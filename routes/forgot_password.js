const express = require('express');
const router = express.Router();
const conn = require('../config/Database');
var crypto = require('crypto');

//require('dotenv').config();


const nodemailer = require('nodemailer');

 router.post('/forgotPassword', ( req,res) => {
  const email_address = req.body.email_address;
  if (email_address ==='') {
    response.send('Please enter email ');
                           } 
    conn.query('SELECT email_address FROM users WHERE email_address = ? ', [email_address],
     function(error, results, fields) {
      if (results.length == 0) {
				response.send('email not in database');
                               }
            

  
   else {         
      const token = crypto.randomBytes(20).toString('hex');

        router.put('/forgotPassword', (req, res) => {
          const  resetPasswordExpires= Date.now() + 3600000;
          conn.query(`UPDATE users SET resetPasswordToken= '${token}' , resetPasswordExpires= '${resetPasswordExpires}'`, function (err, results) {
            
          });
        })
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'ned.fyp1221@gmail.com',
            pass: 'nedfypct1221',
          },
        });

        const mailOptions = {
          from: 'ned.fyp1221@gmail.com',
          to: `${results.email_address}`,
          subject: 'Link To Reset Password',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:4000/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      }
    });
  });
  module.exports=router;