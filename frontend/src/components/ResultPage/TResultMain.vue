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
    components: { TResultSection1 },
    created: function ( ) {
        // TODO : Please delete this code! just for test
        this.$store.commit('app/serviceSwitchCount', 2);
        this.$store.commit('app/serviceSwitchId', 'DCS-7050SX3-48YC12-F');

        this.$store.commit('app/mgmtSwitchCount', 2);
        this.$store.commit('app/mgmtSwitchId', 'DCS-7280TR-48C6-F');

        this.$store.commit('app/storageCount', 1);
        this.$store.commit('app/storageId', 'storage-1234');

        this.$store.commit('app/serverCount', 12);
        this.$store.commit('app/serverId', '867959-B21');

        this.$store.commit('app/cpuCount', 48);
        this.$store.commit('app/cpuId', '826878-B21');

        this.$store.commit('app/memoryCount', 144);
        this.$store.commit('app/memoryId', '815100-B21');

        this.$store.commit('app/diskCount', 24);
        this.$store.commit('app/diskId', '872479-B21');

    }
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
