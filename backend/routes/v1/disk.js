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
// var conn = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: 'easy88ch',
//     database: 'nfvi'
// });
conn.connect();

// let labels = [];
let data = [];

function getInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * from disk',
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
