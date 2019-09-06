const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;

class User {
  
  constructor(username, email) {
    this.name = username;
    this.email = email;
  }

  save () {
    const DB = getDB();
    return DB.collection('users').insertOne(this);
  }

  static findByID (id) {
    const DB = getDB();
    return DB.collection('users')
              .findOne({
                _id: new mongodb.ObjectID(id)
              })
              .then(user => {
                console.log(user);
                return user;
              }) 
              .catch(err => console.log(err));

  }

}

module.exports = User;
