// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production'].includes(process.env.VUE_APP_ENV);
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    },
    'vant'
  ]
];
// 去除 console.log
if (IS_PROD) {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins
};
