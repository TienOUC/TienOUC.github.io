---
autoGroup-1: 布局类组件
title: Dialog
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

| 参数名  | 参数描述                            | 参数类型 | 默认值 |
| ------- | :---------------------------------- | :------- | :----- |
| title   | 对话框标题                          | String   | 提示   |
| width   | 宽度                                | String   | 50%    |
| top     | 与顶部的距离                        | String   | 15vh   |
| visible | 是否显示 dialog（支持 sync 修饰符） | Boolean  | false  |

## 2. 事件支持

| 事件名 | 事件描述       |
| ------ | :------------- |
| opened | 模态框显示事件 |
| closed | 模态框关闭事件 |

## 3. 插槽说明

| 插槽名称 | 插槽描述            |
| -------- | :------------------ |
| default  | dialog 的内容       |
| title    | dialog 的标题       |
| footer   | dialog 的底部操作区 |

## 4. 基础用法

<br>
<Dialog/>

::: details 点击查看代码
<<< @/docs/.vuepress/components/Dialog.vue
:::
