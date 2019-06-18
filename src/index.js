const express = require('express');
const cors = require('cors');
const apiRouter = require('./api');

// Get enviorment variables.
const {
    PORT = 1336,
} = process.env;

const app = express();
app.use(cors());

app.use('/api', apiRouter);
app.use('*', (req, res) => {
    res.status(404).end('Not found');
});

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening on: ${PORT}`);
});