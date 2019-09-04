const getDB = require('../util/database').getDB;

class Product  {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save() {
    const DB = getDB();
    return DB.collection('products')
      .insertOne(this)
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
                console.log(res);
                return res;
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
