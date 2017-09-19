var mongoose = require('mongoose');
var config = require('../conf')();

mongoose.connect(config.mongoUrl, { useMongoClient:true });

var db = mongoose.connection;
var isOpen = false;

db.on('error', function (err) {
    console.log('mongo connection error')
});
db.once('open', function () {
    isOpen = true;
});

module.exports = function (cb) {
    if (isOpen) {
        cb(db);
    } else {
        db.once('open', function () {
            cb(db);
        });
    }
};