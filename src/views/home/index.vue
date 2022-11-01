<template>
  <div class="home">
    <div class="picture"></div>
    <searchForm class="form"></searchForm>
  </div>
</template>

<script>
// import { demo } from '@/api'
import searchForm from '@/components/searchForm.vue'
import { createFormOptions } from './crud/options'
import { useInitRulesByOptions, useValidateForm } from '@/hooks/vForm'
export default {
  name: 'Home',
  components: {
    searchForm
  },
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
  mounted() {
    useInitRulesByOptions.call(this, 'options', 'rules')
  },
  methods: {
    async onSubmit() {
      const formData = await useValidateForm.call(this, 'form')
      console.log(formData, 'formData')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
  .picture {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 270px;
    z-index: 0;
    background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng56f7929ab0bbefe5c73edb74307fddc9557c15c17d44a5e1d9ba9d4d2c515f16)
      100% no-repeat;
    background-size: 100% 100%;
  }
  .form {
    margin-top: 50%;
  }
}
</style>

