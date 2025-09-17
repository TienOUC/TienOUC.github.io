---
autoGroup-1: Vue
title: Vue重要知识点
date: 2020-08-03
# sticky: 2
categories: 
- FrontEnd
tags:
- Framework
- Vue
---

## 1. v-for key 值的作用

在列表渲染中快速且准确地找到与 `newVnode` 相对应的 `oldVnode` ，提升 `diff` 效率

## 2. v-if & v-show

- 相同点

  > 都是动态控制 DOM 元素的显示和隐藏

- 区别
  > 1. v-if 是动态向 DOM 树内添加或删除 DOM 元素； v-show 是通过设置 DOM 元素的 diplay 属性来控制显隐
  > 2. v-if 只有在初始条件为 true 时才会编译； v-show 则不受初始条件限制，都会编译
  > 3. v-if 有更高的切换消耗； v-show 有更高的初始渲染消耗
  > 4. v-if 适合条件不太变化的场景； v-show 适合频繁切换的场景

## 3. slot 插槽

<!-- + 插槽的本质是一个返回Vnode的函数
+ 普通插槽和作用域插槽没有区别，因为普通插槽是作用域插槽的子集

:link: [知乎](https://www.zhihu.com/question/37548226/answer/609289491) -->

- 具名插槽
  在向具名插槽提供内容时候，可以在一个 `template` 元素上使用 `v-slot` 指令的参数的形式提供名称

```html
<div id="app">
  <base-layout>
    <template v-slot:header>
      <h1>This is header</h1>
    </template>

    <div>
      <p>This is main content</p>
      <button>Submit</button>
    </div>

    <template v-slot:footer>
      <h2>Footer</h2>
      <p>This is footer!!!</p>
    </template>
  </base-layout>
</div>
```

```js
Vue.component('base-layout', {
  data: function() {
    return {}
  },
  template: ` 
            <div class="container">
              <header>
                <slot name="header"></slot>  
              </header>
              <main>
                <slot></slot>  
              </main>
              <footer>
                <slot name="footer"></slot>  
              </footer>
            </div>
          `,
})

var app = new Vue({
  el: '#app',
  data: {},
})
```

- 作用域插槽
  内部工作原理是将插槽内容包裹在一个拥有单个参数的函数里

```js
function (slotProps) {
  // 插槽内容
}
```

```html
<div id="app">
  <user-info>
    <template v-slot:default="slotProp">
      <span>{{ slotProp.user.firstName }}</span>
    </template>
  </user-info>
</div>
<!--张-->
```

```js
Vue.component('user-info', {
  data: function() {
    return {
      user: {
        firstName: '张',
        lastName: '三',
      },
    }
  },
  template: `
          <div>
            <!--后备内容-->
            <slot v-bind:user='user'>{{ user.lastName }}</slot>  
          </div>
        `,
})
var app = new Vue({
  el: '#app',
  data: {},
})
```

## 4. keep-alive

`<keep-alive>` 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

## 5. 如何获取 dom

`ref="domName"` 用法：`this.$refs.domName`

## 6. vue 命令

- 循环， `v-for`
- 只绑定一次，`v-once`
- 绑定数据，`v-bind:字段名` 缩写 `:`
- 动作监听 ，`v-on:动作` 缩写 `@`
- 双向数据绑定，`v-model="绑定"` 缩写`:model`

一般数据相关缩写 `:` 动作相关 缩写 `@`

## 7. v-model 的本质

v-model 用于表单数据的双向绑定，是一个语法糖，包含了两个操作：

- `v-bind` 绑定一个 `value` 属性
- `v-on` 指令给当前元素绑定 `input` 事件

## 8. vue.cli & vue 工程目录

- assets 文件夹是放静态资源
- components 是放组件
- router 是定义路由相关的配置
- app.vue 是一个应用主组件
- main.js 是入口文件

vue-cli 目录  
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjo5cbbf6qj30rs0ms3zp.jpg)

vue 工程目录  
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gjo5cbz94rj30rs0l241c.jpg)

## 9. 自定义指令

除了内置指令之外， Vue 也允许注册自定义指令。

### 9.1 全局和局部注册

下例是注册一个全局指令 `v-focus`, 该指令的功能是在页面加载时，元素获得焦点：

```html
<div id="app">
  <p>页面载入时，input 元素自动获取焦点：</p>
  <input v-focus />
</div>
<script>
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el) {
      // 聚焦元素
      el.focus()
    },
  })
  // 创建根实例
  new Vue({
    el: '#app',
  })
</script>
```

也可以在实例使用 `directives` 选项来注册局部指令，这样该指令只能在这个实例中使用：

