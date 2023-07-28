<template>
  <div class="post">
    <p class="id">{{ post.id }}</p>
    <div>
      <div><strong>Название: </strong>{{ post.title }}</div>
      <div><strong>Описание: </strong>{{ post.body }}</div>
    </div>
    <div class="buttons-group">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('remove', post)">Удалить</my-button>
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
  gap: 5px;
  padding: 15px;
  margin-top: 10px;
  border: 2px solid lightblue;
}

.id {
  position: absolute;
  top: -10px;
  right: 20px;
  padding: 3px 5px;
  /* width: 20px; */
  /* height: 20px; */
  background-color: white;
  text-align: center;
}

.buttons-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>