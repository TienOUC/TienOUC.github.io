---
autoGroup-5: 其他
title: JS参数传递
date: 2021-11-07
categories:
  - FrontEnd
tags:
  - JavaScript
---

《JavaScript 高级程序设计》第三版 4.1.3 中，关于参数的传递这样写到：  
`ECMA中所有函数的参数都是按值传递的。`

我们都知道，JS 中的数据类型分两种，`基本数据类型` 和 `引用数据类型`，上面这句话让人疑惑的地方在于，引用类型的值传递的时候为什么也是按值传递的。

在解决这个疑惑之前，先探究一下什么是按值传递(call by value)，什么是按引用传递(call by reference)。

这属于计算机科学里的求值策略(**Evaluation Strategy**)，它决定变量之间、函数调用时实参和形参之间值是如何传递的。

- 值传递(call by value)

  常用求值策略，函数的形参是被调用时所传实参的副本。修改形参的值并不会影响实参。

- 引用传递(call by reference)

  函数的形参接受实参的隐式引用，而不再是副本。这意味着函数的形参的值如果被修改，实参也会被修改。同时两者指向相同的值。

我们再回过头来看 JS 中的两种数据类型。

- 基本数据类型

  保存在栈内存中的简单数据，有 `Number` 、 `String` 、 `Boolean` 、 `Null` 、 `Undefined` 、以及 ES6 新增的`Symbol` 。

- 引用类型数据

  保存在堆内存中的对象，有 `Object` 、 `Array` 和 `Function`，这里堆内存中的数据不能直接访问或者操作，只能操作对象在栈内存中的引用地址。

接下来我们来看简单的例子会比较直观。

- 基本类型的传值示例：

```js
function add(num) {
	num += 10;
	return num;
}

var count = 20;
var result = add(count);
console.log(count); // 20
console.log(result); // 30
```

上面例子中，函数调用时，其形参 `num` 只是复制了一份实参 `count` 的副本，函数内部的变化并不会影响到外部实参 `count` 。可以将这里两个变量的初始值在栈内存中的存储以下面的结构简单具像化。

| 变量  | 值  |
| ----- | --- |
| count | 20  |
| num   | 20  |

函数调用后

| 变量  | 值  |
| ----- | --- |
| count | 20  |
| num   | 30  |

- 我们再来看引用类型(对象)的示例

```js
var person = { name: 'Tony' };
function setName(obj) {
	obj = { name: 'Mathew' };
	console.log(obj.name); // Mathew
}

setName(person);
console.log(person.name); // Tony
```

看到这里，第一感觉是函数调用时修改了对象 `person` 的引用地址，但为什么最后一行的输出依然是 `Tony` 呢？既然没有变化，那这个示例中函数的参数肯定就不是按引用传递了，为什么？

正如前文所述，`引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存在堆内存中的对象`。

所以此处可以用下面的简单具像化结构来解释。

当 person

<table>
  <tr>
    <th></th>
    <th colspan="2" style="text-align: center">栈内存</th>
    <th >堆内存</th>

  </tr>
  <tr>
    <td>变量</td>
    <td>值</td>
    <td>地址</td>
    <td>对象</td>
  </tr>
  <tr>
    <td>person</td>
    <td><#001></td>
    <td>#001 </td>
     <td>{name: 'Tony'}</td>
  </tr>
</table>

作为实参 `person` 进入函数 `setName` 后， 最开始形参 `obj` 拷贝了其地址副本，这个地址副本和 `person` 的地址指向是相同的。

<table>
  <tr>
    <th></th>
    <th colspan="2" style="text-align: center">栈内存</th>
    <th >堆内存</th>
  </tr>
  <tr>
    <td>变量</td>
    <td>值</td>
    <td>地址</td>
    <td>对象</td>
  </tr>
  <tr>
    <td>person</td>
    <td><#001></td>
    <td>#001 </td>
     <td>{name: 'Tony'}</td>
  </tr>
  <tr>
    <td>obj</td>
    <td><#001></td>
    <td>#001</td>
     <td></td>
  </tr>
  <tr>
    <td></td>
    <td><#002></td>
    <td>#002</td>
     <td>{name: 'Mathew'}</td>
  </tr>
