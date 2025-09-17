---
autoGroup-1: HTTP
title: Http缓存
date: 2020-03-02
categories: 
- Protocol
tags:
- Protocol
---

## 1. Http缓存

&emsp;&emsp; 当用户开始访问一个网站时，浏览器会从目标服务器获取一些资源用以构建最终的 web 页面，比如 CSS、JS、HTML 等静态文件。当 PV 量很大的候，每次都直接从服务器请求数据，就会很耗费服务端的性能，为了提升数据交换性能、缓解服务器或数据库压力，HTTP 协议给出了一个优化方案，简述如下：   

> &emsp;&emsp;当用户第一次请求一个资源时的时序图，浏览器会先询问是否有命中缓存，没有命中话则浏览器再从服务器获取资源并将资源放进 **缓存仓库** （为方便理解，可以简单理解为浏览器提供了缓存数据库，将满足缓存规则的数据存储其中），下次访问时就可以直接从缓存仓库中拿取已缓存的资源了。时序图大致如下：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk9x9unlxpj30m80ce3yl.jpg)

## 2. 缓存分类
&emsp;&emsp;HTTP 根据是否要向服务器发送请求将缓存规则分为两类 **强缓存** 和 **协商缓存** （也称对比缓存）

### 2.1 强缓存
&emsp;&emsp;强缓存直接从缓存数据库中取出资源，无需再发送请求到服务器上。
Http中用来判断是否命中强缓存的字段为 `Expires` 和 `Cache-Control` (`Cache-Control` 优先级高于 `Expires`)   

+ Expires 

![](https://tva1.sinaimg.cn/large/0081Kckwly1gka2iu0vrgj30m80c5gno.jpg)

`Expires` 的值是一个绝对时间，可以看到上图中的时间点：Sun, 01 Nov 2020 15:32:20 GMT，代表这个资源在该时间点之前都可以直接从缓存中获取。  

+ Cache-Control

![](https://tva1.sinaimg.cn/large/0081Kckwly1gka2j30n2uj30m80c50us.jpg)

`Cache-Control` 中定义了 public, max-age=7200，这是一个相对时间（单位：秒），这里代表资源的缓存在这个请求之后的2小时内都有效。

[Cache-Control 字段含义 👉 MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

#### 2.1.1 强缓存状态码
强缓存状态码为200，但查看chrome的network会发现状态码后面多了个注释：

+ from disk cache   
![](https://tva1.sinaimg.cn/large/0081Kckwly1gka2mv5uzwj30m804dmxr.jpg)   

> 缓存资源在硬盘中，浏览器（标签页）关闭后硬盘中的缓存不会消失，再次进入页面还能从硬盘中获取。

+ from memory cache   
![](https://tva1.sinaimg.cn/large/0081Kckwly1gka2mithu1j30m804d0ta.jpg)
   
> 缓存资源在内存中，浏览器（标签页）关闭后内存中的缓存就会被释放，重新进入页面取不到该缓存。
   
   
**&emsp;&emsp;如果不想从强缓存中获取资源，windows电脑可以通过 ctrl + f5 刷新页面，macOS 可以通过 shift + command + r 刷新页面，刷新后可以看到资源不会出现 from disk(or memory) cache了。**

### 2.2 协商缓存

&emsp;&emsp;协商缓存就是需要经过服务器确认是否使用缓存机制，其 Http 状态码为 `304 （not modified）`。时序图大致如下：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gka3r8sowzj30m80asaa3.jpg)

   
如何对比标志来确认是否使用缓存？   
+ Last-Modified / If-Modified-Since   
> &emsp;&emsp;当浏览器第一次访问资源的时候，服务器会在 Response Header 中返回一个 Last-Modified ，代表这个资源最后的修改时间，当浏览器再次访问该资源的时候，会在 Request Header 中带上 If-Modified-Since ，值为上次请求时服务器返回的 Last-Modified 的值，然后服务器根据资源上次修改的时间确认在这段时间内是否更改过，若没有，则返回 304 ，若有，则返回 200 并返回最新的资源。

+ Etag / If-None-Match     
> &emsp;&emsp;Etag / If-None-Match 与 Last-Modified / If-Modified-Since 的机制类似，不同的是，Etag 是通过一个校验码来对比资源是否更改过，而不是通过资源的修改时间对比。当一个资源修改时，其校验码也会更改。当浏览器请求资源时，服务器会返回一个 Etag 字段，然后浏览器下一次请求时，会带上 If-None-Match ，值为上次服务器返回的 Etag 的值，服务器经过校验码的对比后决定返回 200 或 304。
   

**&emsp;&emsp;如果http请求中若同时出现 Etag 和 Last-Modified，Etag 的优先级高于 Last-Modified 。**


