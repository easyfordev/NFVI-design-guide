<template>
    <div class="t-result-section3">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">전력량 계산기</p>
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
                    <p style="text-align: right; padding-right: 20px; font-weight: bolder">서버 1대 당 {{commafy(totalSum)}}W X {{serverCount}}대 = <span style="color: darkred">총 {{ (totalSum*serverCount).toFixed(3)}} W</span></p>
                </div>
                <template slot="table-header-row" slot-scope="props">
                    <span style="font-weight: bold; color: darkred;font-size: 13px">
                        {{ props.row.label }}
                    </span>
                </template>
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'power'">
                        <span style="font-weight: bold; color: black;font-size: 13px">{{commafy(props.row.power)}}W</span>
                    </span>
                    <span v-else-if="props.column.field == 'totalPower'">
                        <span style="font-weight: bold; color: darkred;font-size: 12px">{{commafy((props.row.totalPower).toFixed(3))}}W</span>
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
        name: "TResultSection3",
        components: { VueGoodTable },
        created: function() {
            this.getServerRows();
        },
        methods: {
            getServerRows() {
                let json = this.$store.state.app;
                console.log(json);
                this.$http.post('http://localhost:3000/v1/power', json)
                    .then(response => {
                        let json = response.data.rows;
                        this.rows.push(json);
                        this.totalSum = response.data.totalSum;
                        this.serverCount = this.$store.state.app.serverCount;
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
                    { label: '파트 번호', field: 'partnum'},
                    { label: '부품 상세 Spec.', field: 'spec'},
                    { label: '전력량', field: 'power'},
                    { label: '수량', field: 'count' },
                    { label: '총 전력량', field: 'totalPower'}
                ],
                rows: [
                    // {
                    //     mode: "span", // span means this header will span all columns
                    //     label: "서버", // this is the label that'll be used for the header
                    //     children: [
                    //         { name: "Server", partnum: "867959-B21",spec: "HPE DL360 Gen10", power: 31.68, count: 1, totalPower: 31.68 },
                    //         { name: "CPU", partnum: "826878-B21",spec: "6140 Xeon Gold Kit", power: 157.61, count: 2, totalPower: 315.22 },
                    //         { name: "Memory", partnum: "815100-B21",spec: "HPE 32GB 2Rx4 PC4-2666V-R Smart Kit", power: 4.98, count: 12, totalPower: 59.76 },
                    //         { name: "DISK", partnum: "872479-B21",spec: "HPE 1.2TB SAS 10K SFF SC DS HDD", power: 7.48, count: 12, totalPower: 88.8 },
                    //     ]
                    // }
                ],
                totalSum: 0,
                serverCount: 0
            };
        }
    }
</script>

<style scoped>
    /*.t-result-section3{*/
        /*position: absolute;*/
        /*height: 100%;*/
        /*right: 0;*/
        /*width: 60%;*/
    /*}*/
    .t-result-section3{
        position: absolute;
        top: 40%;
        height: 100%;
        left: 0;
        width: 100%;
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
        /*background-color: #f4f6f6;*/
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
