const fs = require('fs');

const requestHandler = (req, res) => {
    // Routing
    const url = req.url
    const method = req.method

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>My Form</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send Message</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    else if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            console.log(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            // Blocking and Non-blocking Code
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }

    // Sending Responses
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Node App</title></head>');
    res.write('<body><h1>Hello From Node.js App</h1></body>')
    res.write('</html>');
    res.end();
}

module.exports = requestHandler;