const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5d72a41e0e009e29908a543d')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://Gazouly:k422UI8lbdkjPl4v@cluster0-ml4p7.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Gazouly',
            email: 'Gazouly@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      })
      .catch(err => console.log(err));
    app.listen(3000, () => {
      console.log('Listening to port 3000 ....');
      console.log('http://localhost:3000');
    });
  })
  .catch(err => {
    console.log(err);
  });
