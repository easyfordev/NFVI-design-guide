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

var data = [];
var user_req = {};
var sum = 0;
var totalSum = 0;

var temp = [
//     { type: "서버", name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
// { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
// { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
// { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
// { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
// { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
//
// { type: "스위치", name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
// { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
// { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
// { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
// { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
// { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
];


router.post('/', function (req, res, next){
    user_req = req.body;
    console.log(user_req);

    getServerInfo().then(function () {
        return getCpuInfo();
    }).then(function () {
        return getMemoryInfo();
    }).then(function () {
        return getDiskInfo();
    }).then(function () {
        return getNicInfo();
    }).then(function () {
        return getServiceSwitchInfo();
    }).then(function () {
        return getMgmtSwitchInfo();
    }).then(function () {
        res.status(200).send({
            items: data,
            sum: sum
        });
        data = [];
        sum=0;
    });
    data = [];
    sum=0;
    totalSum = 0;
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
                    json["type"] = "DISK";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = user_req.diskCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = user_req.diskCount * result[0].price;
                    sum += json["price"];
                    totalSum += json["totalPrice"];
                    data.push(json);

                    // TODO : Please delete this codes
                    // data.push({ name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 1, perCost: 313000, price: 313000 });
                    // data.push({ name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 1, perCost: 333000, price: 333000 });
                    // data.push({ name: "NIC", spec: "HPE Eth 10Gb 4p 563SFP + Adptr", count: 1, perCost: 448000, price: 448000 });
                    // data.push({ name: "NIC", spec: "HPE Ethernet 10Gb 2-port 562SFP + Adptr", count: 1, perCost: 287000, price: 287000 });
                    //
                    // sum += 313000;
                    // sum += 333000;
                    // sum += 448000;
                    // sum += 287000;

                    resolve();
                }
            });
    });
}
function getNicInfo() {
    let promises = [];
    for (let i = 0; i < user_req.nicId.length; i++) {
        if(user_req.nicStatus[i] === true){
            promises.push(new Promise(function (resolve) {
                conn.query('SELECT * FROM nfvi.nic where partnum=?', user_req.nicId[i],
                    function (error, result) {
                        data.push({
                            type: "NIC " + result[0].giga + "G " + result[0].type + " " + result[0].option + " " + result[0].ports + "포트",
                            spec: result[0].name,
                            count: user_req.nicCount[i],
                            price: result[0].price,
                            totalPrice: user_req.nicCount[i] * result[0].price
                        });
                        sum += result[0].price;
                        totalSum += user_req.nicCount[i] * result[0].price;
                        resolve();
                    });
            }));
        }
    }

    return Promise.all(promises);
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
                    json["type"] = "CPU";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = user_req.cpuCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = user_req.cpuCount * result[0].price;
                    sum += json["price"];
                    totalSum += json["totalPrice"];

                    data.push(json);
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
                    json["type"] = "Memory";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = user_req.memoryCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = user_req.memoryCount * result[0].price;
                    sum += json["price"];
                    totalSum += json["totalPrice"];

                    data.push(json);
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
                    json["category"] = "서버";
                    json["type"] = "Chassis";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name;
                    json["count"] = user_req.serverCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = result[0].price * user_req.serverCount;
                    sum += json["price"];
                    totalSum += json["totalPrice"];

                    data.push(json);
                    resolve();
                }
            });
    });
}

function getServiceSwitchInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM switch where partnum=?', user_req.serviceSwitchId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    // { name: "Service ToR", spec: "CE8861-4C-EI-B", count: 24, price: "414,000", totalPrice: "9,936,000원" },
                    let json = {};
                    json["category"] = "스위치";
                    json["type"] = "Service ToR";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name +"(" + result[0].giga + "G " + result[0].type +" " + result[0].ports + "ports)";
                    json["count"] = user_req.serviceSwitchCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = result[0].price * user_req.serviceSwitchCount;
                    sum += json["price"];
                    totalSum += json["totalPrice"];

                    data.push(json);
                    resolve();
                }
            });
    });
}

function getMgmtSwitchInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM switch where partnum=?', user_req.mgmtSwitchId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    let json = {};

                    json["type"] = "MGMT ToR";
                    json["partnum"] = result[0].partnum;
                    json["spec"] = result[0].name +"(" + result[0].giga + "G " + result[0].type +" " + result[0].ports + "ports)";
                    json["count"] = user_req.mgmtSwitchCount;
                    json["price"] = result[0].price;
                    json["totalPrice"] = result[0].price * user_req.mgmtSwitchCount;
                    sum += json["price"];
                    totalSum += json["totalPrice"];

                    data.push(json);
                    resolve();
                }
            });
    });
}

module.exports = router;
