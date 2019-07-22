const express = require('express');
const router = express.Router();
const cpu = require('./cpu');
const server = require('./server');
const memory = require('./memory');

router.use('/cpu',cpu);
router.use('/server',server);
router.use('/memory',memory);

module.exports = router;
