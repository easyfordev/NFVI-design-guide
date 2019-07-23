<template>
    <div class="t-result-section2">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">비용 계산기</p>
        <div class="cost-estimation">
            <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    max-height="250px"
                    :fixed-header="true"
            >
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'age'">
                        <span style="font-weight: bold; color: blue;font-size: 10px">{{props.row.age}}</span>
                    </span>
                    <span v-else>
                        {{props.formattedRow[props.column.field]}}
                    </span>
                </template>
            </vue-good-table>
        </div>

        <p class="mid-title" style="position: absolute; top: 45%;width: 100%;height: 5%">전력 소모량 계산기</p>
        <div class="power-estimation">
        </div>
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

    export default {
        name: "TResultSection2",
        components: { VueGoodTable },
        data() {
            return {
                columns: [
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'Age',
                        field: 'age',
                        type: 'number',
                    },
                    {
                        label: 'Created On',
                        field: 'createdAt',
                        type: 'date',
                        dateInputFormat: 'YYYY-MM-DD',
                        dateOutputFormat: 'MMM Do YY',
                    },
                    {
                        label: 'Percent',
                        field: 'score',
                        type: 'percentage',
                    },
                ],
                rows: [
                    {id: 1, name: "John", age: 20, createdAt: '201-10-31:9: 35 am', score: 0.03343},
                    {id: 2, name: "Jane", age: 24, createdAt: '2011-10-31', score: 0.03343},
                    {id: 3, name: "Susan", age: 16, createdAt: '2011-10-30', score: 0.03343},
                    {id: 4, name: "Chris", age: 55, createdAt: '2011-10-11', score: 0.03343},
                    {id: 5, name: "Dan", age: 40, createdAt: '2011-10-21', score: 0.03343},
                    {id: 6, name: "John", age: 20, createdAt: '2011-10-31', score: 0.03343},
                ],
            };
        }
    }
</script>

<style scoped>
.t-result-section2{
    position: absolute;
    height: 100%;
    right: 0;
    width: 60%;
}
.mid-title {
    font-weight: 700;
    font-size: 18px;
    margin-left: 1%;
}
.cost-estimation {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 96%;
    height: 40%;
    background-color: #f4f6f6;
}
.power-estimation {
    position: absolute;
    top: 50%;
    left: 2%;
    width: 96%;
    height: 45%;
    background-color: #f4f6f6;
}
</style>
