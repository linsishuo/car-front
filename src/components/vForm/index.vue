<template>
  <div class="v-form">
    <van-form ref="vForm" v-bind="$props" @submit="onSubmit">
      <template v-for="(opt, index) in filterOptions">
        <van-field v-bind="opt" :key="index" v-model="form[opt.name]" :rules="opt.rules || rules[opt.name]"></van-field>
      </template>

      <!-- 底部btn -->
      <div class="v-form-btn">
        <van-button v-if="!isDefaultBtn" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import { Form } from 'vant';

export default {
  name: 'VForm',
  props: {
    ...Form.props,
    scrollToError: {
      type: Boolean,
      default: true
    },
    showError: {
      type: Boolean,
      default: false
    },
    showErrorMessage: {
      type: Boolean,
      default: false
    },
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      form: {}
    };
  },
  computed: {
    // 过滤项
    filterOptions({ options }) {
      const list = options
        .map(item => {
          return {
            ...item,
            type: item.type || 'text',
            show: item.show || true
          };
        })
        .filter(item => item.show);

      return list;
    },
    // 底部默认按钮是否显示
    isDefaultBtn({ $slots }) {
      return !!$slots.footer;
    }
  },
  watch: {
    value: {
      handler(value) {
        this.form = value;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onSubmit(data) {
      this.$emit('submit', data);
    },
    getForm() {
      return this.$refs.vForm;
    }
  }
};
</script>

<style lang="scss">
.v-form {
  &-btn {
    margin-top: 1em;
    text-align: right;
  }
}
</style>
