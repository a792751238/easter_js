## webpack-bundle-analyzer

这个工具主要是在打包之后,将项目的所有依赖全部展示出来,主要用来进行项目优化的时候作为一个参考作用,vue-cli 自带.

build/webpack.prod.conf.js

```
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
```

然后在 config/index.js 中修改配置

```
{
    ......
    bundleAnalyzerReport: true // 最下面
}
```

react 是自搭的一套环境,所以需要额外引入.

```
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
        // new BundleAnalyzerPlugin(),
]
```

![01]()

这样 build 之后自己就会打开依赖分析了

[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)
