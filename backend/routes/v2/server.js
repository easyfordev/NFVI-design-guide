var express = require('express');
var router = express.Router();
var data =
    [
        {
            "id": 1,
            "vendor": "HPE",
            "name": "HPE DL360 Gen10",
            "size": 1,
            "numOfCpu": 2
        },
        {
            "id": 2,
            "vendor": "HPE",
            "name": "HPE DL380 Gen10",
            "size": 2,
            "numOfCpu": 2
        }
    ];

router.get('/', function (req, res, next){
    res.status(200).send({
        // msg: 'test',
        data: data
    });

});

module.exports = router;
// label : SELECT DISTINCT(apid) FROM log
// SELECT apid, count(*) FROM log Group by apid
