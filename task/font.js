const { src, dest } = require('gulp');

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const newer = require('gulp-newer'); // filter image
const fonter = require('gulp-fonter'); 
const ttf2woff2 = require('gulp-ttf2woff2'); 
// Обработка Font
const font = () => {
    return src(path.font.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Font',
                message: error.message
            }))
        }))
        .pipe(newer(path.font.dest))
        .pipe(fonter(app.fonter))
        .pipe(dest(path.font.dest))
        .pipe(ttf2woff2())
        .pipe(dest(path.font.dest));
};

module.exports = font;