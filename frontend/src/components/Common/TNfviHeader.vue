<template>
    <div class="t-nfvi-header">
        <img src="../../assets/skt5gx.png" style="position: absolute; width: 100px; height: 23px; margin-top: 10px; margin-left: 10px" @click="goToHome">
        <img src="../../assets/NFVIlogo.png" style="position: absolute; width: 110px; height: 30px; margin-top: 10px; margin-left: 110px">

        <div id="menu-last" @click="goToAdmin">
            <img src="../../assets/admin-normal.png" style="width: 95%; height: 75%; position: absolute; top: 20%">
        </div>
    </div>
</template>

<script>
export default {
    name: "TNfviHeader",
    methods: {
        goToHome() {
            this.$router.push({
                path: '/'
            })
        },
        goToAdmin() {
            this.$router.push({
                path: '/admin'
            })
        }
    }
}
</script>

<style scoped>
.t-nfvi-header {
    position: absolute;
    top:0;
    width: 100%;
    height: 5%;
    left: 0;
    background-color: #f4f6f6;
    border-bottom: 2px solid #EA002C;
}
#menu-last {
    position: absolute;
    right: 0;
    width: 7%;
    height: 100%;
    /*background-color: lightcoral;*/
}
.menu-item {
    position: absolute;
    top: 30%;
    font-size: 15px;
    font-weight: 700;
}
</style>
