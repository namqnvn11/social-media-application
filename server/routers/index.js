const express = require('express');
const router = express.Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');

router.use('/users', userRoute);
router.use('/posts', postRoute);

module.exports = router;