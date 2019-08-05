<template>
    <div class="t-result-section2">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">비용 계산기</p>
        <div class="cost-estimation">
            <vue-good-table
                    :columns="columns"
                    :rows="rows"
                    max-height="900px"
                    :fixed-header="true"
                    :line-numbers="true"
                    :groupOptions="{ enabled: true }"
            >
                <div slot="table-actions-bottom">
                    <p style="text-align: right; padding-right: 20px; font-weight: bolder">총 {{ commafy(totalSum) }} 원</p>
                </div>
                <template slot="table-header-row" slot-scope="props">
                    <span style="font-weight: bold; color: darkred;font-size: 13px">
                        {{ props.row.label }}
                    </span>
                </template>
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'price'">
                        <span style="font-weight: bold; color: darkred;font-size: 13px">{{commafy(props.row.price)}}</span>
                    </span>
                    <span v-else-if="props.column.field == 'perCost'">
                        <span style="font-weight: bold; color: black;font-size: 12px">{{commafy(props.row.perCost)}}</span>
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

        <!--<p class="mid-title" style="position: absolute; top: 55%;width: 100%;height: 5%">전력 소모량 계산기</p>-->
        <!--<div class="power-estimation">-->
        <!--</div>-->
    </div>
</template>

<script>
import { VueGoodTable } from 'vue-good-table'

export default {
    name: "TResultSection2",
    components: { VueGoodTable },
    created: function() {
        // TODO : Please delete this code! just for test
        // this.$store.commit('app/serviceSwitchCount', 2);
        // this.$store.commit('app/serviceSwitchId', 'DCS-7050SX3-48YC12-F');
        //
        // this.$store.commit('app/mgmtSwitchCount', 2);
        // this.$store.commit('app/mgmtSwitchId', 'DCS-7280TR-48C6-F');
        //
        // this.$store.commit('app/storageCount', 1);
        // this.$store.commi\t('app/storageId', 'storage-1234');
        //
        // this.$store.commit('app/serverCount', 2);
        // this.$store.commit('app/serverId', '867959-B21');
        //
        // this.$store.commit('app/cpuCount', 4);
        // this.$store.commit('app/cpuId', '826878-B21');
        //
        // this.$store.commit('app/memoryCount', 24);
        // this.$store.commit('app/memoryId', '815100-B21');

        this.getServerRows();
    },
    methods: {
        getServerRows() {
            let json = this.$store.state.app;
            console.log(json);
            this.$http.post('http://localhost:3000/v1/calculate', json)
                .then(response => {
                    let json = response.data.rows;
                    this.rows.push(json);
                    this.totalSum = response.data.sum;
                });
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
    },
    data() {
        return {
            columns: [
                { label: '구분', field: 'name',},
                { label: '부품 상세 Spec.', field: 'spec'},
                { label: '단가', field: 'perCost'},
                { label: '수량', field: 'count' },
                { label: '가격', field: 'price'}
            ],
            rows: [
                // {
                //     mode: "span", // span means this header will span all columns
                //     label: "서버", // this is the label that'll be used for the header
                //     children: [
                //         { name: "Server", spec: "HPE DL360 Gen10", count: 2, perCost: "1,292,000원", price: "2,584,000원" },
                //         { name: "CPU", spec: "HPE DL360 Gen10 Xeon-G 6140", count: 4, perCost: "2,428,000원", price: "9,712,000원" },
                //         { name: "Memory", spec: "HPE 32G 2Rx4 PC4-2666V-R Smart Kit", count: 24, perCost: "414,000원", price: "9,936,000원" },
                //         { name: "DISK", spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", count: 12, perCost: "417,000원", price: "5,004,000원" },
                //         { name: "NIC", spec: "HPE Eth 10Gb 2p 562FLR-T Adptr", count: 2, perCost: "313,000원", price: "626,000원" },
                //         { name: "NIC", spec: "HPE Eth 10Gb 2p 562T Adptr", count: 6, perCost: "333,000원", price: "1,998,000원" },
                //     ]
                // }
            ],
            totalSum: 0
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
    height: 90%;
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
