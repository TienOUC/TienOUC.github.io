---
autoGroup-1: Vue
title: Vue-Router
date: 2020-08-03
categories: 
- FrontEnd
tags:
- Framework
- Vue
---
## 1. 静态路由
```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <!-- 通过 router-link 来导航，to 属性指定链接，router-link默认渲染成 <a> 标签 -->
          <router-link to='/'>Header</router-link>
          <router-link to='/about'>Container</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```

```js
// 1. 定义路由组件 或者 import
const Header = { template: `<div>Header</div>` }
const Container = { template: `<div>Container</div>` }

// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 
// 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/',
        component: Header
    },
    {
        path: '/about',
        component: Container
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1giaafk04whj30xc0l9aby.jpg)   
## 2. 动态路由
### 2.1 动态路径参数
+ Dynamic segment
一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用，也可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：

|模式|	匹配路径|	$route.params|
| ---- | :--- | --- |
|/user/:username	|/user/evan|	{ username: 'evan' }|
|/user/:username/post/:post_id|	/user/evan/post/123	|{ username: 'evan', post_id: '123' }|

```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <!-- 通过 router-link 来导航，to 属性指定链接，router-link默认渲染成 <a> 标签 -->
          <router-link to='/user/user_1'>user_1</router-link>
          <router-link to='/user/user_2'>user_2</router-link>
          <router-link to='/user/evan/post/123'>多端路径参数</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```
```js
// 1. 定义路由组件 或者 import
const User = { template: `<div>this is {{$route.params.name}}</div>` }
const userPost = { template: `
    <div>The name is {{$route.params.name}}, and the post_id is {{$route.params.post_id}}</div>
` }
// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 
// 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/user/:name',
        component: User
    },
    {
        path: '/user/:name/post/:post_id',
        component: userPost
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1giabcrj32mj30xc0l9tar.jpg)

### 2.2 Query String
```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <router-link to='/user/evan/post/123'>多端路径参数</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```
```js
// 1. 定义路由组件 或者 import
const userPost = { template: `
    <div>
        The name is {{$route.params.name}}, and the post_id is {{$route.params.post_id}}, the age is {{$route.query.age}}
    </div>
` }
// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 
// 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/user/:name/post/:post_id',
        component: userPost
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1giad6zv1r5j30xc0kwdh8.jpg)
## 3. 子路由
```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <!-- 通过 router-link 来导航，to 属性指定链接，router-link默认渲染成 <a> 标签 -->
          <router-link to='/user/user_test'>user</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```

```js
// 1. 定义路由组件 或者 import
const User = {
    template: `
        <div>
            this is {{$route.params.name}}'s
            <router-link :to=" '/user/' + $route.params.name + '/more' ">More info</router-link>
            <router-view></router-view>
        </div>
` }

// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/user/:name',
        component: User,
        children: [
            {
                path: 'more',
                component: {
                    template: `
                    <p>{{$route.params.name}} 的详细信息：Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, earum.</p>
                `
                }
            }
        ]
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gib6353k3hj30xc0l9abr.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gib63hb9p2j30xc0l9wga.jpg)
## 4. 导航守卫
### 4.1 登陆举例
```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <!-- 通过 router-link 来导航，to 属性指定链接，router-link默认渲染成 <a> 标签 -->
          <router-link to='/about'>Container</router-link>  
          <router-link to='/login'>login</router-link>
          <router-link to='/post'>post</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```
```js
// 1. 定义路由组件 或者 import
const About = { template: `<div>This is Container page</div>` }
const Login = { template: `<div>Login</div> ` }
const Post = { template: `<div>Post</div>`}

// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/about',
        component: About
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/post',
        component: Post
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => { 
    var login_in = false 
    if(!login_in && to.path=='/post')
        next('/login')
    else
        next()
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
## 5. 元数据和路由匹配
以上登陆示例中是通过 ` to.path=='/post' `判断路由来控制访问，当路由很多时这种办法就不合理了，此时，可以用元数据匹配来解决
```html
  <body>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
    <div id="app">
      <h1>Hello Vue-Router</h1>
        <div>
          <!-- 通过 router-link 来导航，to 属性指定链接，router-link默认渲染成 <a> 标签 -->
          <router-link to='/about'>Container</router-link>  
          <router-link to='/login'>login</router-link>
          <router-link to='/post'>post</router-link>
        </div>
        <!-- 路由出口，路由匹配的组件将渲染在这里 -->
      <router-view></router-view>
    </div>
    <script src="js/app.js"></script>
  </body>
```
```js
// 1. 定义路由组件 或者 import
const Main = { template: `<div>This is Header page</div>` }
const About = { template: `<div>This is Container page</div>` }
const Login = { template: `<div>Login</div> ` }
const Post = {
    template: `
        <div>
            <div>Post</div>
            <router-link to='content' append>post-content</router-link>
            <router-view></router-view>
        </div>
`}
// 2. 定义路由： 每个路由映射一个组件，其中 component 可以是通过 Vue.extend() 创建的组件构造器，或者只是一个组件配置对象
const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/post',
        meta: {
            longin_required: true    // 👈 meta属性
        },
        component: Post,
        children: [
            {
                path: 'content',
                component: {
                    template: `
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
                    `
                }
            }
        ]
    }
]

// 3. 创建 router 实例，传入 routes 配置
const router = new VueRouter({
    routes: routes
})

// 元数据匹配
router.beforeEach((to, from, next) => { 
    var login_in = false 
    if (!login_in && to.matched.some(item => { 
        return item.meta.longin_required
    }))
        next('/login')
    else
        next()
})

// 4. 创建挂载根实例，记得要通过 router 配置参数注入路由，从而让整个应用都有路由功能
new Vue({
    el: '#app',
    router: router
})
```
