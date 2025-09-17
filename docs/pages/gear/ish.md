---
autoGroup-3: Terminal
title: iSH
date: 2020-03-21
sidebarDepth: 3
isTimeLine: true
categories:
  - Tools
tags:
  - Terminal
---

## 1. 简介

iSH :link: [ ish.app ](https://ish.app) 模拟的是 x86 i686（32 位）的 Linux 系统，使用的 Linux 系统镜像是 Alpine Linux。作为一个 x86 仿真和系统调用转换程序，虽然不能完全取代真正的 x86 架构的 Linux 系统，但是用来做轻量开发、写代码、学习等等是可以满足的。

## 2. 设置

因为 Alpine Linux 默认使用的是国外的源，所以网速特别慢，可更换成国内的源。

- 编辑 `/etc/apk/repositories` 文件（以阿里云和中科大源为例，注意版本号）：

```
vi /etc/apk/repositories

# 阿里云源
https://mirrors.aliyun.com/alpine/v3.11/main
https://mirrors.aliyun.com/alpine/v3.11/community

# 中科大源
https://mirrors.ustc.edu.cn/alpine/v3.11/main
https://mirrors.ustc.edu.cn/alpine/v3.11/community
```

保存退出，使用 `apk update` 更新源列表

- 或直接输入替换源命令（以清华源为例）

```
sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

```

然后再使用 `apk update` 更新源列表，注意这里的方式跟方法 1 不同，这里会覆盖 repositories 原来的内容。  
安装常用软件 `apk add zsh git neofetch curl neovim`

> zsh：shell  
> git：代码版本控制软件  
> curl：克隆 GitHub 代码要用到  
> neofetch：显示当前系统的一些信息  
> neovim：代码编辑器

**zsh 配置**

```
# clone ohmyzsh
git clone https://github.com/ohmyzsh/ohmyzsh.git --depth 1

# 进入tools目录安装ohmyzsh
cd ohmyzsh/tools
sh install.sh

# 修改默认shell
vi /etc/passwd
...root:/root:/bin/bsh 👈 将这里的 bsh 改成 zsh

# 编辑 .zshrc 修改主题
vi .zshrc
ZSH_THEME="主题名"
```

修改 `http.postBuffer` 限制 `git config --global http.postBuffer 524288000`  
因为 git 默认的 http.postBuffer 大小为 1M。所以 clone 较大的文件时偶尔会失败，上面的命令是将 git 的 http.postBuffer 大小设置为 500M。

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202110092226528.png)
