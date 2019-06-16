const express = require('express');
const apiRouter = require('./api');

const app = express();

// Get enviorment variables.
const {
    PORT,
    WEBPACK_DEV,
} = process.env;

app.use('/api', apiRouter);

if(WEBPACK_DEV) {
    // Webpack config.
    const config = require('../../webpack.dev.js');

    // Require modules.
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    // Create webpack compiler.
    const compiler = webpack(config);

    // Apply middleware.
    app.use('/', webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }));
} else {
    // Serve static files.
    app.use('/', express.static('public'));
}

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});