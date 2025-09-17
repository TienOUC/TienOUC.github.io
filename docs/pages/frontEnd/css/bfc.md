---
title: BFC
date: 2019-12-28
categories:
- FrontEnd
tags:
- CSS
---
## 1. BFC
BFC 是块级格式化上下文 （Block Formatting Context） 的缩写。

**作用：形成一个独立的布局容器，让里面的元素和外面的元素互不干扰。**

## 2. 触发方法

> 1. float 不为 none
> 2. position 不为 relative 和 static
> 3. overflow 为 auto scroll 和 hidden
> 4. display 的值为 table-cell 或 inline-block   

## 3. 常见应用场景

+ 解决父容器高度塌陷 
子元素在设置了 `float` 属性后脱离了文档流，此时父容器检测不到子元素的存在，所以没有内容撑起其高度，导致产生塌陷（示例中为了方便对比，给父容器盒子设置了 2px 的 border），给父容器设置 `overflow: hidden;`（触发BFC） 即可看到高度再次撑开。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk65bpqz2cg30gn0cmdi6.gif)
   
此外也可以用 `display: table-cell;`    
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk65nevsgyg30gn0cujtk.gif)  
   
`position: fixed;`     
![](https://tva1.sinaimg.cn/large/0081Kckwly1gk65qm6ws2g30gn0cujsr.gif)

具体选择视开发需求而定

+ 两栏布局（单侧定宽，另一侧自适应）

+ 解决块级元素垂直方向的 margin collapse 问题

