const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/hwtracker/api/data/**','/hwtracker/api/homeworks/**'],
        createProxyMiddleware({
            target: 'http://localhost:8180',
            secure: false
        })
    );
};