</table>

如果在 `obj` 赋值之前对 `obj` 拷贝的地址副本进行操作，那么指向这个地址的变量都会发生变化，即若此时修改 `obj` ,外部的 `person` 也会被改变。

但是，函数内部紧接着对 `obj` 重新赋了值， 改变了地址副本的指向，使得 `obj` 指向了新对象 `{name: 'Mathew'}`

<table>
  <tr>
    <th></th>
    <th colspan="2" style="text-align: center">栈内存</th>
    <th >堆内存</th>
  </tr>
  <tr>
    <td>变量</td>
    <td>值</td>
    <td>地址</td>
    <td>对象</td>
  </tr>
  <tr>
    <td>person</td>
    <td><#001></td>
    <td>#001 </td>
     <td>{name: 'Tony'}</td>
  </tr>
    <tr>
    <td>obj</td>
    <td><#002></td>
    <td>#002</td>
     <td>{name: 'Mathew'}</td>
  </tr>
</table>

这时 `obj` 和 `person` 之间就不会有任何联系了，所以 `obj` 的改变并不会影响 `person`。

对于上面示例二中的参数传递（**传递对象引用的副本**），也被称作共享传递(call by sharing)，拷贝地址副本也是一种值的传递，所以书中才会写到 `ECMA中所有函数的参数都是按值传递的。`

<!-- 一直被我忽视的基础知识，让我翻车翻了个四脚朝天，回过头细细探究后才发现，原来魔法藏在细节里。

### 1. 传值与传址

- 基本类型的赋值是值的复制，互相不受影响，看例子：

```js
function foo(a) {
	a = a + 1;
}

var a = 4;
foo(a);
console.log(a); // 4
```

`var a = 4;` 该变量把它的值复制给 `foo()` 函数的形参 `a`，然后 foo()内部执行 `a = a + 1`，foo()函数内部的 `a` 变为 `5`，但是 `var` 声明的变量 `a` 的值依然是 `4`，此 `a` 非彼 `a`！为啥我一直认为 `var` 声明的 `a` 也变成了 `5`，因为我在基础知识部分走马观花了呀！

- 对于引用类型，变量保存的是引用对象的指针，变量间赋值时其实赋值的是变量的指针，这样多个变量就引用的是同一个对象。

```js
let a = {
	name: 'A',
};
let b = a;
a.name = 'AA';
consloe.log(b); //'AA'
```

```js
function foo(a, b, c, d, e){
  a = a + 1;
  b.push(1);
  c = [1];
  d = { x: 8 };
  e.y = 9
}
var a = 4;
var b = [5];
var c = [6];
var d = { x: 7 };
var e = { y: 8 };

foo(a, b, c, d, e);

console.log(a); //4   基本类型，值不变，只是把值复制了一份给foo()的形参a,foo()内部的a自增1 （这两个a是不同的）
console.log(b); //[5, 1]  引用类型，foo()的形参b接收了全局b这个对象的指针（内存地址），所以foo()内部的b和全局的b都指向了同一个对象，即数组[5]，所以foo()内部的push操作会改变全局的b
console.log(c); //[6]   全局变量c存储的指针赋值给foo()的形参c, foo()内部形参c存储的指针又被替换成数组[1]的指针，但全局变量c存储的指针依然没变化
console.log(d); //{x: 7}  d与c同理
console.log(e); //{y: 9}  全局变量e存储的指针赋值给foo()的形参e, foo()内部执行 e.y = 9 是将e所存储指针（指针指向对象{}）指向的堆内存数据 (属性数据) 修改为9, 栈内存的指针依然没有改变，所以全局e变为{y: 9}
``` -->
