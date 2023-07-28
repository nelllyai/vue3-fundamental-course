<template>
  <nav>
    <p class="title" @click="$router.push('/')">Vue3.js</p>
    <div class="buttons-group">
      <my-button @click="$router.push('/posts')">Список постов</my-button>
      <my-button @click="$router.push('/about')">О странице</my-button>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style scoped>
  nav {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    box-shadow: 0 5px 10px lightblue;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    color: lightblue;
    transition: color .125s;
  }

  .title:hover {
    color: black;
    cursor: pointer;
  }

  .buttons-group {
    display: flex;
    margin-left: auto;
    gap: 10px;
  }
</style>
