<template>
    <div class="t-result-section1">
        <p class="mid-title">{{ pageTitle }}</p>

        <div class="rack-numbers">
            <div v-for="n in 41" :key="n">{{ 42 - n }}</div>
        </div>
        <div class="rack-items">
            <draggable
                    :disabled="!enabled"
                    class="list-group"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="dragging = false"
            >
                <tr v-for="item in items" :key="item.key">
                    <td style=""><img border="0" width="150px" :src="getImgSrc(item.type, item.ru)" :height="getImgHeight(item.ru)"/></td>
                    <td :height="getItemHeight(item.ru)" :style="getItemStyle(item.type)" rowspan="2">
                        <span v-if="item.type === 'server'">{{workloadName}}</span>
                        {{ item.name }} {{item.number}}
                    </td>
                </tr>

                <!--{{ element.name }}-->
            </draggable>
        </div>
        <img class="rack-chassis" src="../../assets/rack.png"/>
        <button class="menu-button" style="position: absolute; left: 600px" @click="onClickMenu1">비용/전력량</button>
        <!--<button style="position: absolute; left: 650px; top: 150px" @click="onClickMenu2">전력</button>-->
        <button class="menu-button" style="position: absolute; left: 600px; top: 200px" @click="onClickMenu3">네트워크 구성도</button>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "TResultSection1",
    components: {
        draggable,
    },
    data: function() {
        return {
            pageTitle: '',
            myStyle: '',
            enabled: true,
            items: [],
            dragging: false,
            workloadName: '',
            showModal: false,
            inputKeys: [ "날짜", "담당자", "설명"],
            userInput: { },
            Datas: {
                // We will make a Workbook contains 2 Worksheets
                'animals': [
                    {"type":"","name": "cat", "category": "animal"}
                    ,{"name": "dog", "category": "animal"}
                    ,{"type":"HPE 241df df fdsfSDSDV","name": "pig", "category": "animal"}
                ],
                'pokemons': [
                    {"name": "pikachu", "category": "pokemon"}
                    ,{"name": "Arbok", "category": "pokemon"}
                    ,{"name": "Eevee", "category": "pokemon"}
                ],
                'costData': [
                    // { type: "서버", name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
                    // { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
                    // { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
                    // { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
                    // { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
                    // { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
                    // { type: "스위치", name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
                    // { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
                    // { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
                    // { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
                    // { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
                    // { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
                ],
                // 'powerData': [
                //     {"type":"","name": "cat", "category": "animal"}
                //     ,{"name": "dog", "category": "animal"}
                //     ,{"type":"HPE 241df df fdsfSDSDV","name": "pig", "category": "animal"}
                // ],
            }
        }
    },
    created: function() {
        this.pageTitle = 'Rack 구성도';

        this.getItemList();
        this.workloadName = this.$store.state.app.workloadName;
        // this.getExcelData();
        // console.log(">>>" + this.$store.state.app.mgmtSwitchCount);
        // console.log(">>>" + this.$store.state.app.storageCount);
        // console.log(">>>" + this.$store.state.app.serviceSwitchCount);


    },
    computed: {
        draggingInfo() {
            return this.dragging ? "under drag" : "";
        }
    },
    methods: {
        getItemList(){
            let json = this.$store.state.app;
            // console.log(json);
            this.$http.post('http://localhost:3000/v1/rack', json)
                .then(response => {
                    // console.log(response.data.items);
                    this.items = response.data.items;
                });
        },
        onMouseEnter() {
            // alert("HI")
            this.myStyle = 'background-color: lightcoral';
        },
        onMouseLeave() {
            this.myStyle = '';
        },
        onClickMenu1() {
            this.$router.push({
                name: 'TResultSection2'
            })
        },
        onClickMenu2() {
            this.$router.push({
                name: 'TResultSection3'
            })
        },
        onClickMenu3() {
            this.$router.push({
                name: 'TResultSection4'
            })
        },
        goToHome() {
            this.$router.push({
                name: 'TResultMain'
            })
        },
        getItemHeight(size) {
            if(size === 2){
                return'42px';
            } else if(size === 1) {
                return '21px';
            }
        },
        getItemStyle(type) {
            if(type === "server"){
                return "background-color: lightblue";
            } else if(type === "mgmt-switch"){
                return "background-color: #ffbf00";
            } else if(type === "service-switch"){
                return "background-color: #ccc0da";
            } else if(type === "storage") {
                return "background-color: lightgray";
            } else if(type === "etc") {
                return "background-color: lightslategrey";
            } else if(type === "blank") {
                return "background-color: white;";
            }
        },
        getImgSrc(type, size){
            if(type === "server"){
                if( size === 1){
                    return require('../../assets/server-1U.png');
                } else if( size === 2) {
                    return require('../../assets/server-2U.png');
                }
            } else if(type === "mgmt-switch"){
                return require('../../assets/switch-1U.png');
            } else if(type === "service-switch"){
                return require('../../assets/switch-1U.png');
            } else if(type === "storage") {
                return require('../../assets/storage-2U.png');
            } else if(type === "etc") {
                return require('../../assets/KVM-1U.png');
            } else if(type === "blank") {
                return require('../../assets/blank-img.png');
            }
        },
        getImgHeight(size){
            if(size === 1){
                return '15px';
            } else if (size === 2){
                return '35px'
            }
        }
    }
}
</script>

<style scoped>
.t-result-section1{
    position: absolute;
    height: 100%;
    width: 40%;
    /*background-color: lightcoral;*/
}
#big-title {
    font-weight: 800;
    font-size: 18px;
    margin: 0 auto;
}
.mid-title {
    font-weight: 700;
    font-size: 18px;
    margin: 0 auto;
}
.buttons {
    margin-top: 35px;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.rack-numbers{
    position: absolute;
    height: 85%;
    width: 30px;
    margin-top: 13px;
    margin-left: 50px;
    font-size: 13px;
    text-align: center;
}
.rack-numbers div{
    height: 21px;
    border: 1px solid rgba(0,0,0,.125);
}
.rack-items{
    margin-top: 13px;
    position: absolute;
    height: 85%;
    width: 400px;
    margin-left: 80px;
    font-size: 13px;
}
.rack-items td{
    border: 1px solid rgba(0,0,0,.125);
    text-align: center;
    width: 200px;
}
.rack-chassis{
    margin-left: 92px;
    height: 925px;
    width: 180px;
}
.menu-button{
    width: 120px;
    height: 43px;
    /*border-radius: 20px;*/
    box-shadow: 0 2px 4px 0 #c6d5e9;
    background-color: #1c1f28;
    color: white;
    font-size: 13px;
}
</style>
