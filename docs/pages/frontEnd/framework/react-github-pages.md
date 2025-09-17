---
autoGroup-2: React
layout: post
title: React项目部署到Github Pages
date: 2020-07-10
categories:
  - FrontEnd
tags:
  - Framework
  - React
---

## 1. 创建项目

使用 create-react-app 脚手架创建项目。

```
npm install create-react-app
npm create-react-app my-app
cd my-app
npm start  // 运行

npm run eject //解压默认webpack包，操作不可逆
```

## 2. push 本地文件至仓库

```
git init         // 初始化一个文件夹为本地仓库
git status    // 查看状态和是否存在.git文件
git add .      // 添加到暂存区
git commit -m '提交'            // 提交到版本库且增添提交备注
git remote add origin {url}   // {url} 是你的GitHub上reponsitory地址
git push -u origin master     // 将代码推送到GitHub
```

## 3. Github Pages 部署

把项目部署成 GitHub pages，在 GitHub 上点开项目到设置，翻到 Github Pages 设置处，可以看到 GitHub Pages 只能使用 master、gh-pages 分支或者 master 下面的 docs 文件夹。  
这里使用的是 gh-pages 分支的方式来创建。

## 4. 安装 gh-pages

```
npm install gh-pages --save-dev
```

通过 gh-pages 中间件，可以把 build 文件下的文件推送到 GitHub，并且创建 gh-pages branch

## 5. 修改 package.json

```
{
    "name": "react_demo",
    "version": "1.1.0",
    "private": true,
  + "homepage": "./",  // 表示你访问的页面
},
```

- 注意：homepage 不要设置成 github page 上生成的那个链接路径，比如https://username.github.io/react_demo/。如果设置成上面的连接，build打的包会这所有路径前面加上react_demo。比如 index.html 文件中对同等目录下的文件引用应该是 src='./index.css'，结果会变成 src='./react_demo/index.css'，这样部署后肯定无法访问，所有资源都找不到。

增加 npm scripts 命令，推送 gh-pages

```
"scripts": {
        ...
  + "predeploy": "npm run build" , // 将你的项目预编译成静态文件放在build文件夹
  + "deploy": "gh-pages -d build"  // 是使用gh-pages 部署你的build文件夹下的内容
},
```

注意修改之后注意也 push 上去

## 6. 推送项目

GitHub Pages 只是部署项目，react 代码直接放上去是识别不了的，所以部署的是打包编译后到代码。

`npm run build`

> **Webpack 4.X 打包 Bootstrap4.x 失败解决办法**

```
npm install jquery --save // Bootstrap4.x 依赖JQuery，所以需要先安装JQuery
npm install popper.js --save // Bootstrap4.x 依赖Popper，所以需要先安装Popper
npm install bootstrap --save // 安装Bootstrap4.x
```

编译后就可以推送了,执行上面配置的命令。

`npm run deploy`

这时 github 上项目就多出了一个 gh-pages 的 branch，在设置中 Github Pages 处选择 gh-pages 分支保存，部署完成。  
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gh954sjfhaj30pj0m9gmb.jpg)

**部署时候具体执行的操作大概为：**

- 按照 package.json 里面增加配置代码
- build 打包编译代码文件
- 使用 gh-pages 工具把 build 文件下的文件推送到 GitHub 部署到新的 gh-pages 分支上
- 发布页面

## 7. 项目展示

### 7.1 [ 🖥 React-IM ](https://tienouc.gitee.io/react-im/)

<iframe
        style="height: 576px; width: 100%; background-color: #ffffff;"
        frameborder="0"
        scrolling="no"
        loading="lazy"
        src="https://tienouc.gitee.io/react-im/#/"
      >
</iframe>

### 7.2 [ 📒 账单薄 ](https://tienouc.gitee.io/account-app/)

<iframe
        style="height: 576px; width: 100%; "
        frameborder="0"
        scrolling="no"
        loading="lazy"
        src="https://tienouc.gitee.io/account-app/"
      >
</iframe>
