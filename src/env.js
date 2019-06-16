// Get enviorment variables.
const {
    PORT = 1337,
    NODE_ENV = 'development',
    // This should be stored elsewhere but for the sake of the demo..
    MONGO_URI = 'mongodb://1337:tretton37@ds231517.mlab.com:31517/tretton37', 
    WEBPACK_DEV = 'false',
    MODE = 'redirect',
} = process.env;

module.exports = {
    PORT,
    NODE_ENV,
    IS_DEV: NODE_ENV === 'development',
    IS_PROD: NODE_ENV === 'production',
    MONGO_URI,
    WEBPACK_DEV,
    MODE,
};