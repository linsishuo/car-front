<template>
  <div class="stock">111</div>
</template>

<script>
// import { demo } from '@/api'

import { useInitRulesByOptions, useValidateForm } from '@/hooks/vForm'
export default {
  name: 'Stock',
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
  padding: 10px;

  .demo-form {
    margin-top: 400px;
    margin-bottom: 400px;
  }
}
</style>
