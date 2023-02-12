const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SERVICE,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

exports.sendEmail = async (to, from, cc, subject, message) => {
    let mailOptions = await {
        from: from,
        to: to,
        cc: cc,
        subject: subject,
        html: message,
    }
    try {
        const mailSend=await transporter.sendMail(mailOptions);
        return mailSend
    } catch (error) {
        console.log('error', error)
        return error
    }
};