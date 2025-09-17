---
title: 盒子模型
date: 2019-12-28
categories:
- FrontEnd
tags:
- CSS
---
## 1. 盒子模型

Box-Model 四大元素：Content、Padding、Border、Margin   
:link:[ Box-Model ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)   

### 1.1 W3C盒模型（标准）
+ 标准盒模型的大小：是由 `content + padding + border` 三部分组成   
+ 标准盒模型占据的位置大小：是由 `content + padding + border + margin` 四部分组成      
> 通俗理解就是 content-box 是在原有的宽高上在外面继续附上 padding + border ，相当于固定框，再给外面糊上 padding 和 border  

举例：
```html
    <style>
    .div{
        box-sizing: content-box;
        width: 300px;
        height: 300px;
        background-color: #ff8c00;
        padding: 10px;
        border: #9932cc 10px solid;
        margin: 10px;
    }
    </style>

    <div>content-box</div>
    <!--
        逐次添加 padding: 10px; border: 10px; margin: 10px;
        后会发现，盒子的最终宽高是 content + padding + border 
     -->
```
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5hm2q4ugj30au0hiweh.jpg)
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5hhf4d54j30bm07s745.jpg)

### 1.2 IE盒模型（怪异）
+ IE盒模型的大小： `(缩小的content) + padding + border` 三部分组成
+ IE盒模型所占据的位置大小： `(缩小的content) + padding + border + margin` 四部分组成
> 通俗理解就是 border-box 会在原来的宽高上压缩 content ，相当于固定框，然后挤压框里的content 然后在框和 content 之间的间隙塞进去 padding 和 border
```html
    <style>
    .div{
        box-sizing: border-box;
        width: 300px;
        height: 300px;
        background-color: #ff8c00;
        padding: 10px;
        border: #9932cc 10px solid;
        margin: 10px;
    }
    </style>

    <div>border-box</div>
    <!--
        逐次添加 padding: 10px; border: 10px; margin: 10px;
        后会发现，盒子的最终宽高是 (content变小，260px)content + padding + border 
     -->
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5ho4adh7j30aj0gg0sp.jpg)
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5hn1u27pj30c207xa9x.jpg)

### 1.3 margin重叠
（margin collapse）
垂直方向的 margin 会发生重叠，都为正值时，取其中较大值，不全是正值时， ｜｜marginA｜ - ｜marginB｜｜，没有正值，则都取绝对值，然后用0减去最大值。

**怎么解决 margin collapse ?**
+ 兄弟元素   
> 1. 在两个 div 之间再加一个块级元素，设置其高度为 1px，背景色透明即可，此时上下外边距是各自 margin 值加 1px  (  :triangular_flag_on_post: 会多1px)  
> 2. 下面的元素设置 float: left;
> 3. 底部元素的 position: absolute;
> 4. 在设置 margin-top/bottom 值时统一只设置上或下

+ 父子元素
> 1. 父元素 overflow: hidden;
> 2. 父元素透明边框 border: 1px solid transparent;
> 3. 父元素设置 padding 
> 4. 子元素 position: absolute；
> 5. 子元素 float:left;

**另注：** 父子结构，若子元素的 margin-top 是负值，且其绝对值大于父元素的 margin-top，上述解决方案就又会发生很有意思的现象，可以手敲代码探索一下，但实际开发中没人这么布局，所以这里略过。

### 1.4 扩展
+ `inline` 元素设置 `margin` 和 `padding` 只有左右方向的外、内边距会发生改变，变垂直方向的布局不会改变，但需要注意的是上下 `padding` 会发生覆盖，上下 `margin` 则是不起作用。   
`inline` 元素设置成 `inline-block` 时`margin` 和 `padding` 四个方向就都会起作用。      


```html
    <div>
        <span>...<strong>...</strong>...</span>
    </div>
```
图一：
```css
strong {
    margin: 30px;
}
```
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5gefs2bpj30v00e9756.jpg)   
图二：
```css
strong {
   padding: 30px; 
   opacity: 0.8;
}
```
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5gefknoyj30v00e9dgr.jpg) 
图三： 
```css
strong {
    display: inline-block;
    padding: 30px;
}
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5gefd9hzj30ux0fsjsc.jpg)  
图四： 
```css
strong {
    display: inline-block;
    padding: 30px;
}
```
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5gef7veoj30ux0fsjsa.jpg)   
图五：
```css
strong {
    display: inline-block;
    padding: 30px;
    margin: 30px;
}
```
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk5gef01orj30tp0ek0tk.jpg)   

