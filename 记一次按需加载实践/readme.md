## 按需加载

在使用 lodash 的时候我们可以使用这样的代码

```
//一
import {omit} from "lodash";
//二
import l from "lodash";
l.omit();
//三
import omit from "lodash/omit";
```

以上三种情况都可以使用 lodash，但是区别在于打包之后对框架的引入程度的不同，第一种方法和第二种方法都是将整个库全部都引入，打包之后是 500 多 k 的引入大小，而第三种方法只是将当前函数及其依赖函数给引入，打包文件大小仅有 6k。可以看出按需加载在打包大小和打包速度上有极大的优势。

## 查看打包大小

使用 webpack 的插件 webpack-bundle-analyzer,可以通过 webpack 设置 node 环境来进行开发和生产环境下的区分

```
npm install webpack-bundle-analyzer --save-dev

//在webpack.config.js中引入
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
    。。。
    new BundleAnalyzerPlugin(),
    。。。
]
```

这样在打包 npm start 或者 npm run build 之后就可以进行打包文件大小的查看了
![01]()
![02]()

## 实践

最近将一个之前照着 underscore 实现的一个函数库进行了 es6 改造，但是在使用中发现并没有实现按需加载。于是就开始了一系列的按需加载的实践与改造，最终使用的方法是 babel 插件的方式实现的。

#### 进行单独文件分离

最初的实现是使用umd的方式进行模块化兼容，所有的大类方法比如array全部写到了array文件夹下的index.js里面，现在将单独的方法放到单独的文件里面。

![03]()
![04]()

#### 新建babel插件

在node_modules中新建babel-plugin-kiana-demand-loading文件夹,再添加一个index.js文件，写入内容

```
const babel = require('babel-core');
const types = require('babel-types');

const array_types = ["flatten"];

module.exports = function (babel) {
    return {
        visitor: {
            ImportDeclaration(path, ref = {opts: {}}) {
                let node = path.node;
                let {specifiers} = node;
                if (ref.opts.library === node.source.value
                    && !types.isImportDefaultSpecifier(specifiers[0])
                    && !types.isImportNamespaceSpecifier(specifiers[0])) {
                    let newImports = specifiers.map(specifier => {
                        if (array_types.includes(`${specifier.local.name}`)) {
                            //node.source.value => kiana-js
                            //specifier.local.name => flatten
                            //path => kiana-js/arrays/flatten
                            return types.importDeclaration([types.importSpecifier(specifier.local, specifier.local)], types.stringLiteral(`${node.source.value}/kiana/arrays/${specifier.local.name}`))
                        }
                        return types.importDeclaration([types.importDefaultSpecifier(specifier.local)], types.stringLiteral(`${node.source.value}/kiana/${specifier.local.name}`))
                    });
                    path.replaceWithMultiple(newImports)
                }
            }
        }
    }
};
```

然后执行npm run build后可以根据出现的分析发现，仅仅就引入了一个函数的大小

![05]()

看到分析发现当前引入的内容仅有flatten和该函数所依赖的object方法，剩下的都没有引入。基本成功，剩下的就是继续拆分和优化了。

## Docs

[babel 修改抽象语法树——入门与实践](https://www.jianshu.com/p/3c495dcbed49)
[写一个 babel 插件实现按需打包的功能](https://www.jianshu.com/p/b2e0b90b507d)
[babel-core](https://babeljs.io/docs/en/babel-core)
[babel-types](https://github.com/jamiebuilds/babel-types)
[按需加载实践](https://github.com/MuYunyun/diana/issues/5)
[babel-plugin-on-demand-loading](https://github.com/demos-platform/babel-plugin-on-demand-loading/blob/master/lib/index.js)

