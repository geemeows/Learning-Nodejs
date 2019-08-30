const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};
exports.getProductDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findProduct(id, product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: `${product.title} - Shop`,
      path: '/products'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getAllProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const productData = cart.products.find(item => item.id === product.id);
        if (productData) {
          cartProducts.push({
            product,
            qty: productData.qty
          });
        }
      }

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  });
};

exports.addToCart = (req, res, next) => {
  const id = req.body.id
  Product.findProduct(id, product => {
    Cart.addProduct(id, product.price);
  })
  res.redirect('/cart');
};

exports.deleteCartItem = (req, res, next) => {
  const id = req.body.id;
  Product.findProduct(id, product => {
    Cart.removeProducts(id, product.price);
    res.redirect('/cart');
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
