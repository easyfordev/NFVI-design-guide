<template>
    <div class="history-main">
        <div class="title">
            <p id="big-title">설계 히스토리</p>
            <p id="description">시스템 Workload별 가상화 인프라(NFVI) 설계 내역을 조회할 수 있습니다.</p>
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
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'show'">
                        <button style="background-color: lightgreen">결과보기</button>
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
    name: "HistoryMain",
    components: { VueGoodTable },
    data: function() {
        return {
            columns: [ ],
            rows: [ ],
        };
    },
    created: function() {
        // this.getCPUData();
        this.getData()
    },
    methods: {
        getData(){
            this.$http.get('http://localhost:3000/v1/history')
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
                    colArray.push({'label': '', 'field':'show'});

                    this.columns = colArray;

                    this.rows = response.data.data;
                });
            // .catch(response => { // TODO : 예외일 떄 처리하기 (Promise, axios 문법)
            //     console.log(response.status)
            // });
        },
        onCellClick(params) {
            if(params.column.field === 'show'){
                this.$router.push({
                    path: '/result/amf0011'
                })
            }
        },
    }
}
</script>

<style scoped>
.history-main {
    position: absolute;
    top: 5%;
    width:80%;
    height: 95%;
    left: 10%;
    /*background-color: lightgoldenrodyellow;*/
    /*border: 1px solid black;*/
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
</style>
