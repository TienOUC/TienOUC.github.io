---
autoGroup-1: 布局类组件
title: Button
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

| 参数名   | 参数描述                                        | 参数类型 | 默认值  |
| -------- | :---------------------------------------------- | :------- | :------ |
| type     | 按钮类型（primary/success/warning/danger/info） | String   | default |
| plain    | 朴素按钮                                        | Boolean  | false   |
| round    | 圆角按钮                                        | Boolean  | false   |
| circle   | 圆形按钮                                        | Boolean  | false   |
| icon     | 图标类名                                        | String   | null    |
| disabled | 禁用属性                                        | Boolean  | false   |

## 2. 事件支持

| 事件名 | 事件描述 |
| ------ | -------- |
| click  | 点击事件 |

## 3. 基础用法

**3.1 默认按钮**

<br>
<Button-default/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-default.vue
:::

<hr>

**3.2 简单按钮**

<br>
<Button-plain/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-plain.vue
:::

<hr>

**3.3 圆角按钮**

<br>
<Button-round/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-round.vue
:::

<hr>

**3.4 字体按钮**

<br>
<Button-icon/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-icon.vue
:::

<hr>

**3.5 点击触发**

<br>
<Button-click/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-click.vue
:::

<hr>

**3.6 禁止点击**

<br>
<Button-forbiden/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Button-forbiden.vue
:::
