---
title: Mac安装MongoDB
date: 2020-05-21
isTimeLine: true
categories: 
- Server
tags:
- Database
- Tools
---

:::tip  

MongoDB <Badge text="v4.2" type="warning"/>   

:::

## 1. 使用brew安装   
安装命令 `brew install mongodb-community@4.2`

```
➜  ~ brew install mongodb-community@4.2
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/core).
==> New Formulae
zenith
==> Updated Formulae
angular-cli          ejdb                 htmlcleaner          pgrouting
aws-cdk              exif                 iso-codes            sentencepiece
awscli               ffmpeg               jena                 snakemake
azure-storage-cpp    firebase-cli         kitchen-sync         tengo
bmake                fuseki               kubernetes-cli       tflint
cfr-decompiler       gcviewer             libexif              util-linux
chamber              groovy               mame                 wireshark
contentful-cli       groovysdk            nss
csvq                 gspell               opa
detekt               haxe                 pachi

==> Installing mongodb-community from mongodb/brew
==> Downloading https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.2.6.tgz
####################################      ####################################      ####################################      ####################################      ####################################      #####################################     #####################################     #####################################     #####################################     ######################################    ######################################    ######################################    ######################################    ######################################    ######################################    ######################################    ################################################################################ 100.0%
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: An exception occurred within a child process:
  CompilerSelectionError: mongodb/brew/mongodb-community cannot be built with any available compilers.
Install GNU's GCC:
  brew install gcc
```

## 2. gcc错误

报错，提示安安装gcc，使用命令安装 `brew install gcc`

```
➜  ~ brew install gcc
Updating Homebrew...
==> Downloading https://homebrew.bintray.com/bottles/gmp-6.2.0.catalina.bottle.tar.gz
==> Downloading from https://akamai.bintray.com/2e/2e6acd6e62d1b8ef0800061e113aea30a6
######################################################################## 100.0%
==> Downloading https://homebrew.bintray.com/bottles/isl-0.22.1.catalina.bottle.tar.g
==> Downloading from https://akamai.bintray.com/b5/b5319e3bbbb36ef3536d841999b7497b3d
######################################################################## 100.0%
==> Downloading https://homebrew.bintray.com/bottles/mpfr-4.0.2.catalina.bottle.tar.g
==> Downloading from https://akamai.bintray.com/14/140d29bfee0c8cf356fbb5391465f781df
######################################################################## 100.0%
==> Downloading https://homebrew.bintray.com/bottles/libmpc-1.1.0.catalina.bottle.tar
######################################################################## 100.0%
==> Downloading https://ftp.gnu.org/gnu/gcc/gcc-9.3.0/gcc-9.3.0.tar.xz
######################################################################## 100.0%
==> Installing dependencies for gcc: gmp, isl, mpfr and libmpc
==> Installing gcc dependency: gmp
==> Pouring gmp-6.2.0.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/gmp/6.2.0: 20 files, 3.2MB
==> Installing gcc dependency: isl
==> Pouring isl-0.22.1.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/isl/0.22.1: 72 files, 4.7MB
==> Installing gcc dependency: mpfr
==> Pouring mpfr-4.0.2.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/mpfr/4.0.2: 28 files, 4.7MB
==> Installing gcc dependency: libmpc
==> Pouring libmpc-1.1.0.catalina.bottle.tar.gz
🍺  /usr/local/Cellar/libmpc/1.1.0: 12 files, 361.9KB
==> Installing gcc
Warning: Building gcc from source:
  The bottle needs the Xcode CLT to be installed.
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
Error: An exception occurred within a child process:
  CompilerSelectionError: gcc cannot be built with any available compilers.
Install GNU's GCC:
  brew install gcc
```

## 3. 安装 xcode-select 
 
仍报错，安装 xcode-select `xcode-select --install`   

```
➜  ~ xcode-select --install
xcode-select: note: install requested for command line developer tools
➜  ~ brew install mongodb-community@4.2
Updating Homebrew...
==> Installing mongodb-community from mongodb/brew
==> Downloading https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-4.2.6.tgz
Already downloaded: /Users/willtien/Library/Caches/Homebrew/downloads/3adaceb30d5d0498425566a2f8fec2b33534070ab4756566a6617287998d276f--mongodb-macos-x86_64-4.2.6.tgz
==> Caveats
To have launchd start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
==> Summary
🍺  /usr/local/Cellar/mongodb-community/4.2.6: 21 files, 306.2MB, built in 5 seconds
```

## 4. 启动命令    
后台启动 `brew services start mongodb/brew/mongodb-community`

```
➜  ~ brew services start mongodb/brew/mongodb-community
==> Successfully started `mongodb-community` (label: homebrew.mxcl.mongodb-community)
➜  ~
```
## 5. 可视化工具   
打开可视化工具 Robot 3T，连接成功

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf198d3po9j30x00lkq4j.jpg)
![](https://tva1.sinaimg.cn/large/007S8ZIlly1gf198cy6zoj30x40li3zl.jpg)

## 6. 停止进程
命令 `brew services stop mongodb/brew/mongodb-community`
