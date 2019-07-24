<template>
    <div class="t-admin-main">
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
                    <button id="add-data">+ 데이터 추가</button>
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
            rows: [
                // {name: "John", age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343},
                // {name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343}
                // {id: 1, name: "John", age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343},
                // {id: 2, name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343},
                // {id: 3, name: "Susan", age: 16, createdAt: '2011-10-30', score: 0.03343},
                // {id: 4, name: "Chris", age: 55, createdAt: '2011-10-11', score: 0.03343},
                // {id: 5, name: "Dan", age: 40, createdAt: '2011-10-21', score: 0.03343},
                // {id: 6, name: "John", age: 20, createdAt: '2011-10-31', score: 0.03343},
            ]
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
                })
                .catch(response => { // TODO : 예외일 떄 처리하기 (Promise, axios 문법)
                    console.log(response.status)
                });
        },
        onCellClick(params) {
            if(params.column.field === 'edit'){
                console.log('THis is edit ')
            } else if(params.column.field === 'delete'){
                console.log('THis is delete ')

            }
            // params.row - row object
            // params.column - column object
            // params.rowIndex - index of this row on the current page.
            // params.event - click event
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
</style>
