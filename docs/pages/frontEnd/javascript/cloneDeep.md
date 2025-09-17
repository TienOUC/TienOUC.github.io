---
autoGroup-5: 其他
title: 'Js浅拷贝和深拷贝'
date: 2020-01-01
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 浅拷贝

```js
//原始对象exp1
let exp1 = {
	name: 'exp1',
	data: 1234,
};
let exp2 = exp1; //只是把exp1所储存的内存地址复制给exp2, exp1和exp2指向同一个对象（传址）
exp2.name = 'exp2'; //修改其中一个的属性会导致另一个的属性也跟着改变
console.log(exp1); //{ name: 'exp2', data: 1234 }
```

```js
// =========浅拷贝-1=========
let exp3 = {
	name: exp1.name,
	data: exp1.data,
};
exp3.name = 'exp3';
console.log(exp3); //{ name: 'exp3', data: 1234 }   复制exp1第一层属性，改变exp3时不影响exp1
console.log(exp1); //{ name: 'exp1', data: 1234 }
```

```js
// =========浅拷贝-2=========
let exp4 = {};
for (const key in exp1) {
	//当exp1属性较多时，用上面的方法逐个复制便不是很便利了，所以可采用for in循环复制，exp4的修改也不会影响exp1
	exp4[key] = exp1[key];
}
exp4.name = 'exp4';
console.log(exp4); //{ name: 'exp4', data: 1234 }
console.log(exp1); //{ name: 'exp1', data: 1234 }
```

```js
// =========浅拷贝-3=========
let exp5 = Object.assign({}, exp1); //使用Object.assign()方法
exp5.name = 'exp5';
console.log(exp5); //{ name: 'exp5', data: 1234 }
console.log(exp1); //{ name: 'exp1', data: 1234 }
```

```js
// =========浅拷贝-4=========
let exp6 = { ...exp1 }; //使用ES6的展开语法
exp6.name = 'exp6';
console.log(exp6); //{ name: 'exp6', data: 1234 }
console.log(exp1); //{ name: 'exp1', data: 1234 }
```

> **总结：** 浅拷贝只复制对象的第一层属性，深拷贝可以对对象的属性进行递归复制

---

## 2. 深拷贝

```js
//原对象
let exp_1 = {
	name: 'exp_1',
	data: {
		m: 123,
		n: 'ABC',
	},
};

let exp_2 = {
	name: exp_1.name,
	data: exp_1.data, //exp_1深层属性是个对象，这里依然只是复制了对象的地址，所以exp_2.data.m修改会引起exp_1中data对象的m变化
};
exp_2.name = 'exp_2';
exp_2.data.m = 456;
console.log(exp_2); //{ name: 'exp_2', data: { m: 456, n: 'ABC' } }
console.log(exp_1); //{ name: 'exp_1', data: { m: 456, n: 'ABC' } }
```

```js
//要实现深拷贝就必须对原对象里的各层数据逐层递归处理
function copy(object) {
	let res = {};
	for (const key in object) {
		res[key] = typeof object[key] == 'object' ? copy(object[key]) : object[key];
	}
	return res;
}

let exp_3 = copy(exp_1);
exp_3.name = 'exp_3';
exp_3.data.m = 789;
console.log(exp_3); //{ name: 'exp_3', data: { m: 789, n: 'ABC' } }
console.log(exp_1); //{ name: 'exp_1', data: { m: 123, n: 'ABC' } }
```

- 但此时上述方法有一个问题，即当原对象中有数组时便会出错

```js
//当原对象为：
let exp_1 = {
	name: 'exp_1',
	data: {
		m: 123,
		n: 'ABC',
	},
	arr: ['a'],
};

function copy(object) {
	let res = {};
	for (const key in object) {
		res[key] = typeof object[key] == 'object' ? copy(object[key]) : object[key];
	}
	return res;
}

let exp_3 = copy(exp_1);
exp_3.name = 'exp_3';
exp_3.data.m = 456;
console.log(exp_3); //{ name: 'exp_3', data: { m: 456, n: 'ABC' }, arr: { '0': 'a' } }
console.log(exp_1); //{ name: 'exp_1', data: { m: 123, n: 'ABC' }, arr: [ 'a' ] }
```

- 此时，发现 exp_3 中的 arr 变成了对象，而非数组，所以需要改造 copy 函数

```js
//改造copy函数
function copy(object) {
	let res = object instanceof Array ? [] : {};
	for (const [k, v] of Object.entries(object)) {
		res[k] = typeof v == 'object' ? copy(v) : v;
	}
	return res;
}

let exp_3 = copy(exp_1);
exp_3.name = 'exp_3';
exp_3.data.m = 456;
exp_3.arr.push('b');
console.log(exp_3); //{ name: 'exp_3', data: { m: 456, n: 'ABC' }, arr: [ 'a', 'b' ] }
console.log(exp_1); //{ name: 'exp_1', data: { m: 123, n: 'ABC' }, arr: [ 'a' ] }
```

笨办法

```js
function copy(obj) {
	if (typeof obj !== 'object' || typeof obj == 'null') {
		return obj;
	}

	let result = obj instanceof Array ? [] : {};

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			result[key] = copy(obj[key]);
		}
	}

	return result;
}
```

> **总结：** 深拷贝不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次递归复制到新对象上，所以对新对象的修改并不会影响原对象。
