<template>
    <div class="t-input-section2">
        <p id="big-title">하드웨어 세부 스펙</p>

        <div class="hw-selector">
            <div class="category" @click="toggleServer()" style="width: 100%;">서버<img class="arrow" :src="arrowServerImg"></div>
            <div class="categories-server" v-if="toggleCatServer">
                <p class="items" id="cpu" @click="categorySelected($event)" :style="cpuStyle">CPU</p>
                <p class="items" id="memory" @click="categorySelected($event)" :style="memoryStyle">Memory</p>
                <p class="items" id="disk" @click="categorySelected($event)" :style="diskStyle">DISK</p>
                <p class="items" id="nic" @click="categorySelected($event)" :style="nicStyle">NIC</p>
                <p class="items" id="server" @click="categorySelected($event)" :style="serverStyle">Server</p>
            </div>
            <div class="category" @click="toggleSwitch()" style="width: 100%;">네트워크 스위치<img class="arrow" :src="arrowSwitchImg"></div>
            <div class="categories-server" v-if="toggleCatSwitch">
                <p class="items" id="switch" @click="categorySelected($event)" :style="switchStyle">Switch</p>
            </div>
            <div class="category" style="width: 100%;">스토리지<img class="arrow" src="../../assets/arrow-up.png"></div>
            <div class="category" style="width: 100%;">기타 장비<img class="arrow" src="../../assets/arrow-up.png"></div>
        </div>

        <div class="hw-specific">
            <div class="spec-title">
                <p>{{ specData.title }}</p>
            </div>

            <div class="spec-contents" v-if="specData.title === 'CPU'">
                <table>
                    <th v-for="hitem in specData.tableHeaders" :key="hitem.key">{{ hitem }}</th>
                    <tr v-for="item in specData.tableItems" :key="item.key">
                        <td style="width: 2%"><input type="radio" v-model="cpuId" :value="item.partnum"></td>
                        <td style="width: 30%;height: 10%">{{item.name}}</td>
                        <td style="width: 15%;text-align: center">{{item.clock}}GHz</td>
                        <td style="width: 10%;text-align: center">{{item.core}}core</td>
                        <!--가격 일단 지우기-->
                        <td style="width: 13%;text-align: center">{{ commafy(item.price)}}원</td>
                        <!--<td style="width: 10%;text-align: center">{{ commafy(1234000)}}원</td>-->
                        <td style="width: 7%; font-size: 12px;text-align: center">{{item.NEBS}}</td>
                        <td style="width: 10%; font-weight: bold;color: #EA002C;text-align: center">{{commafy(item.TPMc)}}</td>
                        <td style="width: 10%; font-weight: bold;color: #EA002C;text-align: center">{{(item.TPMc/item.price).toPrecision(3)}}점</td>
                        <td style="width: 8%; font-weight: bold;color: forestgreen;text-align: center" >{{isMaxValue((item.TPMc/item.price).toPrecision(3))}}</td>
                        <td style="width: 10%; text-align: center" >
                            <input v-if="cpuId === item.partnum" type="number" style="width: 35px" v-model.number="cpuCount"/>
                            <input v-else type="number" style="width: 50px; text-align: center" disabled/>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="spec-contents" v-else-if="specData.title === 'Memory'">
                <label style="font-size: 14px; font-weight: bold; padding-left: 10px">
                    목표 용량
                    <select class="type-dropdown" v-model.number="memTarget">
                        <option v-for="item in memVolums" :key="item.key" :value="item">{{item}}GB</option>
                    </select>
                </label>
                <table>
                    <th v-for="hitem in specData.tableHeaders" :key="hitem.key">{{ hitem }}</th>
                    <tr v-for="item in specData.tableItems" :key="item.key">
                        <td style="width: 2%"><input type="radio" v-model="memoryId" :value="item.partnum"></td>
                        <td style="width: 28%">{{item.name}}</td>
                        <td>{{item.speed}}</td>
                        <td>{{item.volume}}</td>
                        <td style="width: 12%;">{{commafy(item.price)}}원</td>
                        <td style="width: 8%;">{{item.pcs}}개</td>
                        <td style="font-weight: bold;color: #EA002C;text-align: center">{{ getMemoryScore(item.pcs)}}점</td>
                        <td style="width: 12%;font-weight: bold;color: #EA002C;text-align: center">{{commafy(item.price * item.pcs)}}원</td>
                        <td>
                            <input v-if="memoryId === item.partnum" type="number" style="width: 50px" v-model.number="memoryCount"/>
                            <input v-else type="number" style="width: 50px; text-align: center" disabled/>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="spec-contents" v-else-if="specData.title === 'Server'">
                <table>
                    <th v-for="hitem in specData.tableHeaders" :key="hitem.key">{{ hitem }}</th>
                    <tr v-for="item in specData.tableItems" :key="item.key">
                        <td style="width: 2%"><input type="radio" v-model="serverId" :value="item.partnum"></td>
                        <td style="width: 10%;height: 10%">{{item.vendor}}</td>
                        <td style="width: 35%;height: 10%">{{item.name}}</td>
                        <td style="width: 10%;height: 10%">{{item.ru}}U</td>
                        <td style="width: 10%;height: 10%">{{item.numOfCpu}}개</td>
                        <td style="width: 10%;height: 10%">{{commafy(item.price)}}원</td>
                        <td style="width: 10%;height: 10%">
                            <input v-if="serverId === item.partnum" type="number" style="width: 50px; text-align: center" v-model.number="serverCount"/>
                            <input v-else type="number" style="width: 50px; text-align: center" disabled/>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="spec-contents" v-else-if="specData.title === 'DISK'">
                <label style="font-size: 14px; font-weight: bold; padding-left: 10px"> DISK 선택
                    <select class="type-dropdown" v-model="diskId">
                        <option v-for="item in diskData" :value="item.partnum" :key="item.key">{{item.name}}</option>
                    </select>
                </label>
                <br>
                <br>
                <label style="font-size: 14px; font-weight: bold; padding-left: 10px">수량 <input type="number" value="12" v-model.number="diskCount"></label>
            </div>
            <div class="spec-contents" v-else-if="specData.title === 'NIC'">
                <table>
                    <th v-for="hitem in specData.tableHeaders" :key="hitem.key">{{ hitem }}</th>
                    <tr v-for="(item, index) in specData.tableItems" :key="item.key">
                        <td style="width: 5%"><input type="checkbox" v-model="nicStatus[index]"></td>
                        <td style="width: 10%;">{{item.giga}}G</td>
                        <td style="width: 10%;">{{item.type}}</td>
                        <td style="width: 10%;">{{item.option}}</td>
                        <td style="width: 10%;">{{item.ports}}ports</td>
                        <td style="width: 40%; height: 10%">{{item.name}}</td>
                        <td style="width: 10%">{{commafy(item.price)}}원</td>
                        <td style="width: 10%; text-align: center" >
                            <input type="number" style="width: 50px; text-align: center" v-model.number="nicCount[index]"/>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="spec-contents" v-else-if="specData.title === 'Switch'">
                <p style="font-size: 17px; font-weight: bolder; margin-left: 15px">서버 1대당</p>
                <label style="font-size: 17px; font-weight: bolder; margin-left: 20px">서비스 포트
                    <label>
                        <select>
                            <option value="10">10</option>
                            <option value="25">25</option>
                        </select>
                        G
                    </label>
                    X <input type="number" style="width: 50px"/>ports</label><br>
                <label style="font-size: 17px; font-weight: bolder; margin-left: 20px">관리 포트
                    <label>
                        <select>
                            <option value="10">10</option>
                        </select>
                        G
                    </label>
                    X <input type="number" style="width: 50px"/>ports</label><br>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "TInputSection2",
    data: function() {
        return {
            toggleCatServer: false,
            toggleCatSwitch: false,
            toggleCatStorage: false,
            arrowServerImg: require('../../assets/arrow-up.png'),
            arrowSwitchImg: require('../../assets/arrow-up.png'),
            arrowStorageImg: require('../../assets/arrow-up.png'),
            specData: {
                title: '',
                tableHeaders: [],
                tableItems: [ ]
            },
            diskData: [],
            memVolums: [384,768,192,512,256],
            memTarget: 384,
            serverId: '',
            serverCount: 0,
            cpuId: '',
            cpuCount: 0,
            memoryId: '',
            memoryCount: 0,
            diskId: '',
            diskCount: 0,
            nicId: [],
            nicStatus: [],
            nicCount: [],
            tempValue: 0,
            selectedStyle: 'background-color: #FF7A00; color: white',
            normalStyle: 'background-color: #FFFFFF; color: black',
            serverStyle: this.normalStyle,
            cpuStyle: this.normalStyle,
            memoryStyle: this.normalStyle,
            diskStyle: this.normalStyle,
            nicStyle: this.normalStyle,
            switchStyle: this.normalStyle,
        }
    },
    created: function() {
        // this.getCPUData();
    },
    watch: {
        serverId: function () {
            this.$store.commit('app/serverId', this.serverId);
        },
        serverCount: function () {
            this.$store.commit('app/serverCount', this.serverCount);
        },
        cpuId: function () {
            this.$store.commit('app/cpuId', this.cpuId);
        },
        cpuCount: function () {
            this.$store.commit('app/cpuCount', this.cpuCount);
        },
        memTarget: function () {
            this.$store.commit('app/memTarget', this.memTarget);
            this.getMemoryData();
        },
        memoryId: function () {
            this.$store.commit('app/memoryId', this.memoryId);
        },
        memoryCount: function () {
            this.$store.commit('app/memoryCount', this.memoryCount);
        },
        diskId: function () {
            this.$store.commit('app/diskId', this.diskId);
        },
        diskCount: function () {
            this.$store.commit('app/diskCount', this.diskCount);
        },
        nicId: function () {
            this.$store.commit('app/nicId', this.nicId);
        },
        nicStatus: function () {
            this.$store.commit('app/nicStatus', this.nicStatus);
        },
        nicCount: function () {
            this.$store.commit('app/nicCount', this.nicCount);
        }
    },
    methods: {
        toggleServer: function(){
            this.toggleCatServer = !this.toggleCatServer;
            if (this.toggleCatServer === true) {
                this.arrowServerImg = require('../../assets/arrow-down.png');
            } else {
                this.arrowServerImg = require('../../assets/arrow-up.png');
            }
        },
        toggleSwitch: function(){
            this.toggleCatSwitch= !this.toggleCatSwitch;
            if (this.toggleCatSwitch === true) {
                this.arrowServerImg = require('../../assets/arrow-down.png');
            } else {
                this.arrowServerImg = require('../../assets/arrow-up.png');
            }
        },
        toggleStorage: function(){
            this.toggleCatStorage = !this.toggleCatStorage;
            if (this.toggleCatStorage === true) {
                this.arrowServerImg = require('../../assets/arrow-down.png');
            } else {
                this.arrowServerImg = require('../../assets/arrow-up.png');
            }
        },
        getCPUData: function() {
            this.$http.get('http://localhost:3000/v1/cpu')
                .then(response => {
                    this.specData.tableHeaders = ['','부품 정보','Clock속도', 'Core수', '가격', 'NEBS Lv3', '성능 점수', '가성비 점수', '추천', '수량'];
                    this.specData.tableItems = response.data.data;
                });
        },
        getMemoryData: function() {
            this.$http.get('http://localhost:3000/v1/memory', {
                params: { target: this.memTarget }
            })
                .then(response => {
                    // console.log(response.data.data);
                    this.specData.tableHeaders = ['','부품 정보', '속도', '개당 용량', '가격', '갯수','상대적 성능', '총 가격', '수량'];
                    this.specData.tableItems = response.data.data;
                });
        },
        getServerData: function() {
            this.$http.get('http://localhost:3000/v1/server')
                .then(response => {
                    this.specData.tableHeaders = ['','벤더','부품 정보','RU','CPU 개수', '가격', '수량'];
                    this.specData.tableItems = response.data.data;

                });
        },
        getNICData: function() {
            this.$http.get('http://localhost:3000/v1/nic')
                .then(response => {
                    this.specData.tableHeaders = ['','G','타입','옵션','포트','부품 정보','가격','수량'];
                    this.specData.tableItems = response.data.data;

                    let nicData = response.data.data;
                    for(let i=0;i<nicData.length;i++){
                        this.nicCount.push(0);
                        this.nicStatus.push(false);
                        this.nicId.push(nicData[i].partnum);

                    }
                    // console.log("@@@@@@");
                    // console.log(this.nicData);
                });
        },
        getDiskData: function() {
            this.$http.get('http://localhost:3000/v1/disk')
                .then(response => {
                    this.diskData = response.data.data;
                });
        },
        isMaxValue(value) {
            var maxValue = -1;
            var items = this.specData.tableItems;
            // (item.TPMc/item.price).toPrecision(3)}}점
            items.forEach(function(item) {
                var score = (item.TPMc/item.price).toPrecision(3);
                if(score > maxValue)
                    maxValue = score;
            });
            if(value === maxValue){
                return 'BEST!';
            } else {
                return '';
            }
        },
        isNICSelected(partnum, count) { // v-if="cpuId === item.partnum"
            this.nicData.push({partnum: partnum, count: count});
        },
        commafy(num){
            var str = num.toString().split('.');
            if (str[0].length >= 5) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 5) {
                str[1] = str[1].replace(/(\d{3})/g, '$1 ');
            }
            return str.join('.');
        },
        getMemoryScore(pieces) {
            if(pieces === 24) {
                return 100;
            } else if(pieces === 12) {
                return 97;
            } else if (pieces === 16){
                return 68;
            } else if (pieces === 8) {
                return 67;
            } else if (pieces === 4) {
                return 35;
            } else {
                return 0;
            }
        },
        categorySelected(event){
            var prevSelected = this.specData.title;

            switch (prevSelected) {
                case "Server":
                    this.serverStyle = this.normalStyle;
                    break;
                case "CPU":
                    this.cpuStyle = this.normalStyle;
                    break;
                case "Memory":
                    this.memoryStyle = this.normalStyle;
                    break;
                case "DISK":
                    this.diskStyle = this.normalStyle;
                    break;
                case "NIC":
                    this.nicStyle = this.normalStyle;
                    break;
                case "Switch":
                    this.switchStyle = this.normalStyle;
                    break;
            }

            if(event.currentTarget.id === 'server'){
                this.specData.title = 'Server';
                this.serverStyle = this.selectedStyle;
                this.getServerData();
            } else if(event.currentTarget.id === 'cpu'){
                this.specData.title = 'CPU';
                this.cpuStyle = this.selectedStyle;
                this.getCPUData();
            } else if(event.currentTarget.id === 'memory'){
                this.specData.title = 'Memory';
                this.memoryStyle = this.selectedStyle;
                this.getMemoryData();
            } else if(event.currentTarget.id === 'disk'){
                this.specData.title = 'DISK';
                this.diskStyle = this.selectedStyle;
                this.getDiskData();
            } else if(event.currentTarget.id === 'nic'){
                this.specData.title = 'NIC';
                this.nicStyle = this.selectedStyle;
                this.getNICData();
            } else if(event.currentTarget.id === 'switch'){
                this.specData.title = 'Switch';
                this.switchStyle = this.selectedStyle;
            }
        }
}
}
</script>

