export const createFormOptions = function () {
  return [
    {
      name: 'name',
      label: '用户名',
      defaultRules: true
    },
    {
      name: 'tel',
      label: '电话号码',
      type: 'tel',
      defaultRules: true
    },
    {
      name: 'digit',
      label: 'Digit',
      type: 'digit',
      defaultRules: true
    },
    {
      name: 'number',
      label: '数字',
      type: 'number',
      defaultRules: true
    },
    {
      name: 'password',
      label: '密码',
      type: 'password',
      defaultRules: true
    }
  ]
}
