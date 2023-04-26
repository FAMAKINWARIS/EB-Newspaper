const socket = io();
    const messageList = document.getElementById('message-list');
    const messageForm = document.getElementById('message-form');
    const nameInput = document.getElementById('name-input');
    const messageInput = document.getElementById('message-input');
    
    messageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = nameInput.value;
      const message = messageInput.value;
      if (name.trim() && message.trim()) {
        socket.emit('chat message', { name: name, message: message });
        messageInput.value = '';
        messageInput.focus();
      }
    });
    
    socket.on('chat message', function(data) {
      const className = data.name === nameInput.value ? 'sender' : 'receiver';
      const li = document.createElement('li');
      li.classList.add('message-item', className);
      li.innerHTML = `<strong>${data.name}:</strong> ${data.message}`;
      messageList.appendChild(li);
      messageList.scrollTop = messageList.scrollHeight;
    });