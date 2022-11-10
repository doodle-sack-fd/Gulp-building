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

module.exports = server;