import express from "express";
import connectDB from "./db/db.js";
import http from "http";
import { Server } from "socket.io";
import path from 'path';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB()

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(path.resolve(), 'src/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'src/public/index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (data) => { // receive the chat message event from the client
    console.log('message: ' + data.message);
    io.emit('chat message', data); // emit the chat message event to all connected clients, including the sender
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
