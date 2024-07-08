const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

router.post('/', async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        await notificationService.sendEmail(email, subject, message);
        res.status(200).send('Notification sent');
    } catch (error) {
        res.status(500).send('Failed to send notification');
    }
});

module.exports = router;
