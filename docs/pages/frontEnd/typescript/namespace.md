---
autoGroup-1: TS基础概念和用法
title: 命名空间
date: 2021-05-02
categories:
  - FrontEnd
tags:
  - TypeScript
---

**TypeScript 与 ECMAScript 2015 一样，任何包含顶级 import 或者 export 的文件都被当成一个模块。相反地，如果一个文件不带有顶级的 import 或者 export 声明，那么它的内容被视为全局可见的（因此对模块也是可见的）**

```ts
namespace A {
  export namespace B {
    export const str = 'namespace';
  }
}

console.log(A.B.str);
```

编译后

```js
var A;
(function(A) {
  var B;
  (function(B) {
    B.str = 'namespace';
  })((B = A.B || (A.B = {})));
})(A || (A = {}));

console.log(A.B.str); // namespace
```

命名空间也可以抽离 `export` 导出，再使用 `import` 引入。

**重名的命名空间会合并**