```html
<div id="app">
  <p>页面载入时，input 元素自动获取焦点：</p>
  <input v-focus />
</div>

<script>
  // 创建根实例
  new Vue({
    el: '#app',
    directives: {
      // 注册一个局部的自定义指令 v-focus
      focus: {
        // 指令的定义
        inserted: function(el) {
          // 聚焦元素
          el.focus()
        },
      },
    },
  })
</script>
```

### 9.2 指令自定义对象可选钩子函数

- `bind`: 指令第一次绑定到元素时调用（在这里可以进行一次初始化设置），只能调用一次。
- `inserted`: 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）。
- `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生来改变，也可能没有。
- `componentUpdate`: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`: 指令与元素解绑时调用，只调用一次。

## 10. ref & \$refs

原生 js 获取 DOM `document.getElementById("id")`  
jQuery 获取 DOM `$("#id").text('xxx')`  
但在 Vue 中可以用 `ref` 给元素（或子组件）注册引用信息，该引用信息将会注册在父组件的 `$refs` 对象上。如果在普通的 DOM 元素上使用，引用指向的是 DOM 元素，如果用在子组件上，引用指向的是组件实例。

```html
<body>
  <div id="app">
    <!-- 给两个子组件分别注册 ref -->
    <head-demo ref="hd"></head-demo>
    <foot-demo ref="fo"></foot-demo>
    <!-- 给p元素注册 ref -->
    <p ref="paragraph">This is a paragraph</p>
    <button @click="getChildComponentData">获取子组件的data</button>
  </div>
  <script>
    Vue.component('head-demo', {
      data: function() {
        return {
          msg: 'This is Header!',
          arr: [1, 2, 3],
        }
      },
      template: `
            <div>
                <header>{{msg}}</header>
            </div>
        `,
    })

    Vue.component('foot-demo', {
      data: function() {
        return {
          msg: 'This is Footer!',
          list: [
            { name: 'JavaScript', price: 200 },
            { name: 'Vue', price: 200 },
          ],
        }
      },
      template: `
            <div>
                <footer>{{ msg }}</footer>
            </div>
          `,
    })

    var app = new Vue({
      el: '#app',
      data: {},
      methods: {
        getChildComponentData: function() {
          // 通过 this.$refs.[refName] 来访问子组件实例（或者元素）            console.log(this.$refs.hd.arr[1])
          var res = this.$refs.fo.list
          var result = res.map((item, index) => {
            return `${item.name}-${item.price}¥`
          })
          // alert(result)
          console.log(result)
          console.log(`这是p标签的内容: ${this.$refs.paragraph.textContent}`)
        },
      },
      // mounted: function () {
      //   console.log(this.$refs.hd.arr[1])
      //   console.log(this.$refs.fo.list[0].price)
      // },
    })
  </script>
</body>
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1glb48we850j30m80dwgmv.jpg)

上述例子中父组件可以通过 `this.$refs.[refName].data` 来访问子组件实例的 data，对于获取 DOM 节点 `<p></p>`，显然 `this.$refs.[refName]` 要比原生的 `document.getElementById('#id')` 要更简单方便（不用给 p 标签加 id，获取时的写法也更简洁·）。

## 11. $nextTick()

在下一次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用这个方法，立即更新 DOM。这么听起来有点拗口，简单理解就是可以把 `$nextTick` 当成一个异步执行函数，主要目的就是把要执行的操作放到下一个执行周期中，例如下面示例二中的 showTextFn 打印步骤是在整个执行周期完成后才会执行此处的逻辑，这样就避免来多次触发 watcher 以及触发了多个 watcher 更新造成的重复渲染问题

```html
<body>
  <div id="app">
    <div v-if="showText" ref="text">这是隐藏内容</div>
    <button @click="showTextFn">点击查看隐藏内容</button>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        showText: false,
      },
      methods: {
        showTextFn: function() {
          this.showText = true
          console.log(
            `$nextTick在DOM更新后立即输出: ${this.$refs.text.textContent}`
          )
        },
      },
    })
  </script>
</body>
```

输出：  
![](https://tva1.sinaimg.cn/large/0081Kckwly1glc6un2okxg30m80e7jtk.gif)  
因为 Vue 实现响应并不是数据发生变化后 Dom 立即变化，而是按照一定的策略来进行 Dom 更新，即异步队列更新。

```html
<body>
  <div id="app">
    <div v-if="showText" ref="text">这是隐藏内容</div>
    <button @click="showTextFn">点击查看隐藏内容</button>
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        showText: false,
      },
      methods: {
        showTextFn: function() {
          this.showText = true
          this.$nextTick(function() {
            console.log(
              `$nextTick在DOM更新后立即输出: ${this.$refs.text.textContent}`
            )
          })
        },
      },
    })
  </script>
