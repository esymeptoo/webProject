var Promise = require('promise');
var mongoClient = require('./mongo');
var Page = require('../models/page');

function service(ctx) {

}

service.prototype._promise = function (cb) {
    return new Promise(function (resolve, reject) {
        mongoClient(function (db) {
            cb(db, resolve, reject);
        });
    });
};

service.prototype.savePage = function (data) {
    return this._promise(function (db, resolve, reject) {
        let beta = new Page({
            page: data
        });
        beta.save((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        })
    });
};

service.prototype.getPageById = function (id) {
    return this._promise(function (db, resolve, reject) {
        Page.find({_id: id}, (err, docs) => {
            if (err) {
                reject(err)
            }
            resolve(docs);
        })
    });
};


module.exports = service