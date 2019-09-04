const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://Gazouly:k422UI8lbdkjPl4v@cluster0-ml4p7.mongodb.net/test?retryWrites=true&w=majority')
    .then(client => {
      console.log('CONNECTED!');
      callback(client);
    })
    .catch(err => console.log(err));
}

module.exports = mongoConnect;