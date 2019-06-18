const express = require('express');
const asyncHandler = require('express-async-handler');

const {
    addHash,
    createId,
    findHash,
    mongo,
} = require('@nam3/oscar-db');

const validateURL = require('@nam3/oscar-util/validateURL');
const calculateHash = require('@nam3/oscar-util/hash');

const {
    MONGO_URI,
    MONGO_DBNAME,
    REDIRECT_URL,
} = process.env;

const connection = mongo(MONGO_URI, MONGO_DBNAME);

const router = express.Router();

router.post('/createUrl/:url', asyncHandler(async (req, res) => {
    const { url } = req.params;

    if(!url) {
        res.status(400).end('No URL provided.');
    }

    if(url.startsWith(REDIRECT_URL)) {
        res.status(400).end('Linking to redirect server is not allowed.');
    }

    try {
        validateURL(url);

        try {
            await connection(async db => {
                // Find existing hash.
                let hash = await findHash(db, url);
                // If not found.
                if (!hash) {
                    // Create new unique id in db.
                    const id = await createId(db);
                    // Calculate hash.
                    hash = calculateHash(id);
                    // Add url and hash to db.
                    await addHash(db, url, hash);
                }
                // Respond with hash url.
                res.end(`${REDIRECT_URL}/${hash}`);
            });
        } catch(err) {
            console.log(err);
            res.status(500).end();
            return;
        }
    } catch(err) {
        res.status(400).end('Invalid URL');
    }
}));

module.exports = router;