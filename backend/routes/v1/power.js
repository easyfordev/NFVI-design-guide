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
var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'easy88ch',
    database: 'nfvi'
});
conn.connect();

var data = {mode: "span", label: "서버", children: []};
var user_req = {};
var totalSum = 0;

// rows: [
//     {
//         mode: "span", // span means this header will span all columns
//         label: "서버", // this is the label that'll be used for the header
//         children: [
//             { name: "Server", partnum: "867959-B21",spec: "HPE DL360 Gen10", power: 31.68, count: 1, totalPower: 31.68 },
//             { name: "CPU", partnum: "826878-B21",spec: "6140 Xeon Gold Kit", power: 157.61, count: 2, totalPower: 315.22 },
//             { name: "Memory", partnum: "815100-B21",spec: "HPE 32GB 2Rx4 PC4-2666V-R Smart Kit", power: 4.98, count: 12, totalPower: 59.76 },
//             { name: "DISK", partnum: "872479-B21",spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", power: 7.48, count: 12, totalPower: 88.8 },
//         ]
//     }
// ],
//     totalSum: 495.46,
//     serverCount: 12
router.post('/', function (req, res, next){
    user_req = req.body;

    getServerInfo().then(function () {
        return getCpuInfo();
    }).then(function () {
        return getMemoryInfo();
    }).then(function () {
        return getDiskInfo();
    // // }).then(function () {
    // //     return getStorageInfo();
    // // }).then(function () {
    // //     return setDefaultItems();
    // // }).then(function () {
    // //     return setBlankItems();
    }).then(function () {
        res.status(200).send({
            rows: data,
            totalSum: totalSum
        });
        rows = [];
    });
    data = {mode: "span", label: "서버", children: []};
    totalSum=0;
});
function getDiskInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM nfvi.disk where partnum=?', user_req.diskId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
//             { name: "DISK", partnum: "872479-B21",spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", power: 7.48, count: 12, totalPower: 88.8 },
                    let json = {};
                    json["name"] = "DISK";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = 2;
                    json["power"] = result[0].power;
                    json["totalPower"] = json["count"] * result[0].power;
                    totalSum += json["totalPower"];

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
//             { name: "Memory", partnum: "815100-B21",spec: "HPE 32GB 2Rx4 PC4-2666V-R Smart Kit", power: 4.98, count: 12, totalPower: 59.76 },
                    let json = {};
                    json["name"] = "Memory";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = 12;
                    json["power"] = result[0].power;
                    json["totalPower"] = json["count"] * result[0].power;
                    totalSum += json["totalPower"];

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
//             { name: "CPU", partnum: "826878-B21",spec: "6140 Xeon Gold Kit", power: 157.61, count: 2, totalPower: 315.22 },
                    let json = {};
                    json["name"] = "CPU";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = 2;
                    json["power"] = result[0].power;
                    json["totalPower"] = json["count"] * result[0].power;
                    totalSum += json["totalPower"];

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
//             { name: "Server", partnum: "867959-B21",spec: "HPE DL360 Gen10", power: 31.68, count: 1, totalPower: 31.68 },
                    let json = {};
                    json["name"] = "Server";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = 1;
                    json["power"] = result[0].power;
                    json["totalPower"] = json["count"] * result[0].power;
                    totalSum += json["totalPower"];

                    data["children"].push(json);
                    resolve();
                }
            });
    });
}

module.exports = router;
