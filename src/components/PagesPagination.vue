<template>
  <ul>
    <li
      v-for="page in pages"
      :key="page"
      :class="{ current: page === current }"
      @click="changePage(page)"
    >
      <button>
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 0,
    },
    current: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('change-page', pageNumber);
    },
  }
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

li {
  /* display: flex; */
  list-style-type: none;
}

li button {
  width: 30px;
  height: 30px;
  padding: 5px;
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
}

li.current button {
  border: 2px solid lightblue;
}
</style>
