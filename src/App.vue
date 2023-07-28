<template>
  <navigation-bar />
  <div class="app">
    <router-view> </router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar';

export default {
  components: {
    NavigationBar,
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
  color: currentColor;
}
</style>
