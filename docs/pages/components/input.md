---
autoGroup-1: 布局类组件
title: Input
date: 2020-02-28
categories:
- FrontEnd
tags:
- Vue
- Components
---
:::tip
 :link: [ ti-ui-self ](https://www.npmjs.com/package/ti-ui-self)
:::
<!-- more -->
## 1. 参数

|参数名称 |参数描述 |参数类型 |默认值|
|---------------|:-------------------------|:-----------|-----|
|placeholder |占位符 |String |null|
|type |文本框类型（text/password） |String |text|
|disabled |禁用 |Boolean |false|
|clearable |是否显示清空按钮 |Boolean |false|
|show-password |是否显示密码切换按钮 |Boolean |false|
|name |name 属性 |String |null|

## 2. 事件支持：
|事件名称|事件描述|
|------|--------|
|blur |失去焦点事件|
|change|内容改变事件|
|focus|获取焦点事件|

## 3. 基础用法

**3.1 用户名输入**

<br>
<Input-name/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Input-name.vue
:::

**3.2 密码输入**

<br>
<Input-pwd/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Input-pwd.vue
:::


**3.3 禁止输入**

<br>
<Input-forbidden/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Input-forbidden.vue
:::
