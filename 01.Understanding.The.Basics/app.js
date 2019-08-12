// Creating a Node Server
const http = require('http');

const server = http.createServer((req, res) => {
    // Understanding Request
    console.log('Request URL: ', req.url);
    console.log('Request METHOD: ', req.method);
    console.log('Request Headers: ', req.headers);

    // Sending Responses
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><h1>Hello From Node.js App</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000)