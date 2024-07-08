const amqp = require('amqplib');
require('dotenv').config();
const notificationService = require('./notificationService');

const queue = 'notification_queue';

let channel;

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: true });

        channel.consume(queue, async (msg) => {
            if (msg !== null) {
                const { email, subject, message } = JSON.parse(msg.content.toString());
                await notificationService.sendEmail(email, subject, message);
                channel.ack(msg);
            }
        }, { noAck: false });

        console.log('Connected to RabbitMQ and consuming messages from', queue);
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
};

const sendToQueue = async (email, subject, message) => {
    if (channel) {
        const msg = JSON.stringify({ email, subject, message });
        await channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
    } else {
        throw new Error('Channel is not initialized');
    }
};

module.exports = {
    connectRabbitMQ,
    sendToQueue,
};
