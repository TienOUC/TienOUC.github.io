---
autoGroup-5: Bundle
title: Webpack自定义插件——静态资源自动转CDN
sidebarDepth: 2
date: 2024-08-18
categories:
  - FrontEnd
tags:
  - Tools
  - Webpack
---

:::tip

- 将项目中的图片、字体等静态资源自动上传到 CDN（Ali OSS），替换本地引用路径，减轻服务器压力。

:::
:::warning

- 跨域配置：若前端项目与 OSS 域名不同，需在 OSS 控制台配置跨域规则（允许 GET 方法）
- 效果：粗测静态资源加载速度提升 50%+，服务器带宽占用减少 80%

:::

```js
// VueAssetToOSSPlugin.js
const OSS = require('ali-oss'); // 阿里云OSS SDK（需安装：npm i ali-oss -D）
const fs = require('fs');
const path = require('path');

class VueAssetToOSSPlugin {
  constructor(options = {}) {
    this.options = {
      oss: {
        region: '', // 阿里云OSS区域（如：oss-cn-beijing）
        accessKeyId: '', // 阿里云accessKeyId
        accessKeySecret: '', // 阿里云accessKeySecret
        bucket: '', // OSS存储空间名称
        domain: '' // OSS绑定的域名（如：xxx.oss-cn-beijing.aliyuncs.com）
      },
      include: /\.(png|jpe?g|gif|webp|svg|woff2?|ttf)$/, // 需上传的资源格式
      exclude: /node_modules/,
      prefix: 'static/' // OSS文件存储前缀（可选，如分类存放：static/images/）
    };
    // 合并用户配置
    Object.assign(this.options, options);
    Object.assign(this.options.oss, options.oss);

    // 初始化阿里云OSS客户端
    this.client = new OSS({
      region: this.options.oss.region,
      accessKeyId: this.options.oss.accessKeyId,
      accessKeySecret: this.options.oss.accessKeySecret,
      bucket: this.options.oss.bucket
    });
  }

  apply(compiler) {
    // 构建完成后上传资源并替换路径
    compiler.hooks.done.tapAsync(
      'VueAssetToOSSPlugin',
      async (stats, callback) => {
        const compilation = stats.compilation;
        const outputPath = compiler.outputPath;
        const assetsDir = path.join(outputPath, 'assets'); // Vue默认静态资源目录

        // 遍历静态资源目录
        const uploadAssets = async (dir) => {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            const filePath = path.join(dir, file);
            const fileStats = fs.statSync(filePath);

            if (fileStats.isDirectory()) {
              await uploadAssets(filePath);
            } else if (
              this.options.include.test(file) &&
              !this.options.exclude.test(filePath)
            ) {
              // 生成OSS存储路径（保留原目录结构 + 自定义前缀）
              const relativePath = path.relative(outputPath, filePath);
              const ossKey = path
                .join(this.options.prefix, relativePath)
                .replace(/\\/g, '/');

              // 上传文件到OSS
              await this.uploadToOSS(filePath, ossKey);

              // 替换所有JS/CSS中引用的本地路径为OSS路径
              this.replaceLocalPath(compilation, relativePath, ossKey);
            }
          }
        };

        try {
          await uploadAssets(assetsDir);
          callback();
        } catch (err) {
          console.error('OSS上传失败：', err);
          callback(err);
        }
      }
    );
  }

  // 上传文件到阿里云OSS
  async uploadToOSS(localFilePath, ossKey) {
    try {
      // 读取本地文件并上传
      const result = await this.client.put(ossKey, localFilePath);
      console.log(`文件上传成功：${result.url}`);
      return result;
    } catch (err) {
      console.error(`文件${localFilePath}上传失败：`, err);
      throw err;
    }
  }

  // 替换代码中的本地资源路径为OSS路径
  replaceLocalPath(compilation, localRelativePath, ossKey) {
    const ossUrl = `https://${this.options.oss.domain}/${ossKey}`;
    // Vue项目中本地资源引用路径（如：./assets/xxx.png）
    const localPathReg = new RegExp(
      `\\.\\/assets\\/${localRelativePath.split('assets/')[1]}`,
      'g'
    );

    // 遍历所有JS/CSS文件，替换路径
    Object.keys(compilation.assets).forEach((filename) => {
      if (filename.endsWith('.js') || filename.endsWith('.css')) {
        const source = compilation.assets[filename].source();
        const optimizedSource = source.replace(localPathReg, ossUrl);
        // 更新资源内容
        compilation.assets[filename] = {
          source: () => optimizedSource,
          size: () => optimizedSource.length
        };
      }
    });
  }
}

module.exports = VueAssetToOSSPlugin;
```

配置 vue.config.js

```js
// vue.config.js
// ...
const VueAssetToOSSPlugin = require('./plugins/VueAssetToOSSPlugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new VueAssetToOSSPlugin({
        oss: {
          region: 'oss-cn-beijing', // OSS区域
          accessKeyId: 'accessKeyId', // accessKeyId
          accessKeySecret: 'accessKeySecret', // accessKeySecret
          bucket: 'bucket-name', // 存储空间名称
          domain: 'bucket.oss-cn-beijing.aliyuncs.com' // OSS域名
        },
        prefix: 'vue-project/static/' // 可选：OSS文件前缀（方便分类管理）
      })
    ]
  }
};
```
