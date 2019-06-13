const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('error', (err) => {
  console.error('error with websocket:', err);
});

ws.addEventListener('open', () => {
  console.log('opened connection');
});

ws.addEventListener('close', () => {
  console.log('closed connection');
});

ws.addEventListener('message', (message) => {
  console.log('got a message', message);
});

const setupForm = () => {
  const form = document.querySelector('#chat-message-form');
  const chatMessageInput = document.querySelector('#chat-message');
  const chatMessageList = document.querySelector('#chat-message-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const { value: chatMessage } = chatMessageInput;

    ws.send(chatMessage);
  });

  ws.addEventListener('message', ({ data: chatMessage }) => {
    const newChatMessage = document.createElement('p');
    newChatMessage.innerText = chatMessage;

    chatMessageList.appendChild(newChatMessage);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('hi');
  setupForm();
});
