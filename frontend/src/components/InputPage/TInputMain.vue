<template>
    <div class="t-input-main">
        <t-input-section1></t-input-section1>
        <t-input-section2></t-input-section2>
        <button id="clear-btn" @click="sendToServer"><span>Clear</span></button>
        <button id="done-btn" @click="isClicked"><span>Done</span></button>
    </div>
</template>

<script>
import TInputSection1 from "./TInputSection1"
import TInputSection2 from "./TInputSection2"

export default {
    name: "TInputMain",
    components: { TInputSection1, TInputSection2 },
    created: function() {
    },
    methods: {
        isClicked(){
            this.$router.push({name: 'TResultMain'})
        },
        sendToServer(){
            // console.log(this.$store.state.app.serverId);
            // console.log(this.$store.state.app.serverCount);

            let json = {
                "serverId" : this.$store.state.app.serverId,
                "serverCount" : this.$store.state.app.serverCount,
                "cpuId": this.$store.state.app.cpuId,
                "cpuCount" : this.$store.state.app.cpuCount,
                "memoryId": this.$store.state.app.memoryId,
                "memoryCount" : this.$store.state.app.memoryCount,
            };
            this.$http.post('http://localhost:3000/v1/calculate',json)
                .then(response => {
                    response.data
                });
        }
    }
}
</script>

<style scoped>
.t-input-main {
    position: absolute;
    top: 5%;
    width:80%;
    height: 95%;
    left: 10%;
    /*background-color: black;*/
    /*border: 1px solid black;*/
}
#clear-btn {
    position:absolute;
    bottom: 2%;
    left: 35%;
    width: 178px;
    height: 43px;
    border-radius: 20px;
    box-shadow: 0 2px 4px 0 #c6d5e9;
    background-color: #bcbcbc;
}

#clear-btn span {
    width: 49.5px;
    height: 17px;
    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
}
#done-btn {
    position:absolute;
    bottom: 2%;
    left: 55%;
    width: 178px;
    height: 43px;
    border-radius: 20px;
    box-shadow: 0 2px 4px 0 #c6d5e9;
    background-color: #FF7A00;
}
#done-btn span {
    width: 49.5px;
    height: 17px;
    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
}
button a {
    text-decoration: none;
}
</style>
