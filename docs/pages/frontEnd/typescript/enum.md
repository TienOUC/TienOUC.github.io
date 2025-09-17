---
autoGroup-1: TS基础概念和用法
title: enum枚举类型的注意点
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

> 枚举用于表示固定的几个取值,例如: 一年只有四季、人的性别只能是男或者女。 枚举类型是 TS 为 JS 扩展的一种类型, 在原生的 JS 中是没有枚举类型的。

## 1. 枚举类型用于定义数值集合。

```ts
enum Color {
  red,
  blue,
  gray,
}
const color: Color = Color.gray
console.log(color) //2，输出索引
```

## 2. 如果某个属性的值是计算出来的，那么它后面一位的成员必须要初始化赋值。

```ts
const getValue = () => {
  return 0
}

enum List {
  A = getValue(),
  B = 2, //  前面的值A是通过计算得到的，那么此处B必须要初始化赋值，不然编译不通过，提示 `Enum member must have initializer.`
  C,
}
```

## 3. 枚举类型的值

```ts
enum Gender {
  Male = 0,
  Femal = 1,
}

// 简写
enum Gender {
  Male,
  Femal,
}

// 定义了一个名称叫做Gender的枚举类型, 这个枚举类型的取值有两个, 分别是Male和Femal
// 值依次递增，也可手动指定，上面的简写形式没有指定值，默认从0开始递增，所以相当于 Male = 0,  Femal = 1
```
