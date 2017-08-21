<template>
  <div id="app">
      <h1>my blog</h1>
      <headBar class="headbar"></headBar>
      <hsplit></hsplit>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
import headBar from './components/headBar/headBar.vue';
import hsplit from './components/split/hsplit.vue';

export default {
    components: {
        headBar,
        hsplit
    }
};
</script>

<style>
#app {
    position: relative;
    min-width: 1000px;
    background: linear-gradient(-45deg, #66cdcc 0%, #336799 100%);
}
#app>h1 {
    color: #fff;
    font-size: 54px;
    font-weight: 700;
    padding: 50px 0 10px 160px;
}
#app .headbar {
    position: absolute;
    right: 40px;
    top: 70px;
}
#app>hsplit {
    width: 100%;
}
</style>
