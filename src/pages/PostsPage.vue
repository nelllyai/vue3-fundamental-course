<template>
  <div>
    <h1>Страница постов</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="buttons-group">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:toShow="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <PostsList
      v-if="!arePostsLoading"
      :posts="filteredAndSortedPosts"
      @remove="removePost"
    />
    <div v-else>Идет загрузка...</div>
    <div v-intersaction="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";
import PagesPagination from "@/components/PagesPagination";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostsList,
    PagesPagination,
  },
  data() {
    return {
      posts: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      dialogVisible: false,
      arePostsLoading: false,
      selectedSort: "",
      sortOptions: [
        {
          value: "title",
          name: "По названию",
        },
        {
          value: "body",
          name: "По описанию",
        },
      ],
      searchQuery: "",
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(
        (currentPost) => currentPost.id !== post.id
      );
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.arePostsLoading = true;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (error) {
        alert("Ошибка " + error.message);
      } finally {
        this.arePostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts.push(...response.data);
      } catch (error) {
        alert("Ошибка " + error.message);
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    filteredAndSortedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {},
};
</script>

<style>
.buttons-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>
