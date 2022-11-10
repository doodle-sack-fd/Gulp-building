const { src, dest } = require('gulp');

// Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

// Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const cssimport = require('gulp-cssimport');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const size = require('gulp-size');
const shorthand = require('gulp-shorthand'); // short css value
const groupCssMediaQueries = require('gulp-group-css-media-queries');

// Обработка CSS
const css = () => {
    return src(path.css.src, { sourcemaps: app.isDev})
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'CSS',
                message: error.message
            }))
        }))
        .pipe(concat('main.css'))
        .pipe(cssimport())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(groupCssMediaQueries())
        .pipe(size({ title: 'main.css' }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }))
        .pipe(rename({ suffix:'.min' }))
        .pipe(csso())
        .pipe(size({ title: 'main.min.css' }))
        .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};

module.exports = css;