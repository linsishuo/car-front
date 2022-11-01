const path = require('path')
const defaultSettings = require('./src/config')
const { defineConfig } = require('@vue/cli-service')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const resolve = dir => path.join(__dirname, dir)
// page title
const name = defaultSettings.title || ''
// 判断当前环境是否为生产环境
const IS_PROD = process.env.NODE_ENV === 'production'
// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: [
      'https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js',
      'https://cdn.jsdelivr.net/npm/proxy-polyfill@0.3.0/proxy.min.js'
    ]
  },
  // 生产环境
  build: {
    css: ['https://cdnjs.cloudflare.com/ajax/libs/vant/2.12.49/index.min.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/proxy-polyfill@0.3.0/proxy.min.js',
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/vant/2.12.49/vant.min.js'
    ]
  }
}

module.exports = defineConfig({
  // 署应用包时的基本 URL。 vue-router hash 模式使用
  publicPath: './',
  // 生存构建文件目录
  outputDir: 'dist',
  // 静态资源目录
  assetsDir: 'static',
  lintOnSave: !IS_PROD,
  // 是否压缩代码 true 将无法debug
  productionSourceMap: !IS_PROD,
  transpileDependencies: ['vuex', 'vue', 'vue-router', 'vant', 'axios'],
  //
  devServer: {
    open: false,
    // host: '0.0.0.0',
    host: 'localhost',
    https: false,
    // hotOnly: false,
    port: defaultSettings.port,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  },
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: `
        //   @import "assets/css/mixin.scss";
          @import "assets/css/variables.scss";
        //   $cdn: "${defaultSettings.$cdn}";
          `,
      }
    }
  },
  configureWebpack: config => {
    config.name = name

    // 当生存环境 修改配置
    if (IS_PROD) {
      //
      config.plugins.push(
        ...[
          new CompressionPlugin({
            // filename: "[path][base].gz", // 这种方式是默认的，多个文件压缩就有多个.gz文件，建议使用下方的写法
            filename: '[path][base].gz', //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
            algorithm: 'gzip', // 官方默认压缩算法也是gzip
            test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
            threshold: 10240, //以字节为单位压缩超过此大小的文件，使用默认值10240吧
            minRatio: 0.8, // 最小压缩比率，官方默认0.8
            //是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
            // 假如出现访问.gz文件访问不到的时候，还可以访问源文件双重保障
            deleteOriginalAssets: false
          })
        ]
      )
    }

    // return config
  },
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    // 别名配置
    config.resolve.alias.set('@', resolve('src')).set('assets', resolve('src/assets'))

    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // 去掉元素之间的空格
        options.compilerOptions.preserveWhitespace = true
        return options
      })

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })

    /**
     * 打包分析
     * */
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])

      config.set('externals', externals)
    }

    config.when(!IS_PROD, config => config.devtool('cheap-source-map'))

    config.when(IS_PROD, config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // 将 runtime 作为内联引入不单独存在
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
    })

    config.optimization.splitChunks({
      chunks: 'all',
      cacheGroups: {
        // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'),
          minChunks: 3, //  被至少用三次以上打包分离
          priority: 5, // 优先级
          reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
        },
        // eslint-disable-next-line camelcase
        node_vendors: {
          name: 'chunk-libs',
          chunks: 'initial', // 只打包初始时依赖的第三方
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        },
        vantUI: {
          name: 'chunk-vantUI', // 单独将 vantUI 拆包
          priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
          test: /[\\/]node_modules[\\/]_?vant(.*)/
        }
      }
    })

    config.optimization.runtimeChunk('single')
  }
})
