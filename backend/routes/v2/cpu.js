var express = require('express');
var router = express.Router();
var data =
        [
            {
                "id": 1,
                "partnum": "826878-B21",
                "name": "6140 Xeon Gold Kit",
                "processnum": "6140",
                "core": 18,
                "clock": 2.3,
                "price": 2481000,
                "NEBS": 'Y',
                "TPMc": 4727908,
                "vendor": "hpe",
                "numOfSlot": 12
            },
            {
                "id": 2,
                "partnum": "826882-B21",
                "name": "6148 Xeon Gold Kit",
                "processnum": "6148",
                "core": 20,
                "clock": 2.4,
                "price": 3114000,
                "NEBS": 'Y',
                "TPMc": 5200698,
                "vendor": "hpe",
                "numOfSlot": 12
            },
            {
                "id": 3,
                "partnum": "826886-B21",
                "name": "6152 Xeon Gold Kit",
                "processnum": "6152",
                "core": 22,
                "clock": 2.1,
                "price": 3734000,
                "NEBS": 'Y',
                "TPMc": 5305763,
                "vendor": "hpe",
                "numOfSlot": 12
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
