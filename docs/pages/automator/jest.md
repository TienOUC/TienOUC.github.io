---
autoGroup-0: Framework
title: Jest
sidebarDepth: 2
date: 2021-04-21
categories:
- Automator
tags:
- Testing
- Framework
---

## 1. 简介

由 Facebook 开源的 JS 测试框架 ( 单元测试 ) ，集成了断言、覆盖率报告等工具，开箱即用。其用例并行执行，且只执行发生改变的文件对应的测试，所以性能较优。

## 2. 安装

- yarn 或者 npm 安装

```
# 项目内
yarn add --dev jest

# 或者全局安装，随时随地使用
yarn global add jest
```

- package.json 配置命令

```json
  "scripts": {
    "test": "jest",
    "nocahe": "jest --no-cache",        //清除缓存
    "watch": "jest --watchAll",         //实时监听
    "coverage": "jest --coverage",      //生成覆盖测试文档
    "verbose": "npx jest --verbose"     //显示测试描述
  }
```

## 3. 命名规范

- 待测试文件：`example.js`  
- 测试脚本文件：`example.test.js` 或 `example.spec.js`    
- 测试目录：`tests` 或 `__tests__`

## 4. 基本函数

### 4.1 测试函数

```js
test('测试用例描述', () => {
  // 断言函数
  exspect(运行结果).toBe(期望的结果);
});
```

### 4.2 断言函数

```js
exspect(运行结果).toBe(期望的结果);

//常见断言方法
expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } });
expect({ a: 1 }).toBe({ a: 1 }); //判断两个对象是否相等
expect(1).not.toBe(2); //判断不等
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(4.5); //大于等于4.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(6.5); //小于等于6.5
expect(value).toBeCloseTo(0.7); // 浮点数判断相等
expect('Christoph').toMatch(/stop/); //正则表达式判断
expect(['one', 'two']).toContain('one'); //不解释
```

### 4.3 分组函数

```js
    describe("某个功能或者单个组件的单元测试", ()={
        // 不同用例的单元测试
    })
```

## 5. 实测示例

- 待测试文件

```js
// js/example.js
const example = {
  sum: function (a, b) {
    return a + b;
  },

  checkObj: function (obj) {
    if (typeof obj !== 'object' || obj == null) {
      return obj;
    } else {
      return true;
    }
  },

  // 对象判断
  foo: function () {
    return (fooObj = {
      a: 1,
      b: 'foo',
    });
  },
  bar: function (params = {}) {
    const barObj = { name: 'bar' };
    for (const [key, value] of Object.entries(params)) {
      barObj[key] = value;
    }
    return barObj;
  },
};

module.exports = example;
```

- 测试脚本文件

```js
// tests/example.test.js
const example = require('../js/example.js');

test('adds 1 + 2 to equal 3', () => {
  expect(example.sum(1, 2)).toBe(3);
});

test('check obj equal object', () => {
  expect(example.checkObj(null)).toBe(null);
  expect(example.checkObj({})).toEqual(true);
  expect(example.checkObj('123')).toEqual('123');
  expect(example.checkObj(123)).toEqual(123);
  expect(example.checkObj('')).toEqual('');
});

test('正则表达式判断', () => {
  expect('Christoph').toMatch(/stop/);
});

test('元素是否包含于', () => {
  expect(['one', 'two']).toContain('one');
});

// 对象判断
describe('--对象测试--', () => {
  test('对象是否相等', () => {
    expect(example.foo()).toEqual({ a: 1, b: 'foo' });
  });

  test('对象是否可添加', () => {
    expect(example.bar({ age: 18 })).toEqual({ name: 'bar', age: 18 });
  });
});
```

- 执行输出

```
➜  Jest yarn test
yarn run v1.22.4
$ jest
 PASS  tests/example.test.js
  ✓ adds 1 + 2 to equal 3 (1 ms)
  ✓ check obj equal object (1 ms)
  ✓ 正则表达式判断 (1 ms)
  ✓ 元素是否包含于
  --对象测试--
    ✓ 对象是否相等 (1 ms)
    ✓ 对象是否可添加

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.175 s
Ran all test suites.
✨  Done in 2.13s.

// 覆盖率
➜  Jest yarn coverage
yarn run v1.22.4
$ jest --coverage
 PASS  tests/example.test.js
  ✓ adds 1 + 2 to equal 3 (1 ms)
  ✓ check obj equal object (1 ms)
  ✓ 正则表达式判断
  ✓ 元素是否包含于
  --对象测试--
    ✓ 对象是否相等 (1 ms)
    ✓ 对象是否可添加

------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|-------------------
All files   |     100 |       80 |     100 |     100 |
 example.js |     100 |       80 |     100 |     100 | 21
------------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.358 s
Ran all test suites.
✨  Done in 2.30s.
```



