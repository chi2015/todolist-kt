<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  margin: 0 auto;
}
@media screen and (max-width: 320px) and (orientation: portrait) {  
  #app {
    max-width: 320px;
    min-height: 568px;
  }
}
@media screen and (min-width: 320px) and (orientation: landscape) {  
  #app {
    max-width: 480px;
  }
}
</style>
