const express = require('express');
const router = express.Router();
const cpu = require('./cpu');
const server = require('./server');
const memory = require('./memory');
const calculate = require('./calculate');
const rack = require('./rack');

router.use('/cpu',cpu);
router.use('/server',server);
router.use('/memory',memory);
router.use('/calculate',calculate);
router.use('/rack',rack);

module.exports = router;
