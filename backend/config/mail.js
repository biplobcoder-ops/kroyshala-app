const nodemailer = require("nodemailer");
const { smtp_User, smtp_Password } = require("../constants/secret");

// ==========================================
// SMTP Transporter (Only Transport)
// ==========================================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtp_User,
    pass: smtp_Password,
  },
});

module.exports = transporter;