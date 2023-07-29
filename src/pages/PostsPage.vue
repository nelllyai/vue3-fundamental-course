<template>
  <div>
    <h1>Страница постов</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="buttons-group">
      <my-button>Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:toShow="dialogVisible">
      <post-form />
    </my-dialog>
    <PostsList
      v-if="!arePostsLoading"
      :posts="filteredAndSortedPosts"
    />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostsList from "@/components/PostsList";
import PagesPagination from "@/components/PagesPagination";
import { usePosts } from "@/hooks/usePosts";
import { useSortedPosts } from "@/hooks/useSortedPosts";
import { useFilteredAndSortedPosts } from "@/hooks/useFilteredAndSortedPosts";

export default {
  components: {
    PostForm,
    PostsList,
    PagesPagination,
  },
  data() {
    return {
      dialogVisible: false,
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
    };
  },
  setup(props) {
    const { posts, arePostsLoading, totalPages } = usePosts(10);
    const { selectedSort, sortedPosts } = useSortedPosts(posts);
    const { searchQuery, filteredAndSortedPosts } = useFilteredAndSortedPosts(sortedPosts);

    return {
      posts,
      arePostsLoading,
      totalPages,
      selectedSort,
      sortedPosts,
      searchQuery,
      filteredAndSortedPosts,
    };
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
