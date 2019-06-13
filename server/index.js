const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080,
}, () => {
  console.log('server started');
});

wss.on('connection', (ws) => {
  console.log('someone connected');

  ws.on('message', (chatMessage) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(chatMessage);
      }
    });
  });
});
