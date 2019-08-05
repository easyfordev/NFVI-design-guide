<template>
    <div class="t-result-section1">
        <p id="big-title" @click="goToHome">시스템 가상화 인프라 디자인</p>
        <p class="mid-title">{{ pageTitle }} {{ draggingInfo }}</p>

        <div class="rack-item-images">

        </div>
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
                <tr v-for="item in items" :key="item.id">
                    <td style=""><img border="0" width="150px" :src="getImgSrc(item.type, item.ru)" :height="getImgHeight(item.ru)"/></td>
                    <td :height="getItemHeight(item.ru)" :style="getItemStyle(item.type)" rowspan="2">
                        {{ item.name }} {{item.number}}
                    </td>
                </tr>

                <!--{{ element.name }}-->
            </draggable>
        </div>
        <img class="rack-chassis" src="../../assets/rack.png"/>
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
            myStyle: 'position: absolute; top: 12%; height: 700px; border: 10px solid transparent',
            enabled: true,
            items: [],
            dragging: false
        }
    },
    created: function() {
        this.pageTitle = 'Rack 구성도';
        // TODO : 스위치, 스토리지 갯수, 타입 입력 받기
        this.$store.commit('app/serviceSwitchCount', 2);
        this.$store.commit('app/serviceSwitchId', 'DCS-7050SX3-48YC12-F');

        this.$store.commit('app/mgmtSwitchCount', 2);
        this.$store.commit('app/mgmtSwitchId', 'DCS-7280TR-48C6-F');

        this.$store.commit('app/storageCount', 1);
        this.$store.commit('app/storageId', 'storage-1234');
        this.getItemList();
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
            console.log(json);
            this.$http.post('http://localhost:3000/v1/rack', json)
                .then(response => {
                    console.log(response.data.items);
                    this.items = response.data.items;

                });
        },
        onMouseEnter() {
            // alert("HI")
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid lightcoral';
        },
        onMouseLeave() {
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid transparent';
        },
        onRackClicked() {
            this.myStyle = 'position: absolute; top: 12%; height: 700px; border: 10px solid lightcoral';
            this.$router.push({
                name: 'TResultSection2'
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
.rack-item-images{
    background-color: lightpink;
}
.rack-chassis{
    margin-left: 92px;
    height: 925px;
    width: 180px;
}
</style>
