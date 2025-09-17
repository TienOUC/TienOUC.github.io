---
autoGroup-9: Other
title: yarn.lock与package-lock.json互转
sidebarDepth: 2
date: 2020-08-18
categories:
  - Tools
tags:
  - Tools
---

## 1. 安装 synp

`npm install -g synp`

## 2. 互转

- 1. yarn.lock => package-lock.json

```
yarn # be sure the node_modules folder dir and is updated
synp --source-file /path/to/yarn.lock
# will create /path/to/package-lock.json
```

转换生成 package-lock.json 后，删除 node_models 文件夹，然后用 npm install

- 2. package-lock.json => yarn.lock

```
npm install # be sure the node_modules dir exists and is updated
synp --source-file /path/to/package-lock.json
# will create /path/to/yarn.lock
```

转换生成 yarn.lock 后，删除 node_models 文件夹，然后用 yarn install
