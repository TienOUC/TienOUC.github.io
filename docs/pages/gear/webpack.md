---
autoGroup-5: Bundle
title: Webpack4.0
sidebarDepth: 2
date: 2019-08-18
categories:
- FrontEnd
tags:
- Tools
- Webpack
---


> - [ Webpack3.0 用法👉 ](https://study.163.com/courses-search?keyword=Webpack打包工具用法)

## 1. webpack 打包原理

- webpack 是一个打包模块的机制，只是把依赖的模块转化成可以代表这些包的静态文件。

- webpack 中每一个模块中有一个唯一的 ID，从 0 开始递增。

- 整个打包后的 bundle.js 是一个匿名函数自执行，参数为一个数组，数组的每一项都为 function，function 的内容则为每个模块的内容，并按照 require 的顺序排列。

> 实现过程：
>
> 1. 读取文件，分析模块依赖
> 2. 对模块进行解析执行（深度遍历）
> 3. 针对不同的模块使用相应的 loader
> 4. 编译模块，生成抽象语法树 AST
> 5. 遍历循环 AST 树，拼接输出 JS

## 2. webpack 为什么能把任何形式的资源都视作模块呢？

> 因为 loader 机制，不同的资源采用不同的 loader 进行转换，webpack 按照从右到左的顺序执行 loader。
> loader 本质是一个函数，输入参数是一个字符串，输出参数也是一个字符串（即 JS 代码），从而被 esprima 解析成 AST，触发进一步的依赖解析。

## 3. 全局安装 webpack

`npm install webpack webpack-cli -g`
全局安装 webpack 会有个问题，就是当你有两个项目依赖于不同版本的 webpack，就会有一个项目打包不了，所以还是不全局安装 webpack 比较好。

## 4. 在当前项目安装 webpack

1. 新建 webpack-demo 目录，然后进行 npm 项目初始化  
   `npm init 或者 npm init -y`

2. 在刚创建出来的 package.json 中添加 private 字段  
   `"private": true /**表示私有的**/`

3. 如果 webpack 已经全局安装，需要卸载  
   `npm uninstall webpack webpack-cli -g /**卸载全局安装的webpack**/`

4. 在项目根目录下执行安装命令  
   `npm install webpack webpack-cli --save-dev`

5. 使用 npx 打印出当前的 webpack 版本  
   `npx webpack -v`

## 5. 安装指定版本的 webpack

```
npm info webpack /*查看webpack所有版本信息*/
npm install webpace@4.29.6 --save-dev
```

## 6. webpack 的配置文件

在项目根目录新建文件 webpack.config.js

```js
const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## 7. webpack 手动打包命令

`npx webpack /**默认会使用根目录下的webpack.config.js配置文件进行打包**/ npx webpack --config webpack.config.js /**指定配置文件打包**/`

## 8. 使用 npm scripts 简化 webpack 命令

1. 在 package.json 中的 scripts 字段下添加 bundle 字段

`"bundle": "webpack"`

2. 使用 npm 命令打包

`npm run bundle`

## 9. 使用 file-loader 打包图片

1. 安装 file-loader

`npm install file-loader --save-dev`

2. 在配置文件 webpack.config.js 中添加字段

```js
module: {
  rules: [
    {
      test: /\.(jpg|png|svg|gif)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]" /**原名字输出**/,
          outputPath: "images/" /**打包后存放图片的文件夹**/,
        },
      },
    },
  ];
}
```

## 10. 使用 url-loader 打包图片

1. 安装 url-loader
   `npm install url-loader --save-dev`

2. 在配置文件 webpack.config.js 中添加字段

```js
module: {
  rules: [
    {
      test: /\.(jpg|png|svg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/",
          limit: 204800 /**小于20kb的图片，打包成base64放到bundle.js文件**/,
        },
      },
    },
  ];
}
```

## 11. 使用 style-loader 和 css-loader 打包 css 文件

1. 安装 style-loader 和 css-loader
   `npm install style-loader css-loader --save-dev`

2. 在 webpack.config.js 文件中添加配置

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ];
}
```

