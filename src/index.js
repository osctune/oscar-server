const express = require('express');
const apiRouter = require('./api');
const asyncHandler = require('express-async-handler');
const { findUrl, mongo } = require('./util/db');

const app = express();

// Get enviorment variables.
const {
    PORT,
    WEBPACK_DEV,
    MODE,
} = require('./env');

if(MODE === 'redirect') {
    app.get('/:hash', asyncHandler(async (req, res) => {
        await mongo(async db => {
            const url = await findUrl(db, req.params.hash);
            if(url) {
                res.redirect(url);
            } else {
                res.redirect('/app');
            }
        });
    }));
} else {
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
}

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});