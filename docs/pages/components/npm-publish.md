---
title:  组件发布到 NPM
date: 2020-02-28
categories:
- FrontEnd
tags:
- Vue
- Components
---

## 1. 介绍

基于 vue-cli 3.0 开发，已发布到 npm 上的 UI 组件 ——  :link: [  **ti-ui-self**  ](https://www.npmjs.com/package/ti-ui-self)
[示例](https://tienouc.gitee.io/vuepress/pages/components/button.html)

## 2. 参考资料

**1. [ Vue.js ](https://cn.vuejs.org/v2/guide/components.html)**   
**2. [ VuePress ](https://www.vuepress.cn/guide/markdown.html#header-anchors)**

## 3. 发布

**1. 新建一个 vue 项目，并且在根目录创建两个文件夹 packages 和 examples**

> packages：用于存放所有的组件   
> examples：用于进行测试，把 src 改为 examples

将写好的组件以及字体图标文件 copy 到新建项目的 packages 路径下，将 App.vue 和 main.js 放到 examples 路径下。其实一个单纯的组件库是不需要 examples 路径的，这样设计是为了以后我们封装新的组件时，便于测试。

文件目录如图所示：   

![](https://tva1.sinaimg.cn/large/007S8ZIlly1geao4vs56xj30b70nw0t2.jpg)

**2. 配置 vue.config.js**

在项目根目录下创建vue.config.js文件，并进行如下配置。

```js
const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',  //将入口文件设置为examps路径下的main.js文件
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展webpack 配置，使packages加入编译,使用babel处理可以将高版本语法转成低版本语法，在我们封装组件库时，这部分配置可以直接复制使用。
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改其他选项
        return options
      })
  }
}
```
**3. install 方法**

安装 vue.js 插件，如果插件是一个对象，那么必须提供 install 方法。

此时，我们需要在 packages 路径下，新建一个 index.js 文件，用于声明 install 对象。


```js
// 整个包的入口
// 定义 install 方法，接受 Vue 作为参数，若果使用 use 注册插件，则所有的组件都将被注册
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Checkbox from './checkbox'
import CheckboxGroup from './checkbox-group'
import Radio from './radio'
import RadioGroup from './radio-group'
import Switch from './switch'
import Form from './form'
import FormItem from './form-item'
import './fonts/font.scss'

// 声明conpoments数组，将组件全部放到这个数组中
const components = [
  Button,
  Dialog,
  Input,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Form,
  FormItem
]
// 定义install方法，在Vue中注册所有的组件
const install = function (Vue) {
  // 注册所有的组件
  components.forEach((item) => {
    Vue.component(item.name, item)
  })
}
// 判断是否是直接引入文件，若是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 导出install对象
export default {
  install
}
```

**4. 打包组件库**

`vue-cli-service build --target lib`

修改项目的 package.json 文件

```js
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "lib": "vue-cli-service build --target lib packages/index.js"
  },
```
执行 `yarn lib` 对 packages/index.js 指定的组件进行打包，完成后，项目根目录下生成 dist 文件夹

**5. 组件库上传前的准备工作**

- 修改 package.json 文件中声明的个人信息（自定）

```js
 "name": "ti-ui-self",
  "version": "0.1.4",
  "private": false,    // 要发布到 npm 必须设置为 false
  "main": "dist/ti-ui-self.umd.min.js", // 指定入口文件(dist下)
  "author": {
    "name": "TienOUC",
    "Github": "https://github.com/TienOUC"
  },
```

- 修改 README.md 文件
  
**6. 项目上传到 github 仓库**
   
**7. 组件库上传到 npm**
- 根目录下增加一个.npmigore文件，忽略不需要上传的文件

```
# 忽略目录
examples/
packages/
public/

#忽略指定文件

vue.config.js
babel.config.js
*.map
```
- 检查 npm 源，若是淘宝源，需切换回官方源，否则不能发布
```
localhost:ti-ui willtien$ nrm ls
  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```
切换源 ` localhost:ti-ui willtien$ npm config set registry=http://registry.npmjs.org `

查看当前源
```
localhost:ti-ui willtien$ npm config get registry
http://registry.npmjs.org/
```

- 登录 npm (需注册账号)，执行 `npm publish` 发布

```
localhost:ti-ui willtien$ 
localhost:ti-ui willtien$ npm login 
Username: tienouc
Password: 
Email: (this IS public) dktianf@163.com
Logged in as tienouc on http://registry.npmjs.org/.
localhost:ti-ui willtien$ npm publish
npm notice 
npm notice 📦  ti-ui-self@0.1.4
npm notice === Tarball Contents === 
npm notice 121B    .editorconfig                         
npm notice 21.1kB  dist/ti-ui.css                        
npm notice 172B    dist/demo.html                        
npm notice 129.8kB dist/ti-ui.common.js                  
npm notice 130.2kB dist/ti-ui.umd.js                     
npm notice 34.7kB  dist/ti-ui.umd.min.js                 
npm notice 1.3kB   package.json                          
npm notice 13.1kB  README.md                             
npm notice 56.0kB  dist/fonts/element-icons.732389de.ttf 
npm notice 28.2kB  dist/fonts/element-icons.535877f5.woff
npm notice === Tarball Details === 
npm notice name:          ti-ui-self                              
npm notice version:       0.1.4                                   
npm notice package size:  133.4 kB                                
npm notice unpacked size: 414.6 kB                                
npm notice shasum:        8932c6ab363d19aec52fa7d10961b204c4b7c49e
npm notice integrity:     sha512-8AyupMnu4YJTl[...]y4BXTom1KixjA==
npm notice total files:   10                                      
npm notice 
+ ti-ui-self@0.1.4
localhost:ti-ui willtien$ 
```
**8. npm 包后续管理**
 - 删除已发布的包
 `npx force-unpublish package-name '原因描述'` 
 
 - 更新自己的 npm 包（模块）及 README.md   
   
 修改代码和 README.md 后，执行命令：
 ```
 npm version patch
 npm publish
```
- npm 官方搜索已发布的包

 :link: [ ti-ui-self ](https://www.npmjs.com/package/ti-ui-self)
   
![](https://tva1.sinaimg.cn/large/007S8ZIlly1geb2iofobwj31er0sldhw.jpg)
      
- 更新 npm 说明
 > 针对patch： npm install test-npm-test   
 > 针对minor： npm install test-npm-test   
 > 针对major： npm install test-npm-test@2.0.0   


- npm version 后面参数说明：   
> patch：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1  
> minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0   
> major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0   
