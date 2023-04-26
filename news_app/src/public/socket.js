import savedMessage from "../model/model";

const nameInput = document.querySelector('#userName');
const messageInput = document.querySelector('#msg');
const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('#chat-messages');

let userName;

chatForm.addEventListener('submit', (e) => {

  e.preventDefault();

  const message = messageInput.value;

  if (message.trim() === '') {
    return;
  }

  if (!userName) {
    userName = nameInput.value;
  }
  
  const data = {
    userName,
    message
  };

  const messageModel = new savedMessage(data);
  messageModel.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Message saved to database');
    }
  });

  const socket = io();
  socket.emit('chat message', data); // emit the chat message event to the server
  messageInput.value = '';
});

const socket = io();
socket.on('chat message', (data) => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add(
    'message',
    data.userName === userName ? 'sender' : 'receiver'
  );

  const nameEl = document.createElement('span');
  nameEl.classList.add('userName');
  nameEl.textContent = data.userName + ':';

  const textEl = document.createElement('span');
  textEl.classList.add('text');
  textEl.textContent = data.message;

  messageContainer.appendChild(nameEl);
  messageContainer.appendChild(textEl);
  chatMessages.appendChild(messageContainer);
});
