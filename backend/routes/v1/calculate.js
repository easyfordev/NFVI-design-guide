var express = require('express');
var router = express.Router();
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

// let labels = [];
let data = [];

router.post('/', function (req, res, next){
    console.log(req.body);
    res.status(200).send({
        data : req.body
    })
});

module.exports = router;
// label : SELECT DISTINCT(apid) FROM log
// SELECT apid, count(*) FROM log Group by apid
