var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//
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

// let labels = [];
var total_size = 41;
var count = 1;
var count_ru = 0;

let items = [];
let user_req = {};

// [
//     { name: "T-probe", type: "etc", id: 0, number: "", ru: 1},
//     { name: "Switch", type: "mgmt-switch", id: 1, number: "#01", ru: 1},
//     { name: "", type: "blank", id: 2, number: "", ru: 1},
//     { name: "Switch", type: "mgmt-switch", id: 3, number: "#02", ru: 1},
//     { name: "", type: "blank", id: 4, number: "", ru: 1},
//     { name: "Switch", type: "service-switch", id: 5, number: "#01", ru: 1},
//     { name: "", type: "blank", id: 6, number: "", ru: 1},
//     { name: "Switch", type: "service-switch", id: 7, number: "#02", ru: 1},
//     { name: "", type: "blank", id: 8, number: "", ru: 1},
//     { name: "Server", type: "server", id: 9, number: "#01", ru: 2},
//     { name: "", type: "blank", id: 10, number: "", ru: 1},
//     { name: "", type: "blank", id: 11, number: "", ru: 1},
//     { name: "", type: "blank", id: 12, number: "", ru: 1},
//     { name: "", type: "blank", id: 13, number: "", ru: 1},
//     { name: "", type: "blank", id: 14, number: "", ru: 1},
//     { name: "", type: "blank", id: 15, number: "", ru: 1},
//     { name: "", type: "blank", id: 16, number: "", ru: 1},
//     { name: "KVM", type: "etc", id: 17, number: "", ru: 1},
//     { name: "", type: "blank", id: 18, number: "", ru: 1},
//     { name: "", type: "blank", id: 19, number: "", ru: 1},
//     { name: "", type: "blank", id: 20, number: "", ru: 1},
//     { name: "", type: "blank", id: 21, number: "", ru: 1},
//     { name: "", type: "blank", id: 22, number: "", ru: 1},
//     { name: "", type: "blank", id: 23, number: "", ru: 1},
//     { name: "", type: "blank", id: 24, number: "", ru: 1},
//     { name: "", type: "blank", id: 25, number: "", ru: 1},
//     { name: "", type: "blank", id: 26, number: "", ru: 1},
//     { name: "", type: "blank", id: 27, number: "", ru: 1},
//     { name: "", type: "blank", id: 28, number: "", ru: 1},
//     { name: "Server", type: "server", id: 29, number: "#02", ru: 1},
//     { name: "Server", type: "server", id: 30, number: "#03", ru: 1},
//     { name: "Server", type: "server", id: 31, number: "#04", ru: 1},
//     { name: "Server", type: "server", id: 32, number: "#05", ru: 1},
//     { name: "Server", type: "server", id: 33, number: "#06", ru: 1},
//     { name: "Server", type: "server", id: 34, number: "#07", ru: 1},
//     { name: "", type: "blank", id: 35, number: "", ru: 1},
//     { name: "", type: "blank", id: 36, number: "", ru: 1},
//     { name: "", type: "blank", id: 37, number: "", ru: 1},
//     { name: "Storage", type: "storage", id: 38,number: "#01", ru: 2},
// ];

