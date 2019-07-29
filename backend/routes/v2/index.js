const express = require('express');
const router = express.Router();
const cpu = require('./cpu');
const memory = require('./memory');
const server = require('./server');

router.use('/cpu',cpu);
router.use('/memory',memory);
router.use('/server',server);

module.exports = router;
