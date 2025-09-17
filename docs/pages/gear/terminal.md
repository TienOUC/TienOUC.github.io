---
autoGroup-3: Terminal
title: Mac终端命令不可用的解决办法
date: 2020-05-16
isTimeLine: true
categories:
- Tools
tags:
- Terminal
---

## 1. 命令行输入

`export PATH=/usr/bin:/usr/sbin:/bin:/sbin:/usr/X11R6/bin`     
这样可以保证命令行命令暂时能够使用。这行命令执行完后不要关闭终端。

## 2. 进入当前 Home 目录

`cd ~/`

## 3. 创建 bash_profile 

`touch .bash_profile`

## 4. 配置PATH
文件内容是你之前配置过的 path，把全部内容删除(将自己有用的部分备份，Terminal 修复后再加到里面)，加入 PATH：   
`export PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin`     
保存文件并退出(不要退出 Terminal)

## 5. 继续执行命令

`source .bash_profile`

## 6. 重启 Terminal
