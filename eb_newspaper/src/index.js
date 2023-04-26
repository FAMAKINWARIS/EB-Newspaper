import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import connectDB from './db/db.js';
import mime from 'mime';
import path from 'path';
import ioSocket from "./config/socketconfig.js"
import logger from './config/logger.js';

connectDB()

express.static.mime.define({
  'application/javascript': ['js']
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(import.meta.url, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(import.meta.url, '/public/views/index.html'));
});

app.get('/src/public/css/style.css', (req, res) => {
  const cssPath = path.join(import.meta.url, '/public/css/style.css');
  const mimeType = mime.getType(cssPath);
  res.setHeader('Content-Type', mimeType);
  res.sendFile(cssPath);
});

app.get('/public/chat.js', function(req, res) {
  const jsPath = path.join(import.meta.url, '/public/chat.js');
  const mimeType = mime.getType(jsPath);
  res.setHeader('Content-Type', mimeType);
  res.sendFile(jsPath);
});

app.get('/index.js', function(req, res) {
  const jsPath = path.join(import.meta.url, '/index.js');
  const mimeType = mime.getType(jsPath);
  res.setHeader('Content-Type', mimeType);
  res.sendFile(jsPath);
});

ioSocket(io);

const port = process.env.PORT || 7654;
httpServer.listen(port, function() {
  logger.info(`listening on *:${port}`);
});
