const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://Gazouly:k422UI8lbdkjPl4v@cluster0-ml4p7.mongodb.net/shop?retryWrites=true&w=majority')
    .then(client => {
      console.log('CONNECTED!');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
}

const getDB = () => {
  if (_db) 
    return _db;
  else
    throw 'NOT CONNECTED TO DB!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;