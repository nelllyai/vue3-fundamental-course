<template>
  <div class="app">
    <h1>Страница постов</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..." />
    <div class="buttons-group">
      <MyButton @click="showDialog">Создать пост</MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyDialog v-model:toShow="dialogVisible">
      <PostForm @create="createPost" />
    </MyDialog>
    <PostsList
      v-if="!arePostsLoading"
      :posts="filteredAndSortedPosts"
      @remove="removePost"
    />
    <div v-else>Идет загрузка...</div>
    <PagesPagination
      :pages="totalPages"
      :current="page"
      @change-page="changePage"
    />
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
    changePage(page) {
      this.page = page;
    },
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
  watch: {
    page() {
      this.fetchPosts();
    },
  },
  // watch: {
  //   selectedSort(option) {
  //     this.posts.sort(
  //       (post1, post2) =>
  //         post1[option].localeCompare(post2[option])
  //     );
  //   },
  // },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
  color: currentColor;
}

.buttons-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
</style>
