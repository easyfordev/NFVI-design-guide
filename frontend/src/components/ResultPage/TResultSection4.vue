<template>
    <div class="t-result-section4">
        <p class="mid-title" style="position: absolute; top: 0;width: 100%;height: 2%">네트워크 구축 가이드</p>
        <div class="contents">
            <div class="service-12" v-for="(title, index) in titles.slice(0,2)" >
                <div class="switch-numbers">
                    <p style="text-align: center">{{title}}</p>
                    <td v-for="n in 47" :key="n" v-if="displayNumber(n)">{{ n }}</td>
                </div>

                <div class="switch-items">
                    <draggable :list="items1">
                        <td
                                v-for="(element, index) in items1"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>

                    <draggable :list="items1">
                        <td
                                v-for="(element, index) in items1"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>
                </div>
            </div>
            <div class="mgmt-1">
                <div class="switch-numbers">
                    <p style="text-align: center">{{titles[2]}}</p>
                    <td v-for="n in 47" :key="n" v-if="displayNumber(n)">{{ n }}</td>
                </div>

                <div class="switch-items">
                    <draggable :list="items2[0]">
                        <td
                                v-for="(element, index) in items2[0]"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>

                    <draggable :list="items2[1]">
                        <td
                                v-for="(element, index) in items2[1]"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>
                    <!--<draggable :list="items[index]">-->
                        <!--<td-->
                                <!--v-for="(element, index) in items[index]"-->
                                <!--:key="element.key"-->
                                <!--:style="getItemStyle(element.type, element.giga)"-->
                        <!--&gt;-->
                            <!--{{ element.name }} {{showID(element.id)}}-->
                        <!--</td>-->
                    <!--</draggable>-->
                </div>
            </div>
            <div class="mgmt-2">
                <div class="switch-numbers">
                    <p style="text-align: center">{{titles[3]}}</p>
                    <td v-for="n in 47" :key="n" v-if="displayNumber(n)">{{ n }}</td>
                </div>

                <div class="switch-items">
                    <draggable :list="items3[0]">
                        <td
                                v-for="(element, index) in items3[0]"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>

                    <draggable :list="items3[1]">
                        <td
                                v-for="(element, index) in items3[1]"
                                :key="element.key"
                                :style="getItemStyle(element.type, element.giga)"
                        >
                            {{ element.name }} {{showID(element.id)}}
                        </td>
                    </draggable>
                    <!--<draggable :list="items[index]">-->
                    <!--<td-->
                    <!--v-for="(element, index) in items[index]"-->
                    <!--:key="element.key"-->
                    <!--:style="getItemStyle(element.type, element.giga)"-->
                    <!--&gt;-->
                    <!--{{ element.name }} {{showID(element.id)}}-->
                    <!--</td>-->
                    <!--</draggable>-->
                </div>
            </div>
            <div class="server-switch">
                <!--SFP-->
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 50px; background-color: yellow" > </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 100px; background-color: yellow"> </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 150px"> </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 200px"> </span>

                <!--UTP-->
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 300px; background-color: lightgray"> </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 350px; background-color: lightgray"> </span>

                <!--SFP-->
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 450px; background-color: yellow"> </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 150px; left: 500px; background-color: yellow"> </span>

                <!--UTP-->
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 110px; left: 70px; background-color: lightgray"> </span>
                <span class="port-item" style="position: absolute; z-index: 2; bottom: 110px; left: 120px; background-color: lightgray"> </span>
            </div>
            <br>
            <img src="../../assets/server-1U-back.png" width="900px" height="150px" style="position: absolute; left: 10px"/>
            <img src="../../assets/nic-guide.png" width="100px" style="position: absolute; right: 10px; bottom: 100px"/>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: "TResultSection4",
    components: { draggable },
    data: function() {
        return {
            enabled: true,
            workloadName: this.$store.state.app.workloadName,
            dragging: false,
            titles: [ "Service Switch #01","Service Switch #02","MGMT Switch #01","MGMT Switch #02" ],
            items1: [
                { name: "AMF" , type: "service", id: "01", giga: 10 },
                { name: "AMF", type: "service", id: "02", giga: 10 },
                { name: "AMF", type: "service", id: "03", giga: 10 },
                { name: "AMF", type: "service", id: "04", giga: 10 },
                { name: "AMF", type: "service", id: "05", giga: 10 },
                { name: "AMF", type: "service", id: "06", giga: 10 },
                { name: "AMF", type: "service", id: "07", giga: 10 },
                { name: "AMF", type: "service", id: "08", giga: 10 },
                { name: "AMF", type: "service", id: "09", giga: 10 },
                { name: "AMF", type: "service", id: "10", giga: 10 },
                { name: "AMF", type: "service", id: "11", giga: 10 },
                { name: "AMF", type: "service", id: "12", giga: 10 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
                { name: "", type: "blank", id: 0, giga: 0 },
            ],
            items2: [
                [
                    { name: "AMF", type: "mgmt", id: "01", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "03", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "05", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "07", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "09", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "11", giga: 10 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "AMF", type: "ILO", id: "01", giga: 0 },
                    { name: "AMF", type: "ILO", id: "03", giga: 0 },
                    { name: "AMF", type: "ILO", id: "05", giga: 0 },
                    { name: "AMF", type: "ILO", id: "07", giga: 0 },
                    { name: "AMF", type: "ILO", id: "09", giga: 0 },
                    { name: "AMF", type: "ILO", id: "11", giga: 0 },
                ],
                [
                    { name: "AMF", type: "mgmt", id: "02", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "04", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "06", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "08", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "10", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "12", giga: 25 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "AMF", type: "ILO", id: "04", giga: 0 },
                    { name: "AMF", type: "ILO", id: "02", giga: 0 },
                    { name: "AMF", type: "ILO", id: "06", giga: 0 },
                    { name: "AMF", type: "ILO", id: "08", giga: 0 },
                    { name: "AMF", type: "ILO", id: "10", giga: 0 },
                    { name: "AMF", type: "ILO", id: "12", giga: 0 },
                ]
            ],
            items3: [
                [
                    { name: "AMF", type: "mgmt", id: "01", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "03", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "05", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "07", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "09", giga: 10 },
                    { name: "AMF", type: "mgmt", id: "11", giga: 10 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                ],
                [
                    { name: "AMF", type: "mgmt", id: "02", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "04", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "06", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "08", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "10", giga: 25 },
                    { name: "AMF", type: "mgmt", id: "12", giga: 25 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                    { name: "", type: "blank", id: 0, giga: 0 },
                ]
            ],
        }
    },
    created: function(){
        // console.log(this.$store.state.app.workloadName);

    },
    methods: {
        displayNumber(num){
            if(num%2 === 1){
                return true;
            } else {
                return false;
            }
        },
        showID(id){
            if(id === 0){
                return "";
            } else {
                return "#" + String(id);
            }
        },
        getItemStyle(type, giga){
            if(type === "service"){
                if(giga === 10) {
                    return "background-color: yellow";
                } else if(giga === 25){
                    return "background-color: yellowgreen";
                }
            } else if(type === "mgmt"){
                return "background-color: lightgray";
            } else if(type === "blank"){
                return "background-color: white";
            } else if(type === "ILO"){
                return "background-color: red";
            }
        }
    }
}
</script>

<style scoped>
.t-result-section4{
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
.contents {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 96%;
    height: 95%;
    background-color: #f4f6f6;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.switch-numbers{
    margin-top: 1%;
}
.switch-numbers td {
    border: 1px solid rgba(0,0,0,.125);
    text-align: center;
    width: 45px;
    background-color: lightsalmon;
}
.switch-items{

}
.switch-items td{
    border: 1px solid rgba(0,0,0,.125);
    text-align: center;
    width: 45px;
    height: 45px;
    background-color: white;
    font-size: 14px;
    /*background-color: yellow;*/
}
.port-item{
    width: 45px;
    height: 35px;
    border: 1px solid black;
    background-color: white;
    font-size: 14px;
    text-align: center;
}
</style>
