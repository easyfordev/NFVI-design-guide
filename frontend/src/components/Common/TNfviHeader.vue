<template>
    <div class="t-nfvi-header">
        <img src="../../assets/skt5gx.png" style="position: absolute; width: 100px; height: 23px; margin-top: 10px; margin-left: 10px" @click="goToHome">
        <img src="../../assets/NFVIlogo.png" style="position: absolute; width: 110px; height: 30px; margin-top: 10px; margin-left: 110px">
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
</style>
