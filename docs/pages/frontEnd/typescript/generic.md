---
autoGroup-1: TS基础概念和用法
title: 泛型
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

## 1. 为什么引入泛型

**示例：**
定义一个创建数组的方法, 可以创建出指定长度的数组, 并且可以用任意指定的内容填充这个数组。

```ts
let getArray = (value:any, items:number = 5):any[]{
    return new Array(items).fill(value)
}

let arr1 = getArray("abc", 3)
console.log(arr1)   //[ 'abc', 'abc', 'abc' ]
let arr2 = getArray(6, 3)
console.log(arr2)   //[ 6, 6, 6 ]
let res = arr1.map(item=>item.length) // 编辑时点语法没有提示length属性
console.log(res)    //[ 3, 3, 3 ]
```

:::warning

1. 编写代码没有提示对应的属性方法, 因为 TS 的静态检测不知道具体是什么类型。
2. 哪怕代码写错了也不会报错, 因为 TS 的静态检测不知道具体是什么类型。

:::

## 2. 使用泛型

```ts
let getArray = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
};

let arr = getArray<string>('abc');
let res = arr.map((item) => item.length);
console.log(res);

// let arr = getArray<number>(6);
// 如果没有指定, 那么就会根据传递的泛型参数自动推导出来
// 比如 let arr = getArray('abc')，map方法中点语法也会提示length属性
```

:::tip

作用：

- 用来弥补 any 没有语法提示和报错的缺点。
- 最开始不指定类型，后面根据我们传入的类型确定类型。

:::

用法：

```ts
let getArray = <T>(value: T, items: number = 5): T[] => {
  return new Array(items).fill(value);
};

//泛型是指定传入类型的，写在函数`()`的前面；
//返回结果类型是指定函数传出类型的，写在函数`()`的后面；
```

## 3. 泛型约束

```ts
function getItemOfObj<T>(obj: T, key) {
  return obj[key];
}
const object = { a: 1, b: 2, c: 3 };

const res1 = getItemOfObj(object, 'd');
console.log('res1', res1); // 1

const res2 = getItemOfObj(object, 'd');
console.log('res2', res2); // undefined
```

没有对 `key` 加约束，所以在 `res2` 为 `undefined` ，此时 TS 并没有报错提示，因此，就有了泛型约束。

对 key 加上类型约束，此时 TS 就会提示如下错误信息：

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/Snipaste_2023-01-25_23-54-09.png)

其中使用了 TS 泛型和泛型约束。首先定义了 T 类型并使用 extends 关键字继承 object 类型的子类型，然后使用 keyof 操作符获取 T 类型的所有键，它的返回 类型是联合 类型，最后利用 extends 关键字约束 K 类型必须为 keyof T 联合类型的子类型。

```ts
class Info<T> {
  attr: T[] = [];
  add(a: T): T[] {
    return [a];
  }
}

let info = new Info<number>();
info.attr = ['a']; //  Type 'string' is not assignable to type 'number'.
info.add('1'); // Argument of type 'string' is not assignable to parameter of type 'number'.

info.attr = [1];
info.add(1);
```
