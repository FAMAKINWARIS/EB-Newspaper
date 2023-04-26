import express from 'express';
import http from 'http';
import Message from '../model/model.js';
import logger from './logger.js';

const app = express();
const socket = http.createServer(app);
let io;

const ioSocket = async (req, res) => {
  io = socketIO(socket);

  io.on('connection', (server) => {
    logger.info('User connected');

    server.on('chat message', (data) => {
      logger.info('Message received:', data);

      const message = new Message({
        name: data.name,
        message: data.message
      });

      message.save().then(() => {
        logger.info('Message saved to database');
      }).catch((error) => {
        console.error(error);
      });

      io.emit('chat message', data);
    });

    server.on('disconnect', () => {
      logger.info('User disconnected');
    });
  });
};

export default { ioSocket };

socket.listen(port, () => {
  logger.info(`Listening on *:${port}`);
});
