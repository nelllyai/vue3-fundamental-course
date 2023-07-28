<template>
  <input type="text" :modelValue="modelValue" @input="updateInput">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid lightblue;
  margin-top: 10px;
}

input:focus {
  outline: none;
  box-shadow: 0 0 3px lightblue;
}
</style>