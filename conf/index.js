module.exports = function (env) {
    var conf;
    try {
        conf = require('./conf.' + (env || process.env.NODE_ENV || 'development'));
    } catch (e) {
        conf = {};
    }
    return conf;
};
