---
autoGroup-9: Other
title: tree生成文档目录
sidebarDepth: 2
date: 2021-04-18
categories:
  - Tools
tags:
  - Tools
---

## 1.安装

`brew install tree`

## 2.命令

```
1. tree -a 显示所有文件和目录
2. tree -d 显示所有文件名
3. tree -L n 显示项目的层级。n表示层级数。比如想要显示项目三层结构，可以用tree -l 3
4. tree -I pattern 用于过滤不想要显示的文件或者文件夹。比如你想要过滤项目中的node_modules文件夹，可以使用tree -I "node_modules"
5. tree > README.md 将项目结构输出到README.md这个文件。
```

示例：

```
// 生成目录下三层的文件目录，并且过滤掉 node_moudles 和 src，生成一个tree.md文件

tree -L 3 -I "node_modules|src" > tree.md
```

![](https://tva1.sinaimg.cn/large/008i3skNgy1gprrl0dzppj30u00vujt6.jpg)
