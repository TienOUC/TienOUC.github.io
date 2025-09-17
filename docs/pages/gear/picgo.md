---
autoGroup-9: Other
title: PicGo + Github + jsDelivr搭建图床
sidebarDepth: 2
date: 2021-10-01
categories:
  - Tools
tags:
  - Tools
---

之前一直用 iPic 自带的新浪免费图床保存博客图片，期间有一些图片丢失了，另外就是因为 iPic 默认会给透明背景的图片加上一个白色背景，导致博客在暗黑模式下加载的图片有一个很难看的白边，对于有强迫症的我来说忍无可忍，所以就尝试了 [PicGo](https://github.com/Molunerfinn/PicGo) + Github 搭建图床，问题完美解决。

## 1. 下载安装

[PicGo 下载地址](https://github.com/Molunerfinn/PicGo/releases)

## 2. 创建 Github 图床仓库

创建图床 repo 并设置 `access token`

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202110092218962.png)

## 3. 配置 PicGo

自定义域名栏配置 jsDelivr CDN 加速
![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202110092219859.png)
