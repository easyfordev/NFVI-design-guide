const express = require('express');
const router = express.Router();
const cpu = require('./cpu');

router.use('/cpu',cpu);

module.exports = router;
