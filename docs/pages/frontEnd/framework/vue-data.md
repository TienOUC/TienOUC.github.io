---
autoGroup-1: Vue
title: Vue组件之间的传值
date: 2020-11-01
categories: 
- FrontEnd
tags:
- Framework
- Vue
---

## 1. 父组件向子组件传值

你可以给子组件传入一个静态的值：

```html
<blog-post title="My journey with Vue"> </blog-post>
```

但我们一般都是需要传动态的值，所以需要 v-bind 绑定：

```html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"> </blog-post>
<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + 'by' + post.author.name"></blog-post>
```

当然，你传的值可以是数字、对象、数组等等，参见 [ Vue ](https://cn.vuejs.org/) 官网。

组件实例的作用域是孤立的；

子组件要显式的用 `props` 选项声明它预期的数据，如：

```js
// 某个子组件中：
export default {
  props: {
    title: {
      type: String,
      default: 'hello world',
    },
  },
}
```

然后就可以在页面中使用了，具体我们在项目中体现。

以上就是单向数据流的一般表现了： **父级 prop 的更新会向下流动到子组件中，但是反过来则不行。**

## 2. 子组件向父组件传值

### 2.1 基本概念

在 Vue 中，父子组件的关系可以总结为`prop`向下传递，事件向上传递。父组件通过`prop`给子组件下发数据，子组件通过`事件`给父组件发送信息。

![](https://tva1.sinaimg.cn/large/006y8mN6ly1g8ogedzh3aj306u06smx0.jpg)

`props down` , `events up`
每个 Vue 实例都实现了事件接口：使用`$on(evntName)`监听事件；使用`$emit(eventName,optionalPayload)`触发事件。另外，父组件可以在使用子组件的地方直接用`v-on`来监听子组件触发的事件。

### 2.2 举例说明

- 父组件在组件上定义了一个自定义事件`childFn`，事件名为`parentFn`用于接受子组件传过来的`message`值。

```vue
<!-- 父组件 -->
<template>
  <div class="test">
    <test-com @childFn="parentFn"></test-com>
    <br />
    子组件传来的值 : {{ message }}
  </div>
</template>

<script>
export default {
  // ...
  data: {
    message: '',
  },
  methods: {
    parentFn(payload) {
      this.message = payload
    },
  },
}
</script>
```

- 子组件是一个`buttton`按钮，并为其添加了一个`click`事件，当点击的时候使用`$emit()`触发事件，把`message`传给父组件。

```vue
<!-- 子组件 -->
<template>
  <div class="testCom">
    <input type="text" v-model="message" />
    <button @click="click">Send</button>
  </div>
</template>
<script>
export default {
  // ...
  data() {
    return {
      // 默认
      message: '我是来自子组件的消息',
    }
  },
  methods: {
    click() {
      this.$emit('childFn', this.message)
    },
  },
}
</script>
```

这样我们就实现了子组件向父组件传值。

## 3. 兄弟组件之间传值

简单来说就是用一个新的vue实例（不是当前实例）来做媒介（bus），在需要互相通信的兄弟组件中都引入 bus，然后通过分别调用 bus 触发 `$emit `和监听 `$on` 来实现通信和参数传递，个人理解为类似 window 的全局自定义事件或者子传父

- 数据传递方：通过一个事件触发 `bus.$emit(方法名, 传递的数据)`
- 数据接收方：通过`mounted(){}` 触发 `bus.$on(方法名, function( 接收数据的参数 ){ 接收传递过来的数据 } )` ⚠️ 此时函数中的 `this` 指向会改变，可以使用箭头函数

举例:
    
实例bus：
```js
// bus.js

import Vue from 'vue';
export default new Vue;
```

子组件 A：

```vue
// a.js

<template>
  <div class='a'></div>
</template>

<script>
import Bus from 'bus.js' ;
export default {
  name: "a",
  created() {
    // 在需要传递数据的时候调用sendData方法，这里模拟调用
    this.sendData();
  },
  methods: {
    sendData () {
      Bus.$emit('listenToA', 'hello');
    }
  }
}
</script>
```

子组件 B：

```vue
// b.js

<template>
  <div class='b'></div>
</template>

<script>
import Bus from 'bus.js';
export default {
  name: "b",
  mounted() {
    Bus.$on('listenToA', this.getAData);
  },
  methods: {
    getAData (val) {
      console.log(`a组件传递过来的数据: ${val}`); // hello
    }
  }
}
</script>
```
