const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        ['/hwtracker/api/data/**',
            '/hwtracker/api/homeworks/**',
            '/hwtracker/api/tracker/**',
            '/hwtracker/api/user/**'],
        createProxyMiddleware({
            target: 'http://localhost:8180'
        })
    );
};
