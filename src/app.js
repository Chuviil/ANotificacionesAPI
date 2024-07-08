const express = require('express');
const bodyParser = require('body-parser');
const notificationController = require('./controllers/notificationController');
const { connectRabbitMQ } = require('./services/rabbitmqService');

const app = express();

app.use(bodyParser.json());
app.use('/notifications', notificationController);

// Connect to RabbitMQ
try {
    connectRabbitMQ();
} catch (e) {
    console.error('Failed to connect to RabbitMQ', e);
}

module.exports = app;
