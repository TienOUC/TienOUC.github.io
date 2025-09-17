---
autoGroup-1: TS基础概念和用法
title: 类型断言
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. 概念

类型断言可以手动指定一个变量的类型，即允许一个变量从一个类型转换到另一个类型。

:::tip

语法：

- `<类型>值` （遇到 JSX 时有兼容性问题）
- `值 as 类型` （推荐）

:::

## 示例

我们拿到了一个 `any` 类型的变量, 但是我们明确的知道这个变量中保存的是字符串类型，此时就可以通过类型断言将 `any` 类型转换成 `string` 类型, 就能够使用字符串类型中相关的方法了。

```ts
let str: any = 'type-assertion'
let len = (str as string).length //此时str从any指定为string类型后，点语法会提示string相关方法
console.log(len) //14
```
