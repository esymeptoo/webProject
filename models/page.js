/**
 * Created by Session on 16/8/15.
 */
var mongoose = require('mongoose');

var pageSchema = new mongoose.Schema({
    page: {
        type: [Array],
        require: true
    },
    pTime: {
        type: Date,
        default: function () {
            return new Date;
        }
    }
}, {
    versionKey: false,
});

var Page = mongoose.model('Page', pageSchema);

module.exports = Page;
