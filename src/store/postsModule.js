import axios from "axios";

export const postsModule = {
  state: () => ({
    posts: [],
    page: 1,
    limit: 10,
    totalPages: 0,
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
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    filteredAndSortedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
    setArePostsLoading(state, arePostsLoading) {
      state.arePostsLoading = arePostsLoading;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setArePostsLoading', true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          'setTotalPages',
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit('setPosts', response.data);
      } catch (error) {
        alert("Ошибка " + error.message);
      } finally {
        commit('setArePostsLoading', false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page + 1);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          'setTotalPages',
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit('setPosts', [...state.posts, ...response.data]);
      } catch (error) {
        alert("Ошибка " + error.message);
      }
    },
  },
  namespaced: true,
};
