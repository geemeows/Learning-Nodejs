const Product = require('../models/product')
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    })
}

exports.postAddProduct = (req, res, next) => {
    const adminProduct = {
        title: req.body.title,
        imgURL: req.body.imgURL,
        price: req.body.price,
        description: req.body.description
    }
    const product = new Product(adminProduct);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}
