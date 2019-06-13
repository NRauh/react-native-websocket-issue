const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 8080,
  handleProtocols(protocols, req) {
    console.log('joineding with protocols', protocols);
    return 'funtocol';
  },
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

  ws.send('you have joined');
});
