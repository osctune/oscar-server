const express = require('express');
const asyncHandler = require('express-async-handler');

const {
    addHash,
    createId,
    findHash,
    mongo,
} = require('../util/db');

const {
    formatResponse,
} = require('../util/format');

const calculateHash = require('../util/hash');

const router = express.Router();

router.get('/createUrl/:url', asyncHandler(async (req, res) => {
    const { url } = req.params;
    await mongo(async db => {
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
        res.end(formatResponse(req, hash));
    });
}));

router.get('*', (_req, res) => {
    res.status(404).end();
});

module.exports = router;