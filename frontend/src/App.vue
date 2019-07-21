<template>
  <div id="app">
      <t-nfvi-header></t-nfvi-header>
      <router-view></router-view>
      <!--<t-section></t-section>-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
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
</style>
