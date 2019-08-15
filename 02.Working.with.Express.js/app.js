const http = require('http');

const express = require('express');

const app = express();

// Using middlewares
app.use((req, res, next) => {
    console.log('in the middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('in another middleware!');
    // ..... Handling response 
});

const server = http.createServer(app);

server.listen(3000);