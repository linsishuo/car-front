<template>
  <div class="search">
    <van-cell is-link style="display: flex; justify-content: center; align-items: center" @click="showBrandPicker">
      <template #title>
        <span class="custom-title">品牌</span>
        <van-tag type="danger" round>必填</van-tag>
      </template>
      <template #label>
        <span>{{ form.brand }}</span>
      </template>
    </van-cell>
    <van-cell is-link style="display: flex; justify-content: center; align-items: center" @click="showBrandPicker">
      <template #title>
        <span class="custom-title">车型</span>
        <van-tag type="danger" round>必填</van-tag>
      </template>
      <template #label>
        <span>{{ form.brand }}</span>
      </template>
    </van-cell>
    <van-button type="primary" size="large" class="search-btn" @click="handleSearch">查询</van-button>
    <van-popup v-model="showBrand" round closeable position="bottom" :style="{ height: '400px' }">
      <van-picker title="选择品牌" :columns="columns" style="height: 250px; margin: 50px 0 25px 0" @change="onChange" />
      <van-button type="primary" size="large" class="search-btn" @click="brandSubmit">确定</van-button>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      form: {
        brand: '请选择'
      },
      pickerData: {
        brand: ''
      },
      showBrand: false,
      columns: ['飞凡汽车', '自己骑车', '荣威', '名爵']
    }
  },
  mounted() {},
  methods: {
    showBrandPicker() {
      this.showBrand = true
      this.pickerData.brand = this.columns[0]
    },
    brandSubmit() {
      this.form.brand = this.pickerData.brand
      this.showBrand = false
    },
    onChange(picker, value) {
      console.log('value', value)
      this.pickerData.brand = value
    },
    async handleSearch() {
      if (this.form.brand == '请选择') {
        this.$toast({
          message: '请输入品牌',
          position: 'bottom'
        })
        return
      }
      this.$router.push('makeDetail')
    }
  }
}
</script>

<style lang="scss">
.search {
  width: 90%;
  background-color: #fff;
  .custom-title {
    margin-right: 4px;
    font-size: 16px;
    color: rgb(153, 153, 153);
    vertical-align: middle;
  }
  .search-btn {
    width: 90%;
    height: 40px;
    margin: 10px 5%;
    border-radius: 8px;
    background-color: #6bc9be;
    border-color: #6bc9be;
  }
}
</style>
