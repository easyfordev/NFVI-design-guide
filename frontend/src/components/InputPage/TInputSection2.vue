<template>
    <div class="t-input-section2">
        <p id="big-title">하드웨어 세부 스펙</p>

        <div class="hw-selector">
            <div class="category" @click="toggleServer()" style="width: 100%;">서버<img class="arrow" :src="arrowServerImg"></div>
            <div class="categories-server" v-if="toggleCatServer">
                <p class="items" id="server" @click="categorySelected($event)" :style="serverStyle">Server</p>
                <p class="items" id="cpu" @click="categorySelected($event)" :style="cpuStyle">CPU</p>
                <p class="items" id="memory" @click="categorySelected($event)" :style="memoryStyle">Memory</p>
                <p class="items" id="disk" @click="categorySelected($event)" :style="diskStyle">DISK</p>
                <p class="items" id="nic" @click="categorySelected($event)" :style="nicStyle">NIC</p>
            </div>
            <div class="category" style="width: 100%;">스토리지<img class="arrow" src="../../assets/arrow-up.png"></div>
            <div class="category" style="width: 100%;">네트워크 스위치<img class="arrow" src="../../assets/arrow-up.png"></div>
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
                        <td style="font-weight: bold;color: #EA002C;text-align: center">{{item.score}}점</td>
                        <td style="width: 12%;font-weight: bold;color: #EA002C;text-align: center">{{commafy(item.price * item.pcs)}}원</td>
                        <td><span style="width: 8%; font-weight: bold;color: forestgreen;text-align: center">BEST!</span></td>
                        <td>
                            <input v-if="memoryId === item.partnum" type="number" style="width: 25px" v-model.number="memoryCount"/>
                            <input v-else type="number" style="width: 25px; text-align: center" disabled/>
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
                        <td style="width: 10%;height: 10%">{{item.size}}U</td>
                        <td style="width: 10%;height: 10%">{{item.numOfCpu}}개</td>
                        <td style="width: 10%;height: 10%">
                            <input v-if="serverId === item.partnum" type="number" style="width: 50px; text-align: center" v-model.number="serverCount"/>
                            <input v-else type="number" style="width: 50px; text-align: center" disabled/>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="spec-contents" v-else-if="specData.title === 'DISK'">
                <p style="font-size: 15px; text-align: center">기본값을 사용합니다</p>
                <label style="font-size: 14px; font-weight: bold; padding-left: 10px"> DISK 선택
                    <select class="type-dropdown">
                        <option>HPE 1.2TB SAS 10K SFF SC DS HDD</option>
                    </select>
                </label>
                <br>
                <br>
                <label style="font-size: 14px; font-weight: bold; padding-left: 10px">수량 <input type="number" value="12"></label>
            </div>
            <div class="spec-contents" v-else-if="specData.title === 'NIC'">
                <p style="font-size: 15px; text-align: center">기본값을 사용합니다</p>
                <table>
                    <th></th>
                    <th>용량</th>
                    <th>타입</th>
                    <th>부품 정보</th>
                    <th>가격</th>
                    <th>수량</th>

                    <tr>
                        <td><input type="checkbox"/></td>
                        <td style="width: 10%">NIC_10G</td>
                        <td style="width: 10%">UTP(FLR)</td>
                        <td style="width: 40%">HPE Eth 10Gb 2p 562FLR-T Adptr</td>
                        <td>313,000원</td>
                        <td><input type="number" style="width: 30px"></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox"/></td>
                        <td style="width: 10%">NIC_10G</td>
                        <td style="width: 10%">UTP</td>
                        <td style="width: 40%">HPE Eth 10Gb 2p 562T Adptr</td>
                        <td>333,000원</td>
                        <td><input type="number" style="width: 30px" value="1"></td>
                    </tr>
                </table>
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
            arrowServerImg: require('../../assets/arrow-up.png'),
            specData: {
                title: '',
                tableHeaders: [],
                tableItems: [ ]
            },
            memVolums: [384,768,192,512,256],
            memTarget: 384,
            serverId: '',
            serverCount: 0,
            cpuId: '',
            cpuCount: 0,
            memoryId: '',
            memoryCount: 0,
            selectedStyle: 'background-color: #FF7A00; color: white',
            normalStyle: 'background-color: #FFFFFF; color: black',
            serverStyle: this.normalStyle,
            cpuStyle: this.normalStyle,
            memoryStyle: this.normalStyle,
            diskStyle: this.normalStyle,
            nicStyle: this.normalStyle
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
                    this.specData.tableHeaders = ['','부품 정보', '속도', '개당 용량', '가격', '갯수','상대적 성능', '총 가격', '추천', '수량'];
                    this.specData.tableItems = response.data.data;
                });
        },
        getServerData: function() {
            this.$http.get('http://localhost:3000/v1/server')
                .then(response => {
                    this.specData.tableHeaders = ['','벤더','부품 정보','RU','CPU 개수', '수량'];
                    this.specData.tableItems = response.data.data;
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
            } else if(event.currentTarget.id === 'nic'){
                this.specData.title = 'NIC';
                this.nicStyle = this.selectedStyle;
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
