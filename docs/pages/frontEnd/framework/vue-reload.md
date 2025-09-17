---
autoGroup-1: Vue
title: Vue刷新页面的三种方式
date: 2021-02-01
categories:
  - FrontEnd
tags:
  - Framework
  - Vue
---

### 1. 原始方法

`location.reload()；`

### 2. Vue 自带的路由跳转

`this.$router.go(0);`

以上两种刷新方法会造成页面短暂闪烁，交互体验不好，所以可以采用下面的方法控制`router-view`的显示与否

### 3. 注册全局方法

在 APP 里注册如下方法

```js
<template>
    <div id="app">
    	<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>
<script>
    export default {
        name: 'App',
        provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
            return {
                reload: this.reload
            }
        },
        data() {
            return{
                isRouterAlive: true          //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                })
            }
        }
    }
</script>
```

然后在需要刷新的页面组件中`inject`注入并调用

```js
export default {
    inject:['reload'],          //注入App里的reload方法
    data () {
        return {
    	.......
        }
    },
    methods: reloadFn(){       //   需要刷新的的代码块中调用reload方法
        this.reload();
    }
```
