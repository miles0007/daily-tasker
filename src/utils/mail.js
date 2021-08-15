
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP

  auth: {
    user: "cyborgv.2@hotmail.com",
    pass: process.env.BOT_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  }
});

const sendEmail = async (mailDetails) => {
  await mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      console.log("Error Occurs on Sending Email", err);
    } else {
      console.log("Email Sent Successfully.", data.response);
    }
  });
};

module.exports = sendEmail;