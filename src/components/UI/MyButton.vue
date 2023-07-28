<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button',
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  background-color: white;
  border: 1px solid lightblue;
  cursor: pointer;
  transition: border-color .3s;
}

button:hover {
  border-color: black;
}
</style>