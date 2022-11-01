import { Toast } from 'vant'

/**
 * @description 生成默认描述
 * @param {label} Field字段文本
 */
const useGenerateDefaultMsg = label => {
  return `请输入${label}`
}

/**
 * @description 生成默认校验
 * @param {opt} Field配置
 * */
const useGenerateDefaultRule = opt => {
  return [
    {
      required: true,
      message: useGenerateDefaultMsg(opt.label)
    }
  ]
}

/**
 * @desciption 根据Options初始化Rules
 * @param {optionsKey} Form配置项
 * @param {rulesKey} Rule校验
 * */
export const useInitRulesByOptions = function (optionsKey, rulesKey) {
  const options = this[optionsKey]

  const rules = options.reduce((acc, item) => {
    if (item.defaultRules) {
      acc[item.name] = useGenerateDefaultRule(item)
    }

    return acc
  }, {})
  this[rulesKey] = rules
}

/**
 * @description 滚动至指定 name Field
 * @param {instance} Form表单实例
 * @param {name} Field滚动字段
 * @param {options} Scroll滚动配置
 * */
export const useScrollToField = async function (instance, name = '', options) {
  if (!instance?.length) return false

  instance.some(item => {
    if (item.name === name) {
      item.$el.scrollIntoView(options)
      return true
    }
    return false
  })
}

/**
 * @description 校验表单
 * @param {formKey} Form表单Ref
 * @param {options} Scroll滚动配置
 * */
export const useValidateForm = async function (formKey = 'form', options = { behavior: 'smooth' }) {
  const form = this.$refs[formKey].getForm()
  if (!form) return false
  try {
    const result = await form.validate()

    if (!result) {
      const formData = form.getValues()

      return formData
    } else {
      return false
    }
  } catch (err) {
    Toast(err[0].message)
    useScrollToField(form.fields, err[0].name, options)
    return false
  }
}
