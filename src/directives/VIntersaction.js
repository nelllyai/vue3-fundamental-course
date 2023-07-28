export default {
  name: 'intersaction',
  mounted(el, binding) {
    const options = {
      rootMargin: "10px",
      threshold: 1.0,
    };

    const callback = (entries) => {
      // if (entries[0].isIntersecting && this.page < this.totalPages) {
        binding.value();
      // }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
};
