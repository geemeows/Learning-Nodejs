const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product  {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = (id? new mongodb.ObjectID(id) : null);
  }

  save() {
    const DB = getDB();
    let dbOp;

    if (this._id) {
      // Update Product
      dbOp = DB
            .collection('products')
            .updateOne({ _id: this._id }, { $set: this }); 
    } else {
      // Create New Product
      dbOp = DB
            .collection('products')
            .insertOne(this);
    }
    return dbOp
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const DB = getDB();
    return DB.collection('products')
              .find()
              .toArray()
              .then(res => {
                return res;
              })
              .catch(err => console.log(err));

  }
  static findByID(id) {
    const DB = getDB();
    return DB.collection('products')
              .find({
                _id: new mongodb.ObjectID(id)
              })
              .next()
              .then(product => {
                console.log(product);
                return product;
              })
              .catch(err => console.log(err));
  }

  static deleteByID(id) {
    const DB = getDB();
    return DB.collection('products')
              .deleteOne({
                _id: new mongodb.ObjectID(id) 
              })
              .then(res => {
                console.log('Deleted!');
              })
              .catch(err => console.log(err));
  }           
}
module.exports = Product;
