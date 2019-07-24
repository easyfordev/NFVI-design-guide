<template>
    <div class="t-result-section1">
        <p id="big-title" @click="goToHome">시스템 가상화 인프라 디자인</p>
        <p class="mid-title">{{ pageTitle }}</p>
        <div style="padding-left: 3%" >
            <img src="../../assets/rack1.png" :style="myStyle" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @click="onRackClicked">
            <img src="../../assets/rack2.png" style="height: 755px; width: 200px; position: absolute; top:13%; left: 28%; border: 10px solid transparent">
<!--            <img src="../../assets/rack1.png" style="position: absolute; top: 12%; left: 50%;border: 10px solid transparent">-->
<!--            <img src="../../assets/rack2.png" style="height: 755px; width: 200px; position: absolute; top:13%; left: 73%;border: 10px solid transparent">-->
        </div>

    </div>
</template>

<script>
export default {
    name: "TResultSection1",
    data: function() {
        return {
            pageTitle: '',
            myStyle: 'position: absolute; top: 12%;border: 10px solid transparent'
        }
    },
    created: function() {
        this.pageTitle = 'Rack 구성도'
    },
    methods: {
        onMouseEnter() {
            // alert("HI")
            this.myStyle = 'position: absolute; top: 12%; border: 10px solid lightcoral';
        },
        onMouseLeave() {
            this.myStyle = 'position: absolute; top: 12%; border: 10px solid transparent';
        },
        onRackClicked() {
            this.myStyle = 'position: absolute; top: 12%; border: 10px solid lightcoral';
            this.$router.push({
                name: 'TResultSection2'
            })
        },
        goToHome() {
            this.$router.push({
                name: 'TResultMain'
            })
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
    font-size: 20px;
    margin-left: 1%;
}
.mid-title {
    font-weight: 700;
    font-size: 18px;
    margin-left: 1%;
}
</style>
