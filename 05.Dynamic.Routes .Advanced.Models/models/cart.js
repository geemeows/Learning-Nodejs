const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {

    static addProduct(id, price) {

        // Fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Find existing product
            const existingProductIndex = cart.products.findIndex(item => item.id === id);
            const existingProduct = cart.products[existingProductIndex];

            // Add / Increase - new product / quantity
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty++;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id,
                    qty: 1
                }
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +price;
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        });
    }
    static removeProducts(id, price) {
        fs.readFile(p, (err, fileContent) => {
            if (err) return; 

            const cart = JSON.parse(fileContent);
            const productIndex = cart.products.findIndex(item => item.id === id);
            if (!productIndex) return;
            const productQty = cart.products[productIndex].qty;
            const updatedCart = {...cart};
            updatedCart.products = updatedCart.products.filter(item => item.id !== id);
            updatedCart.totalPrice -= productQty * price;

            fs.writeFile(p, JSON.stringify(updatedCart), err => console.log(err));
        });
    }

    static getAllProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) cb(null);
            else cb(cart);
        })
    }
}