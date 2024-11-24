const dotenv = require('dotenv')
dotenv.config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
      user: process.env.SENDER,
      pass: process.env.PASS 
  }
});

module.exports = {transporter};