## 12. 使用 sass-loader 打包.sass 文件

1. 安装 sass-loader 和 node-sass
   `npm install sass-loader node-sass --save-dev`

2. 在 webpack.config.js 文件中添加配置

```js
module: {
  rules: [
    {
      test: /\.sass$/,
      use: ["style-loader", "css-loader", "sass-loader"],
    },
  ];
}
```

> 数组形式的 loader 是从下到上，从右到左执行 sass-loader -> css-loader -> style-loader

## 13. 使用 postcss-loader 自动添加 css 厂商前缀

1. 安装 postcss-loader
   `npm install postcss-loader --save-dev`

2. postcss-loader 需要配合 autoprefixer 插件使用
   `npm install autoprefixer --save-dev`

3. 在项目根目录添加 postcss.config.js 文件

```js
module.exports = {
    plugins: [
        require('autoprefixer');
    ]
}
```

4. 在 webpack.config.js 中添加配置

```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
    },
  ];
}
```

5. 确保所有的 scss 文件都会被所有 loader 处理,修改 webpack.config.js 中的配置

```js
{
    test: /\.scss$/,
    use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    /**确保每个scss都被所有loader处理**/
                    importLoaders: 2,
                    /**分模块打包css**/
                    modules: true
                }
             },
             'sass-loader',
             'postcss-loader'
     ]
}
```

## 14. 使用 file-loader 打包字体文件

1.  安装 file-loader
    `npm install file-loader --save-dev`

2.  在 webpack.config.js 文件中添加 modules

```js
{
    test: /\.(eot|ttf|svg)$/,
    use: {
        loader: 'file-loader'
    }
}
```

## 15. 使用插件让 webpack 打包更便捷

- 安装自动生成 index.html 插件 html-webpack-plugin

1. 安装 html-webpack-plugin
   `npm install html-webpack-plugin --save-dev`

htmlWebpackPlugin 会在打包结束后，自动生成 index.html 文件，并把对应的 js 引入 index.htm 文件中

2. 在 webpack.config.js 中引入插件

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
plugins: [
  new HtmlWebpackPlugin({
    template:
      "src/index.html" /**自动以src/index.html为模板，在dist目录下生成新的index.html文件**/,
  }),
];
```

- 使用 clean-webpacl-plugin 插件自动删除 dist 插件再打包

1. 安装插件 clean-webpack-plugin
   `npm install clean-webpack-plugin --save-dev`

2. 在 webpack.config.js 中使用插件

```js
const CleanWebpackPlugin = require("clean-webpack-plugin");
plugins: [new CleanWebpackPlugin({})]; /**默认清除的是dist目录**/
```

## 16. sourceMap 配置

sourceMap 映射 src 目录的源文件，能定位到哪行报错

1. 开启 sourceMap,在 wepback.config.js 中添加配置  
   `devtool: 'source-map'`

2. sourceMap 的最佳实现

```
js
devtool: 'cheap-module-eval-source-map' /**开发环境中使用**/

devtool: 'cheap-module-source-map' /**生产环境**/
```

## 17. 使用 WebpackDevServer 提高开发效率

1. 安装 webpack-dev-server
   `npm install webpack-dev-server --save-dev`

2. 在 webpack.config.js 中配置 devServer

```js
devServer: {
    contentBase: './dist',
    open: true,     /**open true 可以自动打开浏览器**/
    proxy: {
     "/api": "http://new.junbang.com/" /**请求api代理转发**/
    },
    port: 8081,  /**端口号**/
}
```

3. 在 package.json 中添加 watch 命令

```js
"scripts": {
    "watch": "webpack --watch"，
    "start": "webpack-dev-server"
}
```

使用：npm run watch 监听文件有变化自动打包
使用：npm run start 可以自动监听,自动打包, 自动刷新浏览器

## 18. 自定义 server

1. 需要安装 express 和 webpack-dev-middleward 这两个插件
   `npm install express webpack-dev-middleware --save-dev`

2. 新建 server.js 并引入插件

```js
const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const complier = webpack(config);

