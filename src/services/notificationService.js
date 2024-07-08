const axios = require('axios');
require('dotenv').config();
const {Resend} = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, subject, message) => {
    const payload = {
        to: email,
        subject: subject,
        text: message,
    };

    const response = await resend.emails.send({
        from: "Chony Ten Chin Champu <chonyten@chuvblocks.com>",
        to: email,
        subject: subject,
        html: message
    })

    if (response.error) {
        throw new Error('Failed to send email');
    }

    return response.data;
};

module.exports = {
    sendEmail,
};
