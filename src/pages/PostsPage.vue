<template>
  <div>
    <h1>Страница постов</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
    <div class="buttons-group">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    PostForm,
    PostsList,
    PagesPagination,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: "posts/setPage",
      setSelectedSort: "posts/setSelectedSort",
      setSearchQuery: "posts/setSearchQuery",
    }),
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
      loadMorePosts: "posts/loadMorePosts",
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      page: (state) => state.posts.page,
      limit: (state) => state.posts.limit,
      totalPages: (state) => state.posts.totalPages,
      arePostsLoading: (state) => state.posts.arePostsLoading,
      selectedSort: (state) => state.posts.selectedSort,
      sortOptions: (state) => state.posts.sortOptions,
      searchQuery: (state) => state.posts.searchQuery,
    }),
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      filteredAndSortedPosts: "posts/filteredAndSortedPosts",
    }),
  },
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
