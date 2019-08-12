// Creating a Node Server
const http = require('http');

const server = http.createServer((req, res) => {
    // Understanding Request
    console.log('Request URL: ', req.url);
    console.log('Request METHOD: ', req.method);
    console.log('Request Headers: ', req.headers);
});

server.listen(3000)