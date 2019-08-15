<template>
    <div class="t-result-main">
        <div class="my-modal" v-if="showModal" :data="userInput">
            <p id="modal-title">설계 내역 저장</p>
            <div v-for="(item, index) in inputKeys" :key="item.key">
                <span style="font-weight: bold; margin-left: 5%;"> {{ item }} </span>
                <input type="text" v-model="userInput[index]" style="position: absolute; width: 50%;right: 5%">
            </div>
            <div style="position: absolute; bottom: 4%;right: 2%">
                <button id="modal-cancel-button" @click="onModalCancel">취소</button>
                <button id="modal-done-button" @click="onModalDone">완료</button>
            </div>
        </div>

        <p id="big-title">시스템 가상화 인프라 디자인 - {{workloadName}}
            <button class="export-button" @click="onSave">설계 내역 저장하기</button>
            <button class="export-button" @click="onexport">엑셀 파일로 내보내기</button>
        </p>
        <t-result-section1></t-result-section1>
        <router-view></router-view>
<!--        <t-result-section2></t-result-section2>-->
    </div>
</template>

<script>
import TResultSection1 from './TResultSection1'
import XLSX from 'xlsx';

    // import TResultSection2 from './TResultSection2'
export default {
    name: "TResultMain",
    components: { TResultSection1 },
    created: function ( ) {
        // TODO : Please delete this code! just for test
        // this.$store.commit('app/workloadType', 'Signaling');
        // this.$store.commit('app/workloadName', 'SNF');

        this.$store.commit('app/serviceSwitchCount', 2);
        this.$store.commit('app/serviceSwitchId', 'CE6865-EI-B-B0B');

        this.$store.commit('app/mgmtSwitchCount', 2);
        this.$store.commit('app/mgmtSwitchId', 'CE8861-4C-EI-B');

        this.$store.commit('app/storageCount', 0);
        this.$store.commit('app/storageId', '');

        // this.$store.commit('app/serverCount', 12);
        // this.$store.commit('app/serverId', '867959-B21');
        //
        // this.$store.commit('app/cpuCount', 24);
        // this.$store.commit('app/cpuId', '826878-B21');
        //
        // this.$store.commit('app/memoryCount', 144);
        // this.$store.commit('app/memoryId', '815100-B21');
        //
        // this.$store.commit('app/diskCount', 24);
        // this.$store.commit('app/diskId', '872479-B21');

        this.workloadName = this.$store.state.app.workloadName;
        // let userInput = {};
        // for (let i=0;i<this.inputKeys.length ; i++){
        //     userInput[keys[i]] ='';
        // }
        // this.userInput = userInput;
        this.getExcelData();

    },
    data: function () {
        return{
            workloadName: '',
            showModal: false,
            inputKeys: [ "날짜", "담당자", "설명"],
            userInput: ['','',''],
            Datas: {
                'costData': [ ]
            }
        }
    },
    methods: {
        onSave() {
            // this.userInput = params.row;
            this.showModal = true;
        },
        onModalCancel() {
            this.showModal = false;
        },
        onModalDone() {
            let json = {};
            json["workloadType"] = this.$store.state.app.workloadType;
            json["workloadName"] = this.$store.state.app.workloadName;
            json["hid"] = this.$store.state.app.workloadName.toLocaleLowerCase() + "0011";

            for(let i=0;i< this.userInput.length;i++){
                json[this.inputKeys[i]] = this.userInput[i];
            }

            this.$http
                .post('http://localhost:3000/v1/history/insert', json)
                .then(response => {
                    response.status;
                    this.showModal = false;
                    alert("설계 내역이 성공적으로 저장되었습니다!");
                });
        },
        getExcelData(){
            let json = this.$store.state.app;
            // console.log(json);
            this.$http.post('http://localhost:3000/v1/excel', json)
                .then(response => {
                    // console.log(response.data.items);
                    this.Datas.costData = response.data.items;
                    // console.log("Here!");
                    // console.log(this.Datas.costData);
                });
        },
        onexport () { // On Click Excel download button
            // export json to Worksheet of Excel
            // only array possible
            var animalWS = XLSX.utils.json_to_sheet(this.Datas.costData);
            // var pokemonWS = XLSX.utils.json_to_sheet(this.Datas.pokemons)

            // A workbook is the name given to an Excel file
            var wb = XLSX.utils.book_new(); // make Workbook of Excel

            // add Worksheet to Workbook
            // Workbook contains one or more worksheets
            XLSX.utils.book_append_sheet(wb, animalWS, 'AMF'); // sheetAName is name of Worksheet
            // XLSX.utils.book_append_sheet(wb, pokemonWS, 'pokemons')

            // export Excel file
            XLSX.writeFile(wb, 'data.xlsx'); // name of the file is 'data.xlsx'
        },
    }
}
</script>

<style scoped>
.t-result-main {
    position: absolute;
    top: 5%;
    width:100%;
    height: 95%;
    /*background-color: black;*/
}
#big-title {
    font-weight: 800;
    font-size: 18px;
    margin: 0 auto;
}
.export-button{
     background-color: grey;
     color: white;
     font-size: 15px;
     margin-left: 30px;
     border-radius: 10px;
 }
.my-modal{
    position: absolute;
    left: 0;
    top: 5%;
    width: 50%;
    height: 20%;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.54);
    background-color: #ffffff;
    z-index: 20;
}
#modal-title{
    text-align: center;
    font-weight: 800;
    font-size: 20px;
    margin-left: 1%;
}
#modal-cancel-button{
    width: 80px;
    height: 30px;
    border-radius: 20px;
    /*box-shadow: 0 2px 4px 0 #c6d5e9;*/
    background-color: #f4f6f6;

    font-size: 14px;
    font-weight: bold;
    color: #000000;
}
#modal-done-button{
    width: 80px;
    height: 30px;
    border-radius: 20px;
    /*box-shadow: 0 2px 4px 0 #c6d5e9;*/
    background-color: #1c1f28;

    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
}
</style>
