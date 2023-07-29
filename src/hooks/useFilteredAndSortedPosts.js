import { computed, ref } from "vue";

export function useFilteredAndSortedPosts(sortedPosts) {
  const searchQuery = ref("");

  const filteredAndSortedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return {
    searchQuery,
    filteredAndSortedPosts,
  };
}
