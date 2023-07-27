<template>
  <div class="overlay" v-if="toShow" @click="hideDialog">
    <div @click.stop class="dialog">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    toShow: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:toShow', false);
    },
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 20px 30px;
  min-width: 300px;
  border-radius: 10px;
  background-color: white;
}
</style>