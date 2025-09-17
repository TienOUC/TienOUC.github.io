---
title: MySQL
date: 2021-05-19
isTimeLine: true
categories:
  - Server
tags:
  - Database
  - Tools
---

## 1. 安装

集成化开发环境内置，或者官网下载单独安装
[ MySQL Community Server Downloads](https://dev.mysql.com/downloads/mysql/)

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnydwvsfcj30sw0tbtcr.jpg)
![](https://tva1.sinaimg.cn/large/008i3skNly1gqnxmj0a4tj30sw0oyabb.jpg)

## 2. 命令行操作

### 2.1 基础管理操作

- **连接**

```md
mysql -uroot -p
```

输入数据库密码后连接成功
![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx7d2bbsj30sw0htta6.jpg)

- **创建数据库**

```md
create database test charset utf8;
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx8a0dlzj30sw0htmyb.jpg)

- **查看数据库（⚠️ databases 复数）**

```md
show databases;
```

- **查看数据库结构**

```md
show create database test;
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx97v1edj30sw0ed3z4.jpg)

- **删除数据库**

```md
drop database test;
// or
drop database if exists test;
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx7wazf0j30sw0htab9.jpg)  
![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx8kxt4jj30sw0htdgy.jpg)

- **v8.x 版本修改登录密码**

```
alter user'root'@'localhost' identified with mysql_native_password by '123456';
```

### 2.2 外部 SQL 文件操作

- **管道符导入 `.sql` 文件**

```md
mysql -uroot -p < test.sql
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx8xzczyj30sw0hf0tj.jpg)

- **进入数据库，使用 `source` 命令导入**

```md
source test.sql
```

![](https://tva1.sinaimg.cn/large/008i3skNly1gqnx9lsk3yj30sw0jxjsw.jpg)

## 3. GUI

| 软件      | 免费版 | Windows | Mac | Linux | 功能 |
| --------- | ------ | ------- | --- | ----- | ---- |
| Sequelpro | 有     |         | ✔︎  |       |
| DBeaver   | 有     | ✔︎      | ✔︎  | ✔︎    |
| Navicat   |        | ✔︎      | ✔︎  | ✔︎    | 强   |
| SQLyog    |        | ✔︎      |     |       | 强   |
| dbForge   | 有     | ✔︎      |     |       | 强   |
| Heidisql  | 有     | ✔︎      |     |       |

个人用 DBeaver  
![](https://tva1.sinaimg.cn/large/008i3skNly1gqny24vh73j30sw0jpq42.jpg)