![](https://tva1.sinaimg.cn/large/008i3skNly1gprryjbbwij315a0qyq4a.jpg)

![](https://tva1.sinaimg.cn/large/008i3skNly1gprryl984wj315a0qy75p.jpg)
## 6.异步测试

异步脚本执行完，单元测试就结束了，如果需要断言结果需要延时等待，单元测试函数可设置 `done`形参，在定时回调中调用即可。

```js
describe('异步操作测试', () => {
  function foo(callback) {
    console.log('foo...');
    setTimeout(() => {
      callback && callback();
    }, 1000);
  }
  test('异步测试', (done) => {
    function bar() {
      console.log('bar..');
      done();
    }
    foo(bar);
  });
});
```

```
➜  Jest yarn test
yarn run v1.22.4
$ jest
  console.log
    foo...

      at foo (tests/example.test.js:37:17)

 PASS  tests/example.test.js
  异步操作测试
    ✓ 异步测试 (1028 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.024 s
Ran all test suites.
  console.log
    bar..

      at callback (tests/example.test.js:44:21)

✨  Done in 4.96s.
```

## 7.定时器

Jest 提供了两个方法 `jest.useFakeTimers`、 `jest.runAllTimers` 可以更优雅地进行异步延时测试。

```js
describe('定时器相关测试', () => {
    // 开启定时函数模拟
    jest.useFakeTimers()

    function foo(callback) {
        console.log('foo...')
        setTimeout(() => {
            callback && callback()
        }, 1000)
    }
    test('断言异步测试', () => {
        //创建mock函数，用于断言函数被执行或是执行次数的判断
        const callback = jest.fn()
        foo(callback)
        expect(callback).not.toBeCalled()
        //快进，使所有定时器回调
        jest.runAllTimers()
        expect(callback).toBeCalled()
    })
}
```

## 8.Dom 测试

实现 Dom 渲染测试，以及点击事件等等交互功能测试。

```js
describe('Dom测试', () => {
  test('测试按钮是否被渲染', () => {
    document.body.innerHTML = `
    <div>
        <button id='btn'>小按钮</button>
    </div> `;
    console.log(
      document.getElementById('btn'),
      document.getElementById('btn').toString()
    );
    expect(document.getElementById('btn')).not.toBeNull();
    expect(document.getElementById('btn').toString()).toBe(
      '[object HTMLButtonElement]'
    );
  });

  test('测试点击事件', () => {
    const onclick = jest.fn();
    document.body.innerHTML = `
        <div>
            <button id='btn'>小按钮</button>
        </div> `;
    const btn = document.getElementById('btn');
    expect(onclick).not.toBeCalled();
    btn.onclick = onclick;
    btn.click();
    expect(onclick).toBeCalled();
    expect(onclick).toHaveBeenCalledTimes(1);
    btn.click();
    btn.click();
    expect(onclick).toHaveBeenCalledTimes(3);
  });
});
```

## 9. Vue 引用

安装 unit-jest 依赖包 `vue add @vue/unit-jest`。

Vue 的渲染机制：默认情况下 Vue 会异步地批量执行更新（在下一轮 tick），以避免不必要的 DOM 重绘。

> **异步测试需要在 `nextTick()` 之后执行**

- mount 和 shallowMount

> mount： 挂载所有组件
> shallowMount：只挂载指定组件

### 9.1 组件渲染测试

```js
test('挂载Btn组件', () => {
  const wraper = shallowMount(Btn);
  const btn = wraper.find('button');
  expect(wraper.html()).toBe(`<button>BUTTON</button>`);
});
```

### 9.2 事件测试

```js
test('测试countBtn组件点击', (done) => {
  const wraper = shallowMount(CountBtn);
  const btn = wraper.find('button');
  expect(wraper.html()).toBe(`<button>点击次数0</button>`);
  btn.trigger('click');
  setTimeout(() => {
    expect(wraper.html()).toBe(`<button>点击次数1</button>`);
    done();
  }, 1000);
});

test('优雅的测试点击事件', async () => {
  const wraper = shallowMount(CountBtn);
  const btn = wraper.find('button');
  expect(wraper.html()).toBe(`<button>点击次数0</button>`);
  btn.trigger('click');
  await wraper.vm.$nextTick();
  expect(wraper.html()).toBe(`<button>点击次数1</button>`);
});
```

### 9.3 axios 异步请求测试

```vue
// User.vue
<template>
  <table>
    <tr v-for="item in list" :key="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.age }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.$http.get('/user').then(({ data }) => {
      this.list = data;
    });
  },
};
</script>
```

```js
// User.test.js
import { mount } from '@vue/test-utils';
import User from '@/components/User';

test('测试用户组件', async () => {
  const wrapper = mount(User, {
    mocks: {
      $http: {
        get: (url) =>
          Promise.resolve({
            data: [
              { id: 1, name: 'a', age: 18 },
              { id: 2, name: 'b', age: 20 },
            ],
          }),
      },
    },
  });

  // 渲染前
  expect(wrapper.html()).toBe('<table></table>');
  await wrapper.vm.$nextTick();

  // 渲染后
  expect(wrapper.findAll('tr').length).toBe(2);
  expect(wrapper.findAll('td').at(2).html()).toBe('<td>18</td>');
});
```
