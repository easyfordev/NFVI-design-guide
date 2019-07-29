<template>
    <div class="t-result-section2">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">비용 계산기</p>
        <div class="cost-estimation">
            <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    max-height="340px"
                    :fixed-header="true"
                    :line-numbers="true"
                    :groupOptions="{ enabled: true }"
            >
                <div slot="table-actions-bottom">
                    <p style="text-align: right; padding-right: 20px; font-weight: bolder">총 29,860,000 원</p>
                </div>
                <template slot="table-header-row" slot-scope="props">
                    <span style="font-weight: bold; color: darkred;font-size: 13px">
                        {{ props.row.label }}
                    </span>
                </template>
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'price'">
                        <span style="font-weight: bold; color: darkred;font-size: 13px">{{props.row.price}}</span>
                    </span>
                    <span v-else style="font-weight: bold; color: black;font-size: 12px">
                        {{props.formattedRow[props.column.field]}}
                    </span>
                </template>
                <template slot="table-column" slot-scope="props">
                    <span v-if="props.column.label =='Name'" style="font-weight: bold; color: black;font-size: 12px">
                        {{props.column.label}}
                    </span>
                    <span v-else style="font-weight: bold; color: black;font-size: 12px">
                        {{props.column.label}}
                    </span>
                </template>
            </vue-good-table>
        </div>

        <p class="mid-title" style="position: absolute; top: 55%;width: 100%;height: 5%">전력 소모량 계산기</p>
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
                        label: '구분',
                        field: 'name',
                    },
                    {
                        label: '부품 상세 Spec.',
                        field: 'spec',
                    },
                    {
                        label: '단가',
                        field: 'perCost'
                    },
                    {
                        label: '수량',
                        field: 'count'
                    },
                    {
                        label: '가격',
                        field: 'price'
                    }
                ],
                rows: [
                    {
                        mode: "span", // span means this header will span all columns
                        label: "서버", // this is the label that'll be used for the header
                        html: false, // if this is true, label will be rendered as html
                        children: [
                            { name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
                            { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
                            { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
                            { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
                            { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
                            { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },

                        ]
                    }
                ]
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
    height: 50%;
    background-color: #f4f6f6;
}
.power-estimation {
    position: absolute;
    top: 60%;
    left: 2%;
    width: 96%;
    height: 45%;
    background-color: #f4f6f6;
}
</style>
