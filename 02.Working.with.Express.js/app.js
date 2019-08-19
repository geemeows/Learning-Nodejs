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


app.listen(port, () => console.log(`Listening to port: ${port}.....`));