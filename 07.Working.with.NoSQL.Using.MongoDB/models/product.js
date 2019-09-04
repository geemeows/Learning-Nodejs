const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class Product  {
  constructor(title, imageUrl, price, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
  }

  save() {
    const DB = getDB();
    let dbOp;

    if (this._id) {
      // Update Product
      dbOp = DB
            .collection('products')
            .updateOne({ _id: new mongodb.ObjectID(this._id) }, { $set: this }); 
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
}

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