const app = express();

app.use(
  webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath,
  })
);

app.listen(3000, () => {
  console.log("server is running on prot 3000");
});
```

3. 在 package.json 中设置 serve 命令

```js
"scripts": {
    "serve": "node server.js"
}
```

npm run serve 使用的就是我们 server.js 配置的服务器
不过 server.js 还需要写很多，这只是简单的 server

## 19. 模块热更新 HMR

1. 开启模块热更新，在 webpack.config.js 中添加配置

```js
devServer: {
    hot: true,
    hotOnly: true,  /**hotOnly: false 浏览器可以自动刷新**/
}
使用HMR插件，在webpack.config.js中引入插件
const webpack = require('webpack');
plugins: {
    new webpack.HotModuleReplacementPlugin()
}
```

## 20. 模块热更新 HMR 作用

> css 编写. 修改无需重新刷新浏览器就可显示效果
> js 模块发生改变可以指定更新当前 js 模块，不需要刷新浏览器

js 模块热更新，在 index.js 文件中编写代码

```js
import number from './number';
number();

if (module.hot) {
    module.hot.accept('./number', () => {
    /**当number模块有改变重新渲染**/
     number();
    }
}
```

## 21. 使用 Babel 处理 ES6 语法

1. 安装 babel-loader 和 @babel/core
   `npm install --save-dev babel-loader @babel/core`

2. 在 webpack.config.js 中添加配置

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];
}
```

3. 安装@babel/preset-env 模块对 ES6 语法进行翻译
   `npm install @babel/preset-env --save-dev`

4. 在 webpack.config.js 中的 modules rules babel-loader 中配置 options 对象

```js
options: {
    presets: ["@babel/preset-env"]
}
/**或者在项目根目录下创建配置文件.bablerc**/
{
    "presets": ["@babel/preset-env"]
}
```

5. 使用@babel/polyfill 加上低版本没有的语法, 比如 map() . Promise 等
   `npm install --save @babel/polyfill`

6. 在所以代码运行之前,可以放在入口文件 index.js 最顶部
   `import "@babel/polyfill";`
7. polyfill 默认会把所有翻译过代码都加进来，有时候我们没有用到的新方法，也有了翻译的方法在里面了，所以我们要过滤掉，没用上的就不要加载进来了，这样包更小，所以在 webpack.config.js babel-loader 中修改配置

```js
options: [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage",
    },
  ],
];
```

8. 已经支持 ES6 语法的浏览器版本，没必要在翻译所以我们可以指定浏览器版本

```js
options: [
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "67" /**更多浏览器版本配置去babel官网查看**/,
      },
      useBuiltIns: "usage",
    },
  ],
];
```

9. 当指定了 useBuiltIns: 'usage'，会自动引入@babel/polyfill,所以可以去掉 index.js import 的@babel/polyfill,但是可以需要安装依赖
   `npm install --save core-js`

10. 如果是写业务代码以上配置没问题，如果要写框架. 类库. 第三方模块什么的，为了避免变量的全局污染（因为 polyfille 翻译的变量挂载到全局变量）而使用 plugin-transform-runtime 插件

11. 安装 transform-runtime 插件

```
npm install --save-dev @babel/plugin-transform-runtime
npm install --save #babel/runtime
```

12. 在 webpack.config.js 中修改配置

```js
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            plugins: [["@babel/plugin-transform-runtime", {
                corejs: 2
                helpers: true,
                regenerator: true
                useESModules: false
            }]]
        }
    }]
}
```

13. 因为我们配置了 corejs: 2,所以要加装 corejs 的依赖  
    `npm install --save @babel/runtime-corejs2`

## 22. 配置 React 代码的打包

babel 也可以打包 react 代码

1. 安装 react 框架  
   `npm install react react-dom --save`

2. 安装@babel/preset-react  
   `npm install --save-dev @babel/preset-react`

3. 在.babelrc 中添加配置  
   `presets: ["@babel/preset-env","@babel/preset-react"]`
