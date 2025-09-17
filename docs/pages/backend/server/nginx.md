---
title: Nginx反向代理
date: 2020-05-20
isTimeLine: true
categories:
 - Server
tags:
 - Nginx
---

```js
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        include mime.types;
        default_type application/octet-stream;
        location / {
           root /root/www;                                  主静态文件目录,访问路径为 http://serverIP/
           #try_files $uri $uri/ /index.html;
           index index.html index.htm;
         # add_header Access-Control-Allow-Origin *;
        }
        location /main {
           alias /root/www/main;                            URI ，访问路径为 http://serverIP/main
           index index.html index.htm;
        }
        location /api/ {
         proxy_pass http://127.0.0.1:8080/api;              proxy_pass转发，访问路径为http://serverIP:8080/api (本地127.0.0.1:port 一般启动其他服务，然后从80端口转发，这样，服务器对外只暴露80端口)
        }
            error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
    }
```
