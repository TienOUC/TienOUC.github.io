---
autoGroup-5: 其他
title: 正则表达式
sidebarDepth: 2
date: 2021-04-18
categories:
  - FrontEnd
tags:
  - JavaScript
---

正则表达式常用的基本操作

## 1.元字符

| 元字符 | 说明                       |
| :----: | :------------------------- |
|   .    | 匹配除换行符以外的任意字符 |
|   \w   | 匹配字母、数字、下划线     |
|   \s   | 匹配任意的空白符           |
|   \d   | 匹配数字                   |
|   \b   | 匹配单词的开始或者结束     |
|   ^    | 匹配字符串的开始           |
|   \$   | 匹配字符串的结束           |

## 2.重复限定符

| 语法  | 说明              |
| :---: | :---------------- |
|  \*   | 重复 0 次或更多次 |
|   +   | 重复 1 次或更多次 |
|  ？   | 重复 0 次或 1 次  |
|  {n}  | 重复 n 次         |
| {n,}  | 重复 n 次或更多次 |
| {n,m} | 重复 n 到 m 次    |

## 3.模式修正符

- 不区分大小写 `i`
- 全局 `g`  
  可以组合使用，顺序无所谓

```js
let str = 'abcDEF123456abcDEF',
	reg_i = /[a-z]+/i,
	reg_g = /[a-zA-Z]+/g,
	reg_ig = /[a-z]+/gi,
	res_i = str.match(reg_i),
	res_g = str.match(reg_g),
	res_ig = str.match(reg_ig);
console.log('res_i:', res_i); //["abcDEF", index: 0, input: "abcDEF123456abcDEF",groups: undefined]
console.log('res_g:', res_g); //["abcDEF", "abcDEF"]
console.log('res_ig', res_ig); //["abcDEF", "abcDEF"]
```

## 4.原子表与原子组

- 原子表
  下例中 123456 中任意一个匹配，非全局模式时，匹配到第一个即停止

```js
let reg = /[123456]/;
let str = '010123456';
let res = str.match(reg);
console.log(res); // ["1", index: 1, input: "010123456", groups: undefined]
```

- 原子组
  下例中 12 和 34 作为一个整体去匹配

```js
let reg = /(12|34)/g;
let str = '010124563';
let res = str.match(reg);
console.log(res); //  ["12"]
```

## 5.匹配中文和标点符号

```js
let str = '心肝、宝贝、123、甜蜜饯儿';
let reg = /[^\d\、]\W+/g;
let res = str.match(reg);
console.log(res.join('')); // 心肝、宝贝、甜蜜饯儿
```

```js
let str = '心肝、宝贝、123.、甜蜜饯儿！、abc';
let reg = /\p{sc=Han}/gu;
let res = str.match(reg);
console.log(res.join('')); //心肝宝贝甜蜜饯儿
```

```js
let str = '心肝、宝贝、123.、甜蜜饯儿！、abc';
let punctuation = /\p{P}/gu;
let res = str.match(punctuation);
console.log(res); // ["、", "、", ".", "、", "！", "、"]
```
