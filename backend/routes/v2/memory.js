var express = require('express');
var router = express.Router();
var data =
    [
        // {
        //     "id": 1,
        //     "partnum": "815097-B21",
        //     "volume": 8,
        //     "name": "",
        //     "price": 185000,
        //     "speed": 2666,
        //     "vendor": "HPE",
        //     "pcs": "-"
        // },
        {
            "id": 2,
            "name": "HPE 16G 2Rx8 PC4-2666V-R Smart Kit",
            "partnum": "815098-B21",
            "volume": 16,
            "price": 245000,
            "speed": 2666,
            "vendor": "HPE",
            "pcs": 24,
            "score": 100
        },
        {
            "id": 3,
            "name": "HPE 32G 2Rx4 PC4-2666V-R Smart Kit",
            "partnum": "815100-B21",
            "volume": 32,
            "price": 414000,
            "speed": 2666,
            "vendor": "HPE",
            "pcs": 12,
            "score": 97
        },
        {
            "id": 4,
            "name": "HPE 64G 4Rx4 PC4-2666V-R Smart Kit",
            "partnum": "815101-B21",
            "volume": 64,
            "price": 1218000,
            "speed": 2666,
            "vendor": "HPE",
            "pcs": 6,
            "score": 51
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
