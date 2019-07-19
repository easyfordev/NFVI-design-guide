<template>
    <div class="t-section">
        <basic-info></basic-info>
    </div>
</template>

<script>
import BasicInfo from "./TSectionBasicInfo"
export default {
    name: "TSection",
    components: { BasicInfo }
}
</script>

<style scoped>
.t-section {
    position: absolute;
    top: 5%;
    width:80%;
    height: 100%;
    left: 10%;
    /*background-color: black;*/
    border: 1px solid black;
}
</style>