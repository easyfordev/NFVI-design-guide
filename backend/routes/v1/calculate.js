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

var data = {mode: "span", label: "서버", children: []};
var user_req = {};
var sum = 0;
// [
    // {
    //     mode: "span", // span means this header will span all columns
    //     label: "서버", // this is the label that'll be used for the header
    //     children: [
    //         { name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
    //         { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
    //         { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
    //         { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
    //         { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
    //         { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
    //     ]
    // }
// ]
router.post('/', function (req, res, next){
    user_req = req.body;

    getServerInfo().then(function () {
        return getCpuInfo();
    }).then(function () {
        return getMemoryInfo();
    }).then(function () {
        return getDiskInfo();
    // }).then(function () {
    //     return setDefaultItems();
    // }).then(function () {
    //     return setBlankItems();
    }).then(function () {
        res.status(200).send({
            rows: data,
            sum: sum
        });
        rows = [];
    });
    data = {mode: "span", label: "서버", children: []};
});
function getDiskInfo() {
    return new Promise(function(resolve, reject){
        //         { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
        conn.query('SELECT * FROM nfvi.disk where partnum=?', user_req.diskId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    let json = {};
                    json["name"] = "DISK";
                    json["spec"] = result[0].name;
                    json["count"] = user_req.diskCount;
                    json["perCost"] = result[0].price;
                    json["price"] = user_req.diskCount * result[0].price;
                    sum += json["price"];
                    data["children"].push(json);
                    resolve();
                }
            });
    });
}
function getCpuInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM nfvi.cpu where partnum=?', user_req.cpuId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    let json = {};
                    json["name"] = "CPU";
                    json["spec"] = result[0].name;
                    json["count"] = user_req.cpuCount;
                    json["perCost"] = result[0].price;
                    json["price"] = user_req.cpuCount * result[0].price;
                    sum += json["price"];
                    data["children"].push(json);
                    resolve();
                }
            });
    });
}
function getMemoryInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM nfvi.memory where partnum=?', user_req.memoryId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    let json = {};
                    json["name"] = "Memory";
                    json["spec"] = result[0].name;
                    json["count"] = user_req.memoryCount;
                    json["perCost"] = result[0].price;
                    json["price"] = user_req.memoryCount * result[0].price;
                    sum += json["price"];

                    data["children"].push(json);
                    resolve();
                }
            });
    });
}
function getServerInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM nfvi.server where partnum=?', user_req.serverId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    //{ name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
                    let json = {};
                    json["name"] = "Server";
                    json["spec"] = result[0].name;
                    json["count"] = 1;
                    json["perCost"] = result[0].price;
                    json["price"] = result[0].price;
                    sum += json["price"];

                    data["children"].push(json);
                    resolve();
                }
            });
    });
}

module.exports = router;
