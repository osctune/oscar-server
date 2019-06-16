const express = require('express');
const apiRouter = require('./api');

const app = express();

// Get enviorment variables.
const {
    PORT=1336,
} = process.env;

app.use('/', apiRouter);

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});