const express = require('express');
const router = express.Router();
const cpu = require('./cpu');
const server = require('./server');
const memory = require('./memory');
const calculate = require('./calculate');
const rack = require('./rack');
const network = require('./network');
const power = require('./power');
const disk = require('./disk');
const excel = require('./excel');
const history = require('./history');
const nic = require('./nic');

router.use('/cpu',cpu);
router.use('/server',server);
router.use('/memory',memory);
router.use('/calculate',calculate);
router.use('/rack',rack);
router.use('/network',network);
router.use('/power',power);
router.use('/disk',disk);
router.use('/excel',excel);
router.use('/history',history);
router.use('/nic',nic);

module.exports = router;
