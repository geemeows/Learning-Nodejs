const http = require('http');
const port = 3000;

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('This middleware always runs!!');
    next();
});

app.use('/add-product', (req, res, next) => {
    res.send('<h1>Add Product Page</h1>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Home Page</h1>');
});

app.listen(port, () => console.log(`Listening to port: ${port}.....`));