const del = require('del') // v. del@6.1.1

// Конфигурация
const path = require('../config/path.js');

// Удаление директории
const clear = () => {
    return del(path.root);
};

module.exports = clear;