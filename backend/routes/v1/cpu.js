var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// var conn = mysql.createConnection({
//     host: '172.27.19.33',
//     port: '3306',
//     user: 'pcl_admin',
//     password: 'Pcl.237790*',
//     database: 'nfvi'
// });
// conn.connect();
var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'easy88ch',
    database: 'nfvi'
});
conn.connect();
// let labels = [];
let data = [];

function getInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * from cpu',
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

router.post('/insert', function (req, res, next){
    // console.log(req.body);

    conn.query('insert into cpu(partnum, name, processnum, core, clock, price, TPMc, vendor, numOfSlot, NEBS) values(?,?,?,?,?,?,?,?,?,?)',
        [req.body.partnum, req.body.name, req.body.processnum, req.body.core, req.body.clock, req.body.price, req.body.TPMc, req.body.vendor, req.body.numOfSlot, req.body.NEBS],
        function (error, result) {
            if(error) {
                // console.log(error);
                res.status(404).send({
                    msg: 'Type Error'
                });
            }
            else {
                res.status(200).send();
            }
        });
});

router.post('/delete', function (req, res, next){
    // console.log(req.body);
    conn.query('DELETE FROM cpu WHERE id=?',
        [req.body.id],
        function (error, result) {
            if(error) {
                // console.log(error);
                res.status(404).send({
                    msg: 'Type Error'
                });
            }
            else {
                res.status(200).send();
            }
        });
});

router.post('/update', function (req, res, next){
    // console.log(req.body);
    // UPDATE `nfvi`.`cpu` SET `partnum`='dummy-B324', `name`='6152 Xeon Gold Kikkk', `processnum`='6222', `core`='98', `clock`='3.4', `price`='1234554', `TPMc`='44433' WHERE `id`='17';

    conn.query('UPDATE cpu SET partnum=?, name=?, processnum=?,core=?,clock=?,price=?,TPMc=? WHERE id=?',
        [req.body.partnum, req.body.name, req.body.processnum, req.body.core, req.body.clock, req.body.price, req.body.TPMc, req.body.id ],
        function (error, result) {
            if(error) {
                console.log(error);
                res.status(404).send({
                    msg: 'Type Error'
                });
            }
            else {
                res.status(200).send();
            }
        });
});

router.get('/', function (req, res, next){
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
