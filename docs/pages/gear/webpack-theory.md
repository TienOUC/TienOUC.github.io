---
autoGroup-5: Bundle
title: Webpack原理浅析
sidebarDepth: 2
date: 2019-08-18
categories:
- FrontEnd
tags:
- Tools
- Webpack
---

[深入浅出 Webpack](https://webpack.wuhaolin.cn/)

## 1. 原理

webpack 是一个模块打包机制，将根据文件间的依赖关系对其进行静态分析，然后将这些模块按指定规则生成静态资源。  
当 webpack 处理程序时，它会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个 bundle。

**主要功能:**

- 打包：将多个文件打包成一个文件，减少服务器压力和下载带宽
- 转换：将预编译语言转换成浏览器识别的语言
- 性能优化

**核心概念:**

- Entry

  > ⼊⼝起点(entry point)指示 webpack 应该使⽤哪个模块,来作为构建其内部依赖图的开始。  
  > 进⼊⼊⼝起点后,webpack 会找出有哪些模块和库是⼊⼝起点（直接和间接）依赖的。  
  > 每个依赖项随即被处理,最后输出到称之为 bundles 的⽂件中。

- Output

  > output 属性告诉 webpack 在哪⾥输出它所创建的 bundles,以及如何命名这些⽂件,默认值为 ./dist。  
  > 基本上,整个应⽤程序结构,都会被编译到你指定的输出路径的⽂件夹中。

- Module

  > 模块,在 Webpack ⾥⼀切皆模块,⼀个模块对应着⼀个⽂件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。

- Chunk

  > 代码块,⼀个 Chunk 由多个模块组合⽽成,⽤于代码合并与分割。

- Loader

  > loader 让 webpack 能够去处理那些⾮ JavaScript ⽂件（webpack ⾃身只理解 JavaScript）。  
  > loader 可以将所有类型的⽂件转换为 webpack 能够处理的有效模块,然后你就可以利⽤ webpack 的打包能⼒,对它们进⾏处理。  
  > 本质上,webpack loader 将所有类型的⽂件,转换为应⽤程序的依赖图（和最终的 bundle）可以直接引⽤的模块。

- Plugin
  > loader 被⽤于转换某些类型的模块,⽽插件则可以⽤于执⾏范围更⼴的任务。  
  > 插件的范围包括,从打包优化和压缩,⼀直到重新定义环境中的变量。插件接⼝功能极其强⼤,可以⽤来处理各种各样的任务。

**构建流程:**  
Webpack 的运⾏流程是⼀个串⾏的过程,从启动到结束会依次执⾏以下流程:

1. 初始化参数：从配置⽂件和 Shell 语句中读取与合并参数,得出最终的参数。
2. 开始编译：⽤上⼀步得到的参数初始化 Compiler 对象,加载所有配置的插件,执⾏对象的 run ⽅法开始执⾏编译。
3. 确定⼊⼝：根据配置中的 entry 找出所有的⼊⼝⽂件。
4. 编译模块：从⼊⼝⽂件出发,调⽤所有配置的 Loader 对模块进⾏翻译,再找出该模块依赖的模块,再递归本步骤直到所有⼊⼝依赖的⽂件都经过了本步骤的处理。
5. 完成模块编译：在经过第 4 步使⽤ Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
6. 输出资源：根据⼊⼝和模块之间的依赖关系,组装成⼀个个包含多个模块的 Chunk,再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表,这步是可以修改输出内容的最后机会。
7. 输出完成：在确定好输出内容后,根据配置确定输出的路径和⽂件名,把⽂件内容写⼊到⽂件系统。  
   在以上过程中,Webpack 会在特定的时间点⼴播出特定的事件,插件在监听到感兴趣的事件后会执⾏特定的逻辑,并且插件可以调⽤ Webpack 提供的 API 改变 Webpack 的运⾏结果。

## 2. 打包优化方法

### 2.1.1 css剥离

从 js 文件剥离 css，并单独打包 `npm install --save-dev extract-text-webpack-plugin`

```js
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//在 plugins 中配置
plugins: [new ExtractTextPlugin('[name].[contenthash].css')];
```

### 2.1.2 压缩

去掉代码注释，压缩代码

```js
 //在 plugins 中添加
 new webpack.optimize.UglifyJsPlugin({
    comments: false, //去掉注释
    compress: {
    warnings: false //忽略警告,要不然会有⼀⼤堆的⻩⾊字体出现……
 }
```

### 2.1.3 开启gzip压缩

`npm install --save-dev compression-webpack-plugin`

```js
var CompressionWebpackPlugin = require('compression-webpack-plugin');
//在 plugin 中添加
new CompressionWebpackPlugin({
  //gzip 压缩
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: new RegExp(
    '\\.(js|css)$' //压缩 js 与 css
  ),
  threshold: 10240,
  minRatio: 0.8,
});
```

### 2.1.4 压缩html

`npm install --save-dev html-webpack-plugin`

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
  filename: 'react.html', //⽣成的⽂件，从 output.path 开始 output.path + "/react.html"
  template: '../client/react.html', //读取的模板⽂件,这个路径是相对于当前这个配置⽂件的
  inject: true, // ⾃动注⼊
  minify: {
    removeComments: true, //去注释
    collapseWhitespace: true, //压缩空格
    removeAttributeQuotes: true, //去除属性引⽤
  },
  //必须通过上⾯的 CommonsChunkPlugin 的依赖关系⾃动添加 js，css 等
  chunksSortMode: 'dependency',
});
```
### 2.1.5 关闭devtool
若生产环境必须要使用 devtool ，可以配置为 `devtool: "#source-map"` 这样会比 `devtool: "inline-source-map"`更优。   
`inline-source-map` 为每⼀个⽂件添加 sourcemap 的 DataUrl，注意这⾥的⽂件是打包前的每⼀个⽂件⽽不是最后打包出来的，同时这个 DataUrl 是包含⼀个⽂件完整 souremap 信息的 Base64 格式化后的字符串，⽽不是⼀个 url。
