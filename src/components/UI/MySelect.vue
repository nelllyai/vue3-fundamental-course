<template>
  <select :value="modelValue" @change="changeOption">
    <option value="" disabled>Выберите из списка...</option>
    <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    },
  }
}
</script>

<style scoped>
select {
  padding: 10px 15px;
  border: 1px solid lightblue;
}
</style>