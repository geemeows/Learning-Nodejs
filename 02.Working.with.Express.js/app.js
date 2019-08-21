const express = require('express');
const bodyParser = require('body-parser');

// importing routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>404 | Page Not Found</h1>')
});


app.listen(port, () => console.log(`Listening to port: ${port}.....`));