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
let user_req = {};
let titles = [];
let data = [];

router.post('/', function (req, res, next){
    user_req = req.body;

    getTitles().then(function () {
        res.status(200).send({
            // labels: labels,
            titles: titles,
            data: data
        });
        // labels = []
        data = []
    })
});

// router.post('/title', function (req, res, next){
//     user_req = req.body;
// });

function getTitles() {
    return new Promise(function(resolve, reject) {
        resolve();
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

module.exports = router;
