<template>
  <div class="post">
    <p class="id">{{ post.id }}</p>
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="buttons-group">
      <MyButton @click="$emit('remove', post)">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid lightblue;
}

.id {
  position: absolute;
  top: -10px;
  right: 20px;
  width: 20px;
  height: 20px;
  background-color: white;
  text-align: center;
}
</style>