<style scoped>
.t-input-section2{
    position: absolute;
    /*background-color: blue;*/
    top: 11%;
    margin-top: 1%;
    height: 80%;
    width: 100%;
}
.hw-selector {
    position: absolute;
    background-color: #f4f6f6;
    top: 8%;
    left: 2%;
    height: 87%;
    width: 25%;
}
.hw-specific {
    position: absolute;
    background-color: #f4f6f6;
    top: 8%;
    right: 2%;
    height: 87%;
    width: 70%;
}
#big-title {
    /*color: white;*/
    position: absolute;
    font-weight: 800;
    font-size: 20px;
    margin-left: 1%;
}
.category {
    font-size: 15px;
    font-weight: 700;
    padding: 2% 2% 2% 4%;
}
.items {
    background-color: white;
    padding: 2%;
    margin-left: 3%;
    margin-right: 3%;
    font-size: 13px;
    font-weight: 600;
}
.arrow {
    position: absolute;
    right: 5%;
    width: 4%;
    height: 3%;
}
.spec-title {
    position: absolute;
    /*background-color: lightcoral;*/
    width: 100%;
    height: 10%;
}
.spec-contents{
    position: absolute;
    background-color: white;
    top:10%;
    left: 1%;
    width: 98%;
    height: 88%;
}
.spec-title p {
    margin-left: 2%;
    font-size: 16px;
    font-weight: 700;
    color: #ff5700;
}
table {
    font-family:Arial, Helvetica, sans-serif;
    /*color:#666;*/
    /*font-size:12px;*/
    /*text-shadow: 1px 1px 0px #fff;*/
    /*background:#eaebec;*/
    /*margin:20px;*/
    /*border:#ccc 1px solid;*/

    /*border-radius:3px;*/
    /*box-shadow: 0 1px 2px #d1d1d1;*/
}
table th {
    padding:10px 10px 10px 10px;
    border-top:1px solid #fafafa;
    border-bottom:1px solid #e0e0e0;
    background: #f4f6f6;
    font-size: 15px;
}
table tr {
    /*text-align: center;*/
    padding-left:20px;
}
table td {
    padding:18px 10px 18px 10px;
    border-top: 1px solid #ffffff;
    border-bottom:1px solid #e0e0e0;
    border-left: 1px solid #e0e0e0;
    font-size: 13px;
    background: #ffffff;
}
.items.active {
    background-color: lightgreen;
}
.type-dropdown{
    /*width: 200px;*/
    height: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 #a6b7cd;
    background-color: #ffffff;
    margin-left: 2%;
    margin-right: 2%;
}
</style>

<!--http://johnsardine.com/freebies/dl-html-css/simple-little-tab/-->
