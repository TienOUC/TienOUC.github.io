---
autoGroup-1: Vue
title: Vuex-全局状态管理
date: 2020-07-25
categories:  
- FrontEnd
tags:
- Framework
- Vue
---

:::tip
Vuex 是实现组件全局状态（数据）管理的机制，可以方便地实现组件之间传值。(适用于大数据共享或者数据频繁共享的场景)
:::

**⚠️注意：Vuex的缺点———数据不能持久化存储，每次刷新都会重置所有数据，这个问题可以配合 `computed` 属性与 `localStorage` 来解决，但简单的单页应用（SPA）不建议使用 Vuex，以避免繁琐冗余，一个简单的 store 模式就够用了。**
<!-- more -->

## **1. Vuex 概述**

**1.1 vue 组件之间共享数据的方式**

> 父向子传值： `v-bind` 属性绑定  
> 子向父传值： `v-on` 事件绑定  
> 兄弟组件之间传值：`EventBus` , 发送数据的组件`$emit` , 接受数据的组件 `$on`

**1.2 Vuex 是什么**  
Vuex 是实现组件全局状态（数据）管理的机制，可以方便地实现组件之间传值。(适用于大数据共享或者数据频繁共享的场景)

如下图所示，常规组件 A->B 传值，需要 A 逐级向上到根，再到 B，传值较为麻烦。而 VueX 可以把共享数据存储在 Store 中，A 直接存进 Store，B 再直接调用。

![](https://tva1.sinaimg.cn/large/00831rSTly1gde0pyam8gj30j80a50tx.jpg)

**1.3 Vuex 统一管理的优点**  
一般情况下，只有组建共享的数据才会存储在 Vuex Store 中，组件私有数据依然存在组件 data 中

> a. 能够在 VueX 中集中管理共享的数据，便于开发和维护  
> b. 能够高效地实现组件之间的传值，便于提高开发效率  
> c. 存储在 VueX 中的数据都是响应式的，能够实时保持数据和页面的同步

## **2. Vuex 核心概念**

**2.1 `State` 唯一的公共数据源，所有的数据都要统一放到 Store 的 state 中存储**

> 两种触发方式

- this.\$store.state.srcData

```vue
<template>
  <div>
    <h3>Addition: {{ this.$store.state.srcData }}</h3>
  </div>
</template>
```

- mapState

```js
a. 导入mapSate函数
import { mapState } from 'vuex'

b. //然后在组件的computed属性映射
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['srcData']),
  }
}

c. 最后在模板中直接引用映射结果
<template>
  <div>
    <h3>Subtraction:{{ srcData }}</h3>
  </div>
</template>
```

**2.2 `Mutations` 用于变更 Store 中的数据（mutation 不能执行异步操作），便于集中监控数据变化（因此不推荐在模板中直接用 \$store.state.数据名 进行修改）**

> 两种触发方式

- 组件 methods 中通过 this.\$store.commit('mutations 非异步操作函数名')

```js
a. store.js 中定义mutation
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    }
  })

b. 组件methods中触发
<template>
  <div>
    <button @click="handlerBtn1()">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handlerBtn1() {
      this.$store.commit('add')
    }
  }
}
</script>
```

- mapMutations

```js
a. store.js 中定义mutations
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    }
  })

b. 组件中引入mapMutations函数，然后在methods中触发
<template>
  <div>
    <button @click="handlerBtn1">-</button>
  </div>
</template>

<script>
import { mapMutations} from 'vuex'

export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['sub']),
    handlerBtn1() {
      this.sub()
    }
  }
}
</script>
```

**2.3 `Actions` 用于处理异步任务（如果要异步操作变更数据，必须通过 Action，而不能使用 Mutation， --⚠️重点： 但 Action 的本质还是通过触发 Mutation 的方式间接地变更数据，而不是直接变更状态--）**

> 两种触发方式

- this.\$store.dispatch('actions 异步函数名')

```js
a. store.js 定义actions
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations:{
     add(state) {
      state.count++
    }
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    }
  })

b. 组件methods中触发 this.$store.dispatch('addAsync')
<template>
  <div>
    <button @click="handlerBtn1()">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handlerBtn1() {
      this.$store.dispatch('addAsync')
    }
  }
}
</script>
```

- mapActions 函数

```js
a. store.js 定义actions
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations:{
     add(state) {
      state.count++
    }
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    }
  })

b. 组件引入mapActions函数，将需要的函数映射为组件的methods方法
<template>
  <div>
    <button @click="handlerBtn1">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
    methods: {
    ...mapActions(['addAsync'])
    handlerBtn1(){
      this.addAsync()
    }
  }
}
</script>
```

**2.4 `Getters` 用于对 Store 中的数据进行加工处理形成新的数据（不会修改 store 的数据，只起到包装的作用），Store 中数据变化时，Getter 的数据也会随之变化**

> 两种触发方式

- this.\$store.getters.函数名

```js
a. store.js中定义getters
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters:{
      show: (state) => {
      return '当前最新的数据:' + state.count
    }
  }
}

b. 组件中  this.$store.getters.函数  直接调用
<template>
  <div>
    <h4>{{this.$store.getters.show}}</h4>
  </div>
</template>

```

- mapGetters 函数

```js
a. store.js中定义getters
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters:{   //步骤一
      show: (state) => {
      return '当前最新的数据:' + state.count
    }
  }
}

b. 组件中引入mapGetters函数，把函数映射到组件的computed属性，然后模板中直接调用函数
<template>
  <div>
    <h4>{{show}}</h4>  //步骤四， 直接调用
  </div>
</template>

<script>
import { mapGetters } from 'vuex'  //步骤二
export default {
  data() {
    return {}
  },
  computed: {  //步骤三
    ...mapGetters(['show'])
  }
}
</script>

```

**2.5 Module**   
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。