router.post('/', function (req, res, next){
    user_req = req.body;

    getServiceSwitchInfo().then(function () {
        return getMgmtSwitchInfo();
    }).then(function () {
        return getServerInfo();
    }).then(function () {
        return getStorageInfo();
    }).then(function () {
        return setDefaultItems();
    }).then(function () {
        return setBlankItems();
    }).then(function () {
        res.status(200).send({
            items: items
        });
        items = [];
    });
    total_size = 41;
    count = 1;
    count_ru = 0;
});

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
                    //     { name: "Switch", type: "service-switch", id: 7, number: "#02", ru: 1},
                    //     { name: "", type: "blank", id: 28, number: "", ru: 1},
                    for(let i=1;i<=user_req.serviceSwitchCount;i++){
                        let json = {};
                        json["name"] = "Service Switch";
                        json["type"] = "service-switch";
                        json['id'] = count++;
                        json['ru'] = result[0].ru;
                        count_ru +=  result[0].ru;
                        if(user_req.serviceSwitchCount < 10){
                            json['number'] = "#0" + (i).toString();

                        } else {
                            json['number'] = "#" + (i).toString();
                        }
                        items.push(json);

                        let blank_json = { name: "", type: "blank", id: 0, number: "", ru: 1};
                        blank_json["id"] = count++;
                        count_ru += 1;
                        items.push(blank_json);
                    }
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
                    for(let i=1;i<=user_req.mgmtSwitchCount;i++){
                        let json = {};
                        json["name"] = "MGMT Switch";
                        json["type"] = "mgmt-switch";
                        json['id'] = count++;
                        json['ru'] = result[0].ru;
                        count_ru +=  result[0].ru;
                        if(user_req.mgmtSwitchCount < 10){
                            json['number'] = "#0" + (i).toString();

                        } else {
                            json['number'] = "#" + (i).toString();
                        }
                        items.push(json);

                        let blank_json = { name: "", type: "blank", id: 0, number: "", ru: 1};
                        blank_json["id"] = count++;
                        count_ru += 1;
                        items.push(blank_json);
                    }
                    resolve();
                }
            });
    });
}

function getServerInfo() {
    return new Promise(function(resolve, reject){
        // SELECT * FROM nfvi.server where partnum = '867959-B21';
        conn.query('SELECT * FROM server where partnum=?', user_req.serverId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    for(let i=1;i<=user_req.serverCount;i++){
                        let json = {};
                        json["name"] = "Server";
                        json["type"] = "server";
                        json['id'] = count++;
                        json['ru'] = result[0].ru;
                        count_ru +=  result[0].ru;
                        if(user_req.serverCount < 10){
                            json['number'] = "#0" + (i).toString();

                        } else {
                            json['number'] = "#" + (i).toString();
                        }
                        items.push(json);

                        let blank_json = { name: "", type: "blank", id: 0, number: "", ru: 1};
                        blank_json["id"] = count++;
                        count_ru += 1;
                        items.push(blank_json);
                    }
                    resolve();
                }
            });
    });
}

function getStorageInfo() {
    return new Promise(function(resolve, reject){
        conn.query('SELECT * FROM nfvi.storage where partnum=?', user_req.storageId,
            function (error, result) {
                if(error) {
                    res.status(400).send({
                        status: "fail",
                        msg: error
                    });
                }
                else {
                    for(let i=1;i<=user_req.storageCount;i++){
                        let json = {};
                        json["name"] = "Storage";
                        json["type"] = "storage";
                        json['id'] = count++;
                        json['ru'] = result[0].ru;
                        count_ru +=  result[0].ru;
                        if(user_req.storageCount < 10){
                            json['number'] = "#0" + (i).toString();

                        } else {
                            json['number'] = "#" + (i).toString();
                        }
                        items.push(json);
                    }
                    resolve();
                }
            });
    });
}

function setDefaultItems() {
    return new Promise(function(resolve, reject){
        let item1 = { name: "", type: "etc", id: 17, number: "", ru: 1};
        item1["name"] = "T-probe";
        item1["id"] = count++;
        count_ru +=  1;
        items.splice(0,0,item1);

        let item2 = { name: "", type: "etc", id: 17, number: "", ru: 1};
        item2["name"] = "KVM";
        item2["id"] = count++;
        count_ru +=  1;

        items.splice(21,0,item2);
        resolve();
    });
}

function setBlankItems() {
    return new Promise(function(resolve, reject){
        console.log(">> count : " + count);
        console.log(">> left : " + (41 - count_ru));
        let remains = 41-count_ru;
        for(let i=1;i<=remains;i++){
            let blank_json = { name: "", type: "blank", id: 0, number: "", ru: 1};
            blank_json["id"] = count++;
            count_ru += 1;
            items.push(blank_json);
        }
        resolve();
    });
}

module.exports = router;
