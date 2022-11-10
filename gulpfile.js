const { watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// Конфигурация
const path = require('./config/path.js');
const app = require('./config/app.js');

// Подключение задач из task
const clear = require('./task/clear.js');
const html = require('./task/html.js');
const css = require('./task/css.js');
const scss = require('./task/scss.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const font = require('./task/font.js');

// Север
const server = (done) => {
    browserSync.init({
        server: {
            baseDir: path.root
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

// Наблюдение
const watcher = () => {
    watch(path.html.watch, html).on("all", browserSync.reload);
    watch(path.css.watch, css).on("all", browserSync.reload);   // or scss
    watch(path.js.watch, js).on("all", browserSync.reload);
    watch(path.img.watch, img).on("all", browserSync.reload);
    watch(path.font.watch, font).on("all", browserSync.reload);
}

const build = series(
    clear,
    parallel(html, css, js, img, font), // or scss
);

const dev = series(
    build,
    parallel(watcher, server)
);

// Задачи
exports.html = html;
exports.css = css; // or scss
exports.clear = clear;
exports.js = js;
exports.img = img;
exports.font = font;


// Сборка
exports.default = app.isProd
    ? build
    : dev; 

// package-json --> scripts 
// npm start - dev
// npm run build - prod

