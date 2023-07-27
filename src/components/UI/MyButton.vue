<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  background-color: white;
  border: 1px solid lightblue;
  cursor: pointer;
}
</style>