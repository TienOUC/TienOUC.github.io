---
autoGroup-1: TS基础概念和用法
title: 声明文件
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

实际开发中需要引入第三方库，但这些库不能使用 TS 的类型检查等特性方法，所以需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。

```ts
//引入jQuery
declare var jQuery: (selector: string) => any;
//获取id=foo的元素
jQuery('#foo');
```

- 声明文件以 `.d.ts` 为后缀

- 声明文件或模块的语法格式如下：

```ts
declare module Module_Name {}
```

- TypeScript 引入声明文件语法格式(三斜线指令)：

```ts
/// <reference path = "xxx.d.ts" />
```

:link:[一些依赖的声明文件](https://www.npmjs.com/~types?activeTab=packages)

## 三斜线指令

三斜线指令是包含单个 XML 标签的单行注释。 注释的内容会做为编译器指令使用。

三斜线指令仅可放在包含它的文件的最顶端。 一个三斜线指令的前面只能出现单行或多行注释，这包括其它的三斜线指令。 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

`/// <reference path="..." />` 指令是三斜线指令中最常见的一种。 它用于声明文件间的依赖。

三斜线引用告诉编译器在编译过程中要引入的额外的文件。

你也可以把它理解能 import，它可以告诉编译器在编译过程中要引入的额外的文件
