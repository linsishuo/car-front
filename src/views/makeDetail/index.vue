<template>
  <div class="stock">111</div>
</template>

<script>
export default {
  name: 'MakeDetail',
  data() {
    return {
      form: {
        name: '',
        tel: ''
      },
      options: createFormOptions.call(this),
      rules: {}
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.home {
  padding: 10px;

  .demo-form {
    margin-top: 400px;
    margin-bottom: 400px;
  }
}
</style>
