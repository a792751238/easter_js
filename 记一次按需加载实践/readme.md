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
![01](https://github.com/easterCat/common_js/blob/master/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%AE%9E%E8%B7%B5/img/01.png?raw=true)
![02](https://github.com/easterCat/common_js/blob/master/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%AE%9E%E8%B7%B5/img/02.png?raw=true)

## 实践

最近将一个之前照着 underscore 实现的一个函数库进行了 es6 改造，但是在使用中发现并没有实现按需加载。于是就开始了一系列的按需加载的实践与改造，最终使用的方法是 babel 插件的方式实现的。

#### 进行单独文件分离

最初的实现是使用umd的方式进行模块化兼容，所有的大类方法比如array全部写到了array文件夹下的index.js里面，现在将单独的方法放到单独的文件里面。

![03](https://github.com/easterCat/common_js/blob/master/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%AE%9E%E8%B7%B5/img/03.png?raw=true)
![04](https://github.com/easterCat/common_js/blob/master/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%AE%9E%E8%B7%B5/img/04.png?raw=true)

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

![05](https://github.com/easterCat/common_js/blob/master/%E8%AE%B0%E4%B8%80%E6%AC%A1%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD%E5%AE%9E%E8%B7%B5/img/05.png?raw=true)

看到分析发现当前引入的内容仅有flatten和该函数所依赖的object方法，剩下的都没有引入。基本成功，剩下的就是继续拆分和优化了。

## npm更新版本

函数库做完了，可以下载引入使用，可以直接安装github上的包。这是是发布到npm上进行管理的安装。

#### npm login

进行npm的登录，没有账号的官网注册。必须登录

#### npm publish

将当前库文件进行发布，可以创建一个.npmignore将不想发布的文件或文件夹过滤掉

#### npm version <update_type>

- 直接使用npm version是查看当前包和当前所有依赖包的版本
- 查看单独的包用npm view kiana-js versions,这样就是查看当前发布包的版本。
- 参数<update_type>有三个参数
    - patch补丁，例如version 1.0.0 => version 1.0.1
    - minor修改，例如version 1.0.0 => version 1.1.0
    - major大版本，例如version 1.0.0 => version 2.0.0

#### 流程

npm login => npm publish(如果没发布过) => npm version xxx => npm publish => npm view xxx versions(可以不看)

## Docs

[babel 修改抽象语法树——入门与实践](https://www.jianshu.com/p/3c495dcbed49)
[写一个 babel 插件实现按需打包的功能](https://www.jianshu.com/p/b2e0b90b507d)
[babel-core](https://babeljs.io/docs/en/babel-core)
[babel-types](https://github.com/jamiebuilds/babel-types)
[按需加载实践](https://github.com/MuYunyun/diana/issues/5)
[babel-plugin-on-demand-loading](https://github.com/demos-platform/babel-plugin-on-demand-loading/blob/master/lib/index.js)
[如何更新自己写的npm包（模块](https://blog.csdn.net/cvper/article/details/79051048)

