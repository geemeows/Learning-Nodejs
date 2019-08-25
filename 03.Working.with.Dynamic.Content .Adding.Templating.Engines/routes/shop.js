const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
  const products = adminData.products;
  // console.log('Shop.js: ', products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  res.render('shop', {
    products
  });
});

module.exports = router;
