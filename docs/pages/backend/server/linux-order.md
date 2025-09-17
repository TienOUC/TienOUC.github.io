---
title: centOS-v7常用命令
date: 2020-05-20
isTimeLine: true
categories: 
- Server
tags:
- Linux
- CentOS
---

### 1. 常用命令

<table border='0' cellpadding='0' cellspacing='0' width='930' style='border-collapse: 
 collapse;table-layout:fixed;width:697pt'>
 <col class='x21' width='417' style='mso-width-source:userset;width:312.75pt'>
 <col class='x21' width='513' style='mso-width-source:userset;width:384.75pt'>
 <tr height='50' style='mso-height-source:userset;height:38pt' id='r0'>
 </tr>
 <tr height='82' style='mso-height-source:userset;height:61.85pt' id='r1'>
<td height='80' class='x23' style='height:60.35pt;'><strong>文件与目录操作</strong><br></td>
<td class='x24'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.6pt' id='r2'>
<td height='42' class='x25' style='height:32.1pt;'>命令</td>
<td class='x26'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r3'>
<td height='42' class='x27' style='height:31.75pt;'>cd /home</td>
<td class='x28'>进入 ‘/home’ 目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r4'>
<td height='42' class='x27' style='height:31.75pt;'>cd ..</td>
<td class='x29'>返回上一级目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r5'>
<td height='42' class='x27' style='height:31.75pt;'>cd ../..</td>
<td class='x28'>返回上两级目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r6'>
<td height='42' class='x27' style='height:31.75pt;'>cd -</td>
<td class='x29'>返回上次所在目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r7'>
<td height='42' class='x27' style='height:31.75pt;'>cp file1 file2</td>
<td class='x28'>将file1复制为file2</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r8'>
<td height='42' class='x27' style='height:31.75pt;'>cp -a dir1 dir2</td>
<td class='x29'>复制一个目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r9'>
<td height='42' class='x27' style='height:31.75pt;'>cp -a /tmp/dir1 .</td>
<td class='x28'>复制一个目录到当前工作目录（.代表当前目录）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r10'>
<td height='42' class='x27' style='height:31.75pt;'>ls</td>
<td class='x29'>查看目录中的文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r11'>
<td height='42' class='x27' style='height:31.75pt;'>ls -a</td>
<td class='x28'>显示隐藏文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r12'>
<td height='42' class='x27' style='height:31.75pt;'>ls -l</td>
<td class='x29'>显示详细信息</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r13'>
<td height='42' class='x27' style='height:31.75pt;'>ls -lrt</td>
<td class='x28'>按时间显示文件（l表示详细列表，r表示反向排序，t表示按时间排序）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r14'>
<td height='42' class='x27' style='height:31.75pt;'>pwd</td>
<td class='x29'>显示工作路径</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r15'>
<td height='42' class='x27' style='height:31.75pt;'>mkdir dir1</td>
<td class='x28'>创建 ‘dir1’ 目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r16'>
<td height='42' class='x27' style='height:31.75pt;'>mkdir dir1 dir2</td>
<td class='x29'>同时创建两个目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r17'>
<td height='42' class='x27' style='height:31.75pt;'>mkdir -p /tmp/dir1/dir2</td>
<td class='x28'>创建一个目录树</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r18'>
<td height='42' class='x27' style='height:31.75pt;'>mv dir1 dir2</td>
<td class='x29'>移动/重命名一个目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r19'>
<td height='42' class='x27' style='height:31.75pt;'>rm -f file1</td>
<td class='x28'>删除 ‘file1’</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r20'>
<td height='42' class='x27' style='height:31.75pt;'>rm -rf dir1</td>
<td class='x29'>删除 ‘dir1’ 目录及其子目录内容</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r21'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x31'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r22'>
<td height='79' class='x32' style='height:59.75pt;'><strong>查看文件内容</strong><br></td>
<td class='x33'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r23'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r24'>
<td height='42' class='x27' style='height:31.75pt;'>cat file1</td>
<td class='x29'>从第一个字节开始正向查看文件的内容</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r25'>
<td height='42' class='x27' style='height:31.75pt;'>head -2 file1</td>
<td class='x28'>查看一个文件的前两行</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r26'>
<td height='42' class='x27' style='height:31.75pt;'>more file1</td>
<td class='x29'>查看一个长文件的内容</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r27'>
<td height='42' class='x27' style='height:31.75pt;'>tac file1</td>
<td class='x28'>从最后一行开始反向查看一个文件的内容</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r28'>
<td height='42' class='x27' style='height:31.75pt;'>tail -3 file1</td>
<td class='x29'>查看一个文件的最后三行</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r29'>
<td height='42' class='x27' style='height:31.75pt;'>vi file</td>
<td class='x28'>打开并浏览文件</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r30'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x33'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r31'>
<td height='79' class='x32' style='height:59.75pt;'><strong>文本内容处理</strong><br></td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r32'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r33'>
<td height='42' class='x27' style='height:31.75pt;'>grep str /tmp/test</td>
<td class='x36'>在文件 ‘/tmp/test’ 中查找 “str”</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r34'>
<td height='42' class='x27' style='height:31.75pt;'>grep ^str /tmp/test</td>
<td class='x37'>在文件 ‘/tmp/test’ 中查找以 “str” 开始的行</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r35'>
<td height='42' class='x27' style='height:31.75pt;'>grep [0-9] /tmp/test</td>
<td class='x36'>查找 ‘/tmp/test’ 文件中所有包含数字的行</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r36'>
<td height='42' class='x27' style='height:31.75pt;'>grep str -r /tmp/*</td>
<td class='x37'>在目录 ‘/tmp’ 及其子目录中查找 “str”</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r37'>
<td height='42' class='x27' style='height:31.75pt;'>diff file1 file2</td>
<td class='x36'>找出两个文件的不同处</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r38'>
<td height='42' class='x27' style='height:31.75pt;'>sdiff file1 file2</td>
<td class='x37'>以对比的方式显示两个文件的不同</td>
 </tr>
 <tr height='41' style='mso-height-source:userset;height:31.25pt' id='r39'>
<td height='39' class='x27' style='height:29.75pt;'>vi file</td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r40'>
<td height='42' class='x34' style='height:31.75pt;'>操作</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r41'>
<td height='42' class='x27' style='height:31.75pt;'>i</td>
<td class='x36'>进入编辑文本模式</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r42'>
<td height='42' class='x27' style='height:31.75pt;'>Esc</td>
<td class='x37'>退出编辑文本模式</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r43'>
<td height='42' class='x27' style='height:31.75pt;'>:w</td>
<td class='x36'>保存当前修改</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r44'>
<td height='42' class='x27' style='height:31.75pt;'>:q</td>
<td class='x37'>不保存退出vi</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r45'>
<td height='42' class='x27' style='height:31.75pt;'>:wq</td>
<td class='x36'>保存当前修改并退出vi</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r46'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x33'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r47'>
<td height='79' class='x32' style='height:59.75pt;'><strong>查询操作</strong><br></td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r48'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r49'>
<td height='42' class='x27' style='height:31.75pt;'>find / -name file1</td>
<td class='x28'>从 ‘/’ 开始进入根文件系统查找文件和目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r50'>
<td height='42' class='x27' style='height:31.75pt;'>find / -user user1</td>
<td class='x29'>查找属于用户 ‘user1’ 的文件和目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r51'>
<td height='42' class='x27' style='height:31.75pt;'>find /home/user1 -name *.bin</td>
<td class='x28'>在目录 ‘/ home/user1’ 中查找以 ‘.bin’ 结尾的文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r52'>
<td height='42' class='x27' style='height:31.75pt;'>find /usr/bin -type f -atime +100</td>
<td class='x29'>查找在过去100天内未被使用过的执行文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r53'>
<td height='42' class='x27' style='height:31.75pt;'>find /usr/bin -type f -mtime -10</td>
<td class='x28'>查找在10天内被创建或者修改过的文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r54'>
<td height='42' class='x27' style='height:31.75pt;'>locate *.ps</td>
<td class='x29'>寻找以 ‘.ps’ 结尾的文件，先运行 ‘updatedb’ 命令</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r55'>
<td height='42' class='x27' style='height:31.75pt;'>find -name ‘*.[ch]’ | xargs grep -E ‘expr’</td>
<td class='x28'>在当前目录及其子目录所有.c和.h文件中查找 ‘expr’</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r56'>
<td height='42' class='x27' style='height:31.75pt;'>find -type f -print0 | xargs -r0 grep -F ‘expr’</td>
<td class='x29'>在当前目录及其子目录的常规文件中查找 ‘expr’</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r57'>
<td height='42' class='x27' style='height:31.75pt;'>find -maxdepth 1 -type f | xargs grep -F ‘expr’</td>
<td class='x28'>在当前目录中查找 ‘expr’</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r58'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x33'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r59'>
<td height='79' class='x32' style='height:59.75pt;'><strong>压缩、解压</strong><br></td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r60'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r61'>
<td height='42' class='x27' style='height:31.75pt;'>bzip2 file1</td>
<td class='x28'>压缩 file1</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r62'>
<td height='42' class='x27' style='height:31.75pt;'>bunzip2 file1.bz2</td>
<td class='x29'>解压 file1.bz2</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r63'>
<td height='42' class='x27' style='height:31.75pt;'>gzip file1</td>
<td class='x28'>压缩 file1</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r64'>
<td height='42' class='x27' style='height:31.75pt;'>gzip -9 file1</td>
<td class='x29'>最大程度压缩 file1</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r65'>
<td height='42' class='x27' style='height:31.75pt;'>gunzip file1.gz</td>
<td class='x28'>解压 file1.gz</td>
 </tr>
 <tr height='67' style='mso-height-source:userset;height:50.25pt' id='r66'>
<td height='65' class='x27' style='height:48.75pt;'>tar -cvf archive.tar file1</td>
<td class='x29'>把file1打包成 archive.tar（-c: 建立压缩档案；-v: 显示所有过程；-f: 使用档案名字，是必须的，是最后一个参数）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r67'>
<td height='42' class='x27' style='height:31.75pt;'>tar -cvf archive.tar file1 dir1</td>
<td class='x28'>把 file1，dir1 打包成 archive.tar</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r68'>
<td height='42' class='x27' style='height:31.75pt;'>tar -tf archive.tar</td>
<td class='x29'>显示一个包中的内容</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r69'>
<td height='42' class='x27' style='height:31.75pt;'>tar -xvf archive.tar</td>
<td class='x28'>释放一个包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r70'>
<td height='42' class='x27' style='height:31.75pt;'>tar -xvf archive.tar -C /tmp</td>
<td class='x29'>把压缩包释放到 /tmp目录下</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r71'>
<td height='42' class='x27' style='height:31.75pt;'>zip file1.zip file1</td>
<td class='x28'>创建一个zip格式的压缩包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r72'>
<td height='42' class='x27' style='height:31.75pt;'>zip -r file1.zip file1 dir1</td>
<td class='x29'>把文件和目录压缩成一个zip格式的压缩包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r73'>
<td height='42' class='x27' style='height:31.75pt;'>unzip file1.zip</td>
<td class='x28'>解压一个zip格式的压缩包到当前目录</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r74'>
<td height='42' class='x27' style='height:31.75pt;'>unzip test.zip -d /tmp/</td>
<td class='x29'>解压一个zip格式的压缩包到 /tmp 目录</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r75'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x31'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r76'>
<td height='79' class='x32' style='height:59.75pt;'><strong>yum安装器</strong><br></td>
<td class='x33'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r77'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r78'>
<td height='42' class='x27' style='height:31.75pt;'>yum -y install [package]</td>
<td class='x29'>下载并安装一个rpm包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r79'>
<td height='42' class='x27' style='height:31.75pt;'>yum localinstall [package.rpm]</td>
<td class='x28'>安装一个rpm包，使用你自己的软件仓库解决所有依赖关系</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r80'>
<td height='42' class='x27' style='height:31.75pt;'>yum -y update</td>
<td class='x29'>更新当前系统中安装的所有rpm包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r81'>
<td height='42' class='x27' style='height:31.75pt;'>yum update [package]</td>
<td class='x28'>更新一个rpm包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r82'>
<td height='42' class='x27' style='height:31.75pt;'>yum remove [package]</td>
<td class='x29'>删除一个rpm包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r83'>
<td height='42' class='x27' style='height:31.75pt;'>yum list</td>
<td class='x28'>列出当前系统中安装的所有包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r84'>
<td height='42' class='x27' style='height:31.75pt;'>yum search [package]</td>
<td class='x29'>在rpm仓库中搜寻软件包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r85'>
<td height='42' class='x27' style='height:31.75pt;'>yum clean [package]</td>
<td class='x28'>清除缓存目录（/var/cache/yum）下的软件包</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r86'>
<td height='42' class='x27' style='height:31.75pt;'>yum clean headers</td>
<td class='x29'>删除所有头文件</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r87'>
<td height='42' class='x27' style='height:31.75pt;'>yum clean all</td>
<td class='x28'>删除所有缓存的包和头文件</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r88'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x33'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r89'>
<td height='79' class='x32' style='height:59.75pt;'><strong>网络相关</strong><br></td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r90'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r91'>
<td height='42' class='x27' style='height:31.75pt;'>ifconfig eth0</td>
<td class='x28'>显示一个以太网卡的配置</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r92'>
<td height='42' class='x27' style='height:31.75pt;'>ifconfig eth0 192.168.1.1 netmask 255.255.255.0</td>
<td class='x29'>配置网卡的IP地址</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r93'>
<td height='42' class='x27' style='height:31.75pt;'>ifdown eth0</td>
<td class='x28'>禁用 ‘eth0’ 网络设备</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r94'>
<td height='42' class='x27' style='height:31.75pt;'>ifup eth0</td>
<td class='x29'>启用 ‘eth0’ 网络设备</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r95'>
<td height='42' class='x27' style='height:31.75pt;'>iwconfig eth1</td>
<td class='x28'>显示一个无线网卡的配置</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r96'>
<td height='42' class='x27' style='height:31.75pt;'>iwlist scan</td>
<td class='x29'>显示无线网络</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r97'>
<td height='42' class='x27' style='height:31.75pt;'>ip addr show</td>
<td class='x28'>显示网卡的IP地址</td>
 </tr>
 <tr height='36' style='mso-height-source:userset;height:27.25pt' id='r98'>
<td height='34' class='x30' style='height:25.75pt;'></td>
<td class='x33'></td>
 </tr>
 <tr height='81' style='mso-height-source:userset;height:61.25pt' id='r99'>
<td height='79' class='x32' style='height:59.75pt;'><strong>系统相关</strong><br></td>
<td class='x31'></td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r100'>
<td height='42' class='x34' style='height:31.75pt;'>命令</td>
<td class='x35'>解析</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r101'>
<td height='42' class='x27' style='height:31.75pt;'>su -</td>
<td class='x28'>切换到root权限（与su有区别）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r102'>
<td height='42' class='x27' style='height:31.75pt;'>shutdown -h now</td>
<td class='x29'>关机</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r103'>
<td height='42' class='x27' style='height:31.75pt;'>shutdown -r now</td>
<td class='x28'>重启</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r104'>
<td height='42' class='x27' style='height:31.75pt;'>top</td>
<td class='x29'>罗列使用CPU资源最多的linux任务 （输入q退出）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r105'>
<td height='42' class='x27' style='height:31.75pt;'>pstree</td>
<td class='x28'>以树状图显示程序</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r106'>
<td height='42' class='x27' style='height:31.75pt;'>man ping</td>
<td class='x29'>查看参考手册（例如ping 命令）</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r107'>
<td height='42' class='x27' style='height:31.75pt;'>passwd</td>
<td class='x28'>修改密码</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r108'>
<td height='42' class='x27' style='height:31.75pt;'>df -h</td>
<td class='x29'>显示磁盘的使用情况</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r109'>
<td height='42' class='x27' style='height:31.75pt;'>cal -3</td>
<td class='x28'>显示前一个月，当前月以及下一个月的月历</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.25pt' id='r110'>
<td height='42' class='x27' style='height:31.75pt;'>cal 10 1988</td>
<td class='x29'>显示指定月，年的月历</td>
 </tr>
 <tr height='44' style='mso-height-source:userset;height:33.5pt' id='r111'>
<td height='42' class='x38' style='height:32pt;'>date –date ‘1970-01-01 UTC 1427888888 seconds’</td>
<td class='x39'>把一相对于1970-01-01 00:00的秒数转换成时间</td>
 </tr>
<![if supportMisalignedColumns]>
 <tr height='0' style='display:none'>
  <td width='417' style='width:312.75pt'></td>
  <td width='513' style='width:384.75pt'></td>
 </tr>
 <![endif]>
</table>
