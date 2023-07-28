export default {
  props: {
    toShow: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:toShow', false);
    },
  },
  mounted() {
    console.log('from mixin')
  },
  // ...
};
