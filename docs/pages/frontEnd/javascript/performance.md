---
autoGroup-5: 其他
title: WEB性能优化
date: 2021-08-01
categories:
  - FrontEnd
tags:
  - JavaScript
---

## 1. 更快的网络通信

### 1.1 CDN

内容分发网络 （Content Delivery Network）利用全局负载均衡和缓存系统

### 1.2 服务器通信

- 资源合并：雪碧图
- 域名分片：多域名
- 服务端 SSR SSG（弊端：不利于 SEO）

### 1.3 数据传输

- 强缓存
- 协商缓存
- https（链路复用、减少不必要的报文头参数、头部压缩 HPACK）

### 1.4 数据压缩

- Gzip / br 压缩
- 源码文件压缩（HTML / JS / CSS 注释、空格、长变量名等）
- 静态资源 （字体图标，去除无用元数据，例如图片的光圈地点等参数，缩小尺寸和分辨率，使用 jpg / webp 格式）

## 2. 更高效的数据处理

- 逻辑与展示解耦，避免频繁地启动 js 引擎
- 减少作用域查找和闭包
- 能用 html 和 css 实现的就不必用 js 去实现
- 语义化标签，加强 DOM 解析
- 多使用伪元素，减少 JS 对 DOM 的查找遍历
