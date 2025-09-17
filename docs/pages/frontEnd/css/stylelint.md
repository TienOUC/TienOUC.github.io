---
autoGroup-4: 图形绘制
title: Stylelint
isTimeLine: true
date: 2021-12-12
categories:
  - FrontEnd
tags:
  - CSS
---

JS 代码有 `ESLint` 等格式化工具来校验、格式化，相对的，CSS 也有格式化工具。本文就主流 CSS 格式化工具 `Stylelint` 以及我们为什么要做 CSS 样式格式化略作介绍。

### 1. 为什么 CSS 也要做格式化

- **目的：**

减少浏览器 Reflow（回流），提升渲染 DOM 的性能。

- **浏览器渲染流程：**

> 1. 解析 html、css，构建 dom、css 树。
> 2. 合并 dom、css 树为 render 树。
> 3. 布局 render 树：有了 render 树，浏览器已经知道哪些网页中有哪些节点，各个节点的 css 定义和以及它们的从属关系，从而计算出每个节点在屏幕中的位置。
> 4. 绘制 render 树：按照计算出来的规则，通过显卡把内容绘制到屏幕上。

css 样式从解析到显示在屏幕上发生在上述 2、3、4 步骤中，浏览器并不是一获取到 css 样式就立马开始解析，而是根据 css 样式的书写顺序将之按照 dom 树的结构分布 render 样式，完成第 2 步，然后开始遍历每个树结点的 css 样式进行解析，此时的 css 样式的遍历顺序完全是按照之前的书写顺序。在解析过程中，一旦浏览器发现某个元素的定位变化影响布局，则需要倒回去重新渲染。例如如下的样式书写书序：

```css
width: 100px;
height: 100px;
background-color: red;
position: absolute;
```

当浏览器解析到 position 的时候突然发现该元素是绝对定位元素，需要脱离文档流，而之前却是按照普通元素进行解析的，所以不得不重新渲染（此时发生 Reflow，Reflow 又会导致 Repaint），解除该元素在文档中所占位置，然而由于该元素的占位发生变化，其他元素也可能会受到它回流的影响而重新排位。最终导致 3 步骤花费的时间太久而影响到 4 步骤的显示，影响了用户体验。

**所以 css 的书写顺序对于渲染引擎的性能也是很重要的。**

⚠️ 注意：

> 1. render 树的结构不等同于 dom 树的结构，一些设置 `display:none` 的节点不会被放在 render 树中，但会在 dom 树中。
> 2. 有些情况，比如修改了元素的样式，浏览器并不会立刻 reflow 或 repaint，而是把这些操作积攒一批，然后做一次 reflow，这也叫做异步 reflow。但在某些情况下，比如改变窗口，改变页面默认的字体等，浏览器会马上进行 reflow。
> 3. 为了更好的用户体验，渲染引擎会尽可能早的将内容呈现到屏幕上，并不会等到所有的 html 都解析完成之后再去构建和布局 render 树。而是解析完一部分内容就显示一部分内容，同时，可能还在通过网络下载其余内容。

### 2. CSS 书写规则

书写顺序：

> - 位置属性(position, top, right, z-index, display, float 等)
> - 大小(width, height, padding, margin)
> - 文字系列(font, line-height, letter-spacing, color- text-align 等)
> - 背景(background, border 等)
> - 其他(animation, transition 等)

语法：

> - 命名一般为小写英文字母。
> - 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
> - 每条声明语句的 `:` 后应该插入一个空格。
> - 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，代码可能更易出错。
> - 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如: .5 代替 0.5；-.5px 代替 -0.5px）。
> - 十六进制值应该全部小写，例如: #fff。
> - 尽量使用简写形式的十六进制值，例如: 用 #fff 代替 #ffffff。
> - 避免为 0 值指定单位，例如: 用 margin: 0; 代替 margin: 0px;。

### 3. Stylelint

#### 3.1 优点

- 其支持 `Less`、`Sass` 这类预处理器。
- 在社区活跃度上，有非常多的 第三方插件。
- 在 `Facebook`，`Github`，`WordPress` 等公司得到实践，能够覆盖很多场景。

#### 3.2 使用

- 安装依赖

`npm install stylelint stylelint-config-recess-order stylelint-config-standard stylelint-order stylelint-scss`

`stylelint-scss`

> scss 拓展，增加支持 scss 语法

`stylelint-order`

> 该插件的作用是强制你按照某个顺序编写 css。例如先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性。这样可以极大的保证我们代码的可读性。

`stylelint-config-standard`

> 作用：配置 Stylelint 规则。
> 官方的代码风格 ：stylelint-config-standard。该风格是 Stylelint 的维护者汲取了 GitHub、Google、Airbnb 多家之长生成的。

`stylelint-config-recess-order`

> stylelint-order 插件的第三方配置

- 配置 `.stylelintrc.json` 文件

> 在 package.json 中的 stylelint 属性指定规则。  
> 在.stylelintrc 文件中指定，文件格式可以是 JSON 或者 YAML。也可以给该文件加后缀，如：.stylelintrc.json,.stylelintrc.yaml,.stylelintrc.yml,.stylelintrc.js。  
> stylelint.config.js 文件，该文件 exports 一个配置对象。

**按顺序查找，以上三种方式任何一项有值，就会结束查找**

在项目根目录新建`.stylelintrc.json` 文件，复制以下内容

```js
module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
	rules: {
		//"at-rule-no-unknown" 让 Stylelint 支持 SCSS 语法中的 mixin、extend、content 语法。
		"at-rule-no-unknown": [
			true,
			{ ignoreAtRules: ["mixin", "extend", "content", "include"] },
		],
		indentation: 4,
		"no-descending-specificity": null, // 禁止特异性较低的选择器在特异性较高的选择器之后重写
	},
};
```

**rules 优先级大于 extends，建议采用 extends 方式统一管理**

片段禁用规则

```css
/* stylelint-disable */
/* （请说明禁止检测的理由）前端组件限制类名 */
.cropper_topContainer .img-preview {
	border: 0 none;
}
/* stylelint-enable */
```

fix 方式

`stylelint --fix` 更多语法规则请参考:[stylelint.io](https://stylelint.io/user-guide/usage/cli)

- vscode 插件

安装 `stylelint-plus`、`Vetur`、`Beautify` 插件

```json
"stylelint.autoFixOnSave": true,  // 保存自动格式化
"vetur.format.defaultFormatter.html": "js-beautify-html",  // 格式化模板
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_attributes": "force-aligned",  // 第一个属性后开始折行，并对齐
},
```

`ctrl/cmd + s` 自动修复
