document.addEventListener('DOMContentLoaded', () => {
  console.log('hi');

  const ws = new WebSocket('ws://localhost:8080');

  // console.log('foo', ws);

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
});
