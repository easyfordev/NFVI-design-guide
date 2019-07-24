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
                "TPMc": 52000698,
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
                "TPMc": 5305763,
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
                "TPMc": 5305763,
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
                "TPMc": 5305763,
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
                "TPMc": 5305763,
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
                "TPMc": 5305763,
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
                "TPMc": 5305763,
                "vendor": "hpe",
                "numOfSlot": 12
            }
        ];
// var mysql = require('mysql');
//
// var conn = mysql.createConnection({
//     host: '172.27.19.33',
//     port: '3306',
//     user: 'pcl_admin',
//     password: 'Pcl.237790*',
//     database: 'nfvi'
// });
// conn.connect();
//
// // let labels = [];
// let data = [];
//
// function getInfo() {
//     return new Promise(function(resolve, reject){
//         conn.query('SELECT * from cpu',
//             function (error, result) {
//                 if(error) {
//                     res.status(400).send({
//                         status: "fail",
//                         msg: error
//                     });
//                 }
//                 else{
//                     result.forEach(function (item, index, array) {
//                         // labels.push(item["ecuid"]);
//                         data.push(item);
//                     });
//                     resolve();
//                 }
//             });
//     });
// }

router.get('/', function (req, res, next){
    // getInfo().then(function () {
    //     res.status(200).send({
    //         // labels: labels,
    //         data: data
    //     });
    //     // labels = []
    //     data = []
    // })
    res.status(200).send({
        // msg: 'test',
        data: data
    });

});

module.exports = router;
// label : SELECT DISTINCT(apid) FROM log
// SELECT apid, count(*) FROM log Group by apid
