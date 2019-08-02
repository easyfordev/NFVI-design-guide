var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: '172.27.19.33',
    port: '3306',
    user: 'pcl_admin',
    password: 'Pcl.237790*',
    database: 'nfvi'
});
conn.connect();

// let labels = [];
let data = [];

function getInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * from memory',
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else{
                    result.forEach(function (item, index, array) {
                        // labels.push(item["ecuid"]);
                        data.push(item);
                    });
                    resolve();
                }
            });
    });
}

function getPcs() {
    return new Promise(function(resolve, reject){
        // TODO : 2019/08/02 여기부터 작업하세요~ 메모리 volume에 따라서 몇 조각인지 && 총 얼마인지 계산하기(오늘은 이거까지만 하자!)
        // conn.query('SELECT * from memory',
        //     function (error, result) {
        //         if(error) {
        //             res.status(400).send({
        //                 status: "fail",
        //                 msg: error
        //             });
        //         }
        //         else{
        //             result.forEach(function (item, index, array) {
        //                 // labels.push(item["ecuid"]);
        //                 data.push(item);
        //             });
        //             resolve();
        //         }
        //     });
    });
}

// TODO : 뭐가 최적인지 계산해서 추천해주기 (이건 나중에)

router.get('/', function (req, res, next){
    console.log(req.query);

    getInfo().then(function () {
        res.status(200).send({
            // labels: labels,
            data: data
        });
        // labels = []
        data = []
    })

});

module.exports = router;
// label : SELECT DISTINCT(apid) FROM log
// SELECT apid, count(*) FROM log Group by apid