</body>
```

输出：  
![](https://tva1.sinaimg.cn/large/0081Kckwly1glc7045ihwg30m80enmzn.gif)

## 12. watch 和 computed 的区别

### 12.1 watch
- **简单数据监听**
```html
<body>
  <div id="app">
    <input type="text" v-model="num" />
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        num: 1
      },
      // 简单数据监听
      watch: {
        // 监听 num 属性的数据变化
        // 作用： 只要 num 的值发生变化，这个方法就会被调用
        // newVal： 新值   oldVal：旧值
        num: function (newVal, oldVal) {
          console.log(`oldVal-${oldVal}`)
          console.log(`newVal-${newVal}`)
        },
      }
    )}
  </script>
</body>
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1glebfcikylg30m80f4jt8.gif)

- **imediate参数，进入页面时立即执行watch里的handler**   
```html
<body>
  <div id="app">
    <input type="text" v-model="num" />
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        num: 1
      },
      // immediate （立即处理，即进入页面就触发）
      watch: {
        num: {
            // num 值变化时调用 handler
          handler(newVal, oldVal) {
            console.log(`oldVal-${oldVal}`)
            console.log(`newVal-${newVal}`)
          },
          // 进入页面立即触发执行参数 immediate
          immediate: true
        },
      },
    )}
  </script>
</body>
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1glebkndk6dg30m80b6gqj.gif)

- **deep参数监听整个对象**
```html
<body>
  <div id="app">
    <span>{{ food.name }}</span>
    <input type="button" value="更改名字" @click="change" />
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        food: {
          id: 1,
          name: '蚂蚁上树',
        },
      },
      methods: {
        change() {
          this.food.name = '金玉满堂'
        },
      },
      watch: {
        // 第一种方式：监听整个对象，每个属性值的变化都会执行 handler
        // 注意： 属性值发生变化后， handler 执行后获取的 newVal 和 oldVal 值是一样的
          food: {
            handler(newVal, oldVal) {
              console.log(`oldVal-${oldVal.name}`)  // oldVal-金玉满堂
              console.log(`newVal-${newVal.name}`)  // newVal-金玉满堂
            },
            // immediate: true,
            deep: true,   //  不配置deep参数时 handler 不执行
          },
        }
    )}
  </script>
</body>
```
- **监听对象的某一个属性**  
```html
<body>
  <div id="app">
    <span>{{ food.name }}</span>
    <input type="button" value="更改名字" @click="change" />
  </div>
  <script>
    var app = new Vue({
      el: '#app',
      data: {
        food: {
          id: 1,
          name: '蚂蚁上树',
        },
      },
      methods: {
        change() {
          this.food.name = '金玉满堂'
        },
      },
      watch: {
        // 第二种监听方式： 监听对象的某个属性，被监听的属性值发生变化就会执行函数
        // 注意：函数执行后，获取的 newVal 和 oldVal 值不一样
        'food.name':function(newVal, oldVal) {
          console.log(`oldVal-${oldVal}`) // oldVal-蚂蚁上树
          console.log(`newVal-${newVal}`) // newVal-金玉满堂
        },
      },
    )}
  </script>
</body>
```
### 12.2 computed
用法略

**两者区别：**

> watch： 用于观察和监听页面上的 vue 实例， 当需要在数据变化响应时，执行异步操作，或者高性能消耗的操作。  

> computed：不支持异步操作，可以关联多个实例计算的对象，当这些对象中的其中一个改变时都会触发这个属性； 具有缓存能力，所以只有当数据再次改变时才会重新渲染，否则就会直接拿取缓存中的数据。

<!-- + computed
> 支持缓存，只有依赖的数据发生改变时，才会重新进行计算，否则直接返回缓存的上次计算值。   
> 不支持异步，其内部有异步操作时无效，无法监听数据的变化。   
> 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed。   
> 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

+ watch
> 不支持缓存，数据变化直接会触发相应的操作。
> 支持异步。
> 监听的函数接受两个参数，第一个时最新的值，第二个时输入之前的值。
> 监听数据必须时 data 中声明的或者父组件传递的 props，当数据变化时，触发其他操作，函数有两个参数，`immediate`：组件加载立即触发回调函数执行，　`deep`: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做，deep无法监听到数组的变动和对象的新增，参考vue数组变异，只有以响应式的方式触发才会被监听到。 -->
