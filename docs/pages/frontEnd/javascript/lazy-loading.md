---
autoGroup-4: 高级技巧
title: JS惰性载入函数
date: 2021-11-21
categories:
  - FrontEnd
tags:
  - JavaScript
---

## JS 性能之惰性载入函数

### 一、惰性载入概念

**惰性载入函数：** 函数执行时会根据不同的判断分支最终选择合适的方案执行，但这样的分支判断仅会发生一次，后面的其他同类执行都不会再分支判断。提高了 JS 执行效率性能。

**简单来说：** 某功能函数如果需要多个分支判断出一套方案，后续执行都仅需这一套方案就可采用 `惰性载入` 设计。

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202111211514850.png)

### 二、设计思想

- 定义好的函数，实际上在执行的过程中是就可以被动态修改其定义的。

- 除首次执行外，被修改的定义的函数后续被调用将使用新的函数定义。

### 三、示例

IE 系浏览器不同程度支持 `attachEvent` 或 `addEventListener`，其他大多数浏览器基本都支持 `addEventListener` 的方式。因此在用原生 JS 给 DOM 添加事件的时候，我们封装了一个通用函数 `addEvent` 用以暴露统一的接口给 dom 添加事件，`addEvent`中会对是否存在 `attachEvent` 或 `addEventListener` 进行判断进而使用各自浏览器支持的事件方法给 DOM 添加事件，然而传统的 if else 判断虽然能实现功能，但当前环境下后续的每次事件添加都会依次执行这些分支判断，显然是没有意义的执行，因为判断一次就够了。

- 传统 if else

  ![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202111211432498.png)

上述方法在每次调用时都会执行分支判断。

- 惰性载入具体实现

  > 1. 在函数被调用时再处理函数

  ![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202111211432659.png)

  > 2. 在函数声明时就指定适当函数

  ![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202111211433642.png)

惰性载入的两种方法，在函数首次执行时做出分支判断，之后每次调用都不会再做兼容判断。
