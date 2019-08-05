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
    //     return getWarn();
    // }).then(function () {
    //     return getError();
    }).then(function () {
        res.status(200).send({
            items: items
        });
        items = [];
    });
    total_size = 41;
});

function getServiceSwitchInfo() {
    // SELECT * FROM nfvi.server where partnum='867959-B21';
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
                    for(let i=1;i<=user_req.serviceSwitchCount;i++){
                        let json = {};
                        json["name"] = "Service Switch";
                        json["type"] = "service-switch";
                        json['id'] = count;
                        json['ru'] = result[0].ru;
                        if(user_req.serviceSwitchCount < 10){
                            json['number'] = "#0" + (i).toString();

                        } else {
                            json['number'] = "#" + (i).toString();
                        }
                        items.push(json);
                        count++;
                    }
                    resolve();
                }
            });
    });
}

module.exports = router;
