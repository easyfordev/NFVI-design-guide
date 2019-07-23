<template>
    <div class="t-result-main">
        <t-result-section1></t-result-section1>
        <router-view></router-view>
<!--        <t-result-section2></t-result-section2>-->
    </div>
</template>

<script>
    import TResultSection1 from './TResultSection1'
    // import TResultSection2 from './TResultSection2'

    export default {
    name: "TResultMain",
    components: { TResultSection1 }
}
</script>

<style scoped>
.t-result-main {
    position: absolute;
    top: 5%;
    width:100%;
    height: 95%;
    /*background-color: black;*/
}
</style>
