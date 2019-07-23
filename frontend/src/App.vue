<template>
  <div id="app">
      <t-nfvi-header></t-nfvi-header>
      <router-view></router-view>
  </div>
</template>

<script>
import TNfviHeader from './components/Common/TNfviHeader'
// import TSection from './components/InputPage/TSection'

export default {
  name: 'app',
  components: { TNfviHeader }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding&display=swap');
/*#app {*/
    /*!*font-family: 'Nanum Gothic Coding', monospace;*!*/
/*}*/

</style>
