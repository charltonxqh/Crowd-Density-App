const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/ltaodataservice',  // Route to match
        createProxyMiddleware({
            target: 'https://datamall2.mytransport.sg',  // API server
            changeOrigin: true,  // To bypass CORS
            secure: false,  // In case of self-signed certificates
        })
    );
};
