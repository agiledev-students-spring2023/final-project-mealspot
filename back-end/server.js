const server = require('./app');

// Port to listen to for incoming requests
const port = 3000;

// Call express's listen function to start listening to the port
const listener = server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// A function to stop listening to the port
const close = () => {
  listener.close();
};

module.exports = {
  close: close,
};
