---
autoGroup-5: 其他
title:  search params
date: 2022-05-28
categories:
  - FrontEnd
tags:
  - JavaScript
---

1. 解析URL中的search params，返回对象

```js
const url = new URL('https://www.dodolo.top?a=a&b=b&c=c')
Object.fromEntries(new URLSearchParams(url.search).entries()) // {a: 'a', b: 'b', c: 'c'}
```

2. 将对象组合成URL search params(&符连接)

```js
const baseUrl = 'https://www.dodolo.top'
const params = new URLSearchParams({
  a: 'a',
  b: 'b',
  c: 'c'
})
const URL = `${baseUrl}?${params.toString()}`
console.log(URL) // https://www.dodolo.top?a=a&b=b&c=c

```