const express = require('express');
const bodyParser = require('body-parser')

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title" /> <button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Home Page</h1>');
});

app.listen(port, () => console.log(`Listening to port: ${port}.....`));