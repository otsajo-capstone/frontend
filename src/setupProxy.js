const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/colorfit',
        createProxyMiddleware( 
        { target: 'http://localhost:8080/',
        changeOrigin: true }
    ));
    app.use(
        '/django',
        createProxyMiddleware( 
        { target: 'http://34.82.152.172:5000',
        changeOrigin: true,
    pathRewrite: {
        '^/django': ''
    }}
    ));
}