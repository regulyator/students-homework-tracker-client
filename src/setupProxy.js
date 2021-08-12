const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/hwtracker/api/data/**'],
        createProxyMiddleware({
            target: 'http://localhost:8180',
            secure: false
        })
    );
};