<template>
    <div class="t-admin-main">
        <div class="my-modal" v-if="showModal" :data="editInput">
            <p id="modal-title">데이터 수정</p>
            <div v-for="item in inputKeys" :key="item.key">
                <span style="font-weight: bold; margin-left: 5%;"> {{ item }} </span>
                <input type="text" v-model="userInput[item]" style="position: absolute; width: 50%;right: 5%">
            </div>
            <div style="position: absolute; bottom: 4%;right: 2%">
                <button id="modal-cancel-button" @click="onModalCancel">취소</button>
                <button id="modal-done-button" @click="onModalDone">완료</button>
            </div>
        </div>
        <div class="title">
            <p id="big-title">관리자 메뉴</p>
            <p id="description">가상화 인프라 H/W(NFVI) 데이터를 관리할 수 있습니다.</p>
        </div>
        <div class="type-selector">
                <label style="font-size: 13px; font-weight: bold; margin-left: 1%; position: relative; top:25%">H/W 타입
                    <select id="type-dropdown" v-model="selectedType">
                        <option v-for="item in options" :key="item.key">{{item}}</option>
                    </select>
                </label>
        </div>

        <div class="data-table">
            <div style="display: flex; width: 100%" v-if="showAdd">
                <div v-for="item in inputKeys" :key="item.key">
                    <span style="font-weight: bold"> {{ item }} </span>
                    <input type="text" v-model="userInput[item]" style="width: 80%;">
                </div>
                <button id="add-done-btn" @click="sendData">추가</button>
            </div>
            <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    :pagination-options="{
                        enabled: true,
                        mode: 'records'
                     }"
                    @on-cell-click="onCellClick"
                    style="padding-top: 1%"
            >
                <div slot="table-actions">
                    <button id="add-data" @click="onAddClick">+ 데이터 추가</button>
                </div>
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'edit'">
                        <button style="background-color: lightblue">수정</button>
                        <!--<span style="font-weight: bold; color: blue;">{{props.row.age}}</span>-->
                    </span>
                    <span v-if="props.column.field == 'delete'">
                        <button style="background-color: lightcoral">삭제</button>
                        <!--<span style="font-weight: bold; color: blue;">{{props.row.age}}</span>-->
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                </template>
            </vue-good-table>
        </div>
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
    name: "TAdminMain",
    data: function() {
        return {
            options: ['CPU','Server','Memory','NIC','DISK','Switch'],
            selectedType: 'CPU',
            columns: [ ],
            rows: [ ],
            showAdd: false,
            inputKeys: [],
            userInput: { },
            showModal: false,
            editInput: { }
        };
    },
    components: { VueGoodTable },
    watch: {
        selectedType: function () {
            this.onTypeSelected(this.selectedType)
            // this.fullName = val + ' ' + this.lastName
        }
    },
    created: function() {
        // this.getCPUData();
        this.onTypeSelected(this.selectedType)
    },
    methods: {
        onTypeSelected(val){
            let url = 'http://localhost:3000/v2/' + val.toString();
            this.$http.get(url)
                .then(response => {
                    let keys = Object.keys(response.data.data[0]);
                    let userInput = {};
                    for (let i=0;i<keys.length ; i++){
                        userInput[keys[i]] ='';
                    }
                    this.inputKeys = keys;
                    this.userInput = userInput;

                    let colArray = [];
                    for (let i=0;i<keys.length ; i++){
                        let json = {};
                        json['label'] = keys[i];
                        json['field'] = keys[i];
                        colArray.push(json);
                    }
                    colArray.push({'label': '', 'field':'edit'});
                    colArray.push({'label': '', 'field':'delete'});

                    this.columns = colArray;

                    this.rows = response.data.data;
                });
                // .catch(response => { // TODO : 예외일 떄 처리하기 (Promise, axios 문법)
                //     console.log(response.status)
                // });
        },
        onCellClick(params) {
            if(params.column.field === 'edit'){
                console.log(params.row);
                this.userInput = params.row;
                this.showModal = true;
            } else if(params.column.field === 'delete'){
                this.$http
                    .post('http://localhost:3000/v1/cpu/delete', {'id': params.row.id})
                    .then(response => {
                        alert("삭제하시겠습니까?");
                        response.status; // legacy code for es-lint
                        this.onTypeSelected(this.selectedType);
                    });
            }
            // params.row - row object
            // params.column - column object
            // params.rowIndex - index of this row on the current page.
            // params.event - click event
        },
        onAddClick(){
            this.showAdd = !this.showAdd;
            // console.log(this.inputKeys)
            // console.log(this.userInput)

        },
        sendData(){
            // console.log(this.userInput)
            this.$http
                .post('http://localhost:3000/v1/cpu/insert', this.userInput)
                .then(response => {
                    response.status
                    this.showAdd = false;
                    this.onTypeSelected(this.selectedType);
                    alert("데이터가 성공적으로 추가되었습니다!");
                });
        },
        onModalCancel() {
            this.showModal = false;
        },
        onModalDone() {
            this.$http
                .post('http://localhost:3000/v1/cpu/update', this.userInput)
                .then(response => {
                    alert("데이터를 변경하시겠습니까?");
                    response.status; // legacy code for es-lint
                    this.showModal = false;
                    this.onTypeSelected(this.selectedType);
                });
        }
    }
}
</script>

<style scoped>
.t-admin-main {
    position: absolute;
    top: 5%;
    width:80%;
    height: 95%;
    left: 10%;
    /*background-color: lightblue;*/
}
#big-title {
    font-weight: 800;
    font-size: 20px;
    margin-left: 1%;
}
#description {
    font-size: 15px;
    margin-left: 1%;
}
.type-selector{
    width: 100%;
    height: 7%;
    margin-left: 1%;
    background-color: #f4f6f6;
}
#type-dropdown{
    width: 200px;
    height: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 #a6b7cd;
    background-color: #ffffff;
}
.data-table{
    width: 100%;
    height: 75%;
    background-color: #f4f6f6;
    margin-left: 1%;
    margin-top: 2%;
}
#add-data{
    width: 120px;
    height: 43px;
    border-radius: 20px;
    box-shadow: 0 2px 4px 0 #c6d5e9;
    background-color: #1c1f28;

    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
}
#add-done-btn{
    /*width: 120px;*/
    /*height: 43px;*/
    padding: 1%;
    border-radius: 5px;
    box-shadow: 0 2px 4px 0 #c6d5e9;
    background-color: #EA002C;
    color: white;
}
.my-modal{
    position: inherit;
    left: 20%;
    top: 30%;
    width: 60%;
    height: 50%;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.54);
    background-color: #ffffff;
    z-index: 2;
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
