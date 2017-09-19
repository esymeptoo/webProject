var fs = require('fs');
var pathObj = require('path');

/**
 * 递归获取目录中的所有文件, 生成目录树
 * @param path
 * @returns {Array}
 */
exports.readDirDeepSync = function (path) {
    if (!pathObj.isAbsolute(path)) {
        return [];
    }

    if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
        return [];
    }

    var self = this;

    return fs.readdirSync(path).map(function (file) {
        var ext = pathObj.extname(file).toUpperCase();
        ext = ext ? ext.substr(1, ext.length) : 'TXT';
        var newPath = path + '/' + file;

        if (fs.statSync(newPath).isDirectory()) {
            return {
                type: 'DIR',
                fileName: file,
                path: newPath,
                children: self.readDirDeepSync(newPath)
            }
        } else if (ext) {
            return {
                type: ext,
                fileName: file,
                path: newPath
            };
        }
    });
};

/**
 * 根据给定的目录树递归生成 express 路由
 * @param dirTree
 * @param basePath
 * @returns {Array}
 */
exports.genRouteByDirTree = function (dirTree, basePath) {
    if (dirTree.constructor !== Array) {
        return [];
    }

    if (!basePath) basePath = '/';

    var self = this;
    var routes = [];

    dirTree.forEach(function (dirInfo) {
        if (dirInfo.type == 'DIR') {
            routes = routes.concat(self.genRouteByDirTree(dirInfo.children, basePath + dirInfo.fileName + '/'));
        } else if (dirInfo.type == 'JS') {
            var extendReg = /([\w\.]+)\.(\w+)$/i;
            var fileMatch = dirInfo.fileName.match(extendReg);
            var fileName = fileMatch ? fileMatch[1] : dirInfo.fileName;

            routes.push({
                route: fileName.toLowerCase() == 'index' ? basePath : basePath + fileName + '/',
                path: dirInfo.path
            });
        }
    });

    return routes;
};