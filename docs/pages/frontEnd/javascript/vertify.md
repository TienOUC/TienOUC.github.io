---
autoGroup-5: 其他
title:  文件类型校验
date: 2022-05-28
categories:
  - FrontEnd
tags:
  - JavaScript
---

文件上传最早的类型校验逻辑是使用正则判断后缀名，但这并不能校验用户手动修改后缀名的文件，在修复该bug的时候，采用`File API （file.type）`判断文件的`MIME`类型，但今天又发现，在 macOS 和 Windows 系统下 aac 文件的`file.type` 返回结果不一致，Windows 系统下返回`audio/vnd.dlna.adts`，macOS系统下返回`audio/acc`，不同系统返回不同type的原因暂未确定，带着疑惑查阅了MDN文档，发现对于File API有这样一段注释：

[File API](https://developer.mozilla.org/zh-CN/docs/Web/API/File/type) **注： 基于当前的实现，浏览器不会实际读取文件的字节流，来判断它的媒体类型。它基于文件扩展来假设；重命名为 .txt 的 PNG 图像文件为 "text/plain" 而不是 "image/png" 。而且，file.type 仅仅对常见文件类型可靠。例如图像、文档、音频和视频。不常见的文件扩展名会返回空字符串。开发者最好不要依靠这个属性，作为唯一的验证方案。**

随着进一步思考该如何精确地校验文件类型，想到了 `Magic Number`， 可以使用 [FileReader](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader) 方法读取文件指定位置的二进制数据（具体示例代码待添加），以此来判断文件类型应该算是前端最有严谨的校验手段, 但依然不是100%有效 [MDN > Other methods of conveying document type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#other_methods_of_conveying_document_type)。

[List of file signatures and mime types based on file extensions](https://gist.github.com/Qti3e/6341245314bf3513abb080677cd1c93b)

```html
    <div>
        <input type="file" id="input">
        <button id="verify">Magic Number</button>
        <span id="type"></span>
    </div>
```

```js
    const magicjson = {
        "49443304": "audio/mpeg",
        "52494646": "audio/wav",
        "1C667479": "audio/x-m4a",
        "464F524D": "audio/aiff",
        "FFF14C80": "audio/aac",
        "4F676753": "audio/ogg",
        "3026B275": "video/x-ms-wma",
        "2321414D": "audio/amr",
        "20667479": "video/mp4",
        "20667479": "video/mp4",
        "52494646": "video/avi",
        "3026B275": "video/x-ms-wmv",
        "1BA21000": "video/mpeg",
        "20667479": "video/3gpp",
        "464C5601": "video/x-flv"
    }
    async function verify() {
        const file = document.getElementById("input_file").files[0];
        const magicnumber = await getMagicNumber(file);
        console.log(magicnumber.toString().slice(0, 8), file.type);

        const numbers = Object.keys(magicjson)
        for (let i = 0; i < numbers.length; i++) {
            if (magicnumber.indexOf(numbers[i]) == 0) {
                document.getElementById("type").innerHTML = magicjson[numbers[i]];
                return magicjson[numbers[i]];
            }
        }

        console.error("未知文件！");
    }

    async function getMagicNumber(fileblob) {
        const arraybuffer = await fileblob.arrayBuffer();
        const dataview = new DataView(arraybuffer);
        return dataview.getBigUint64().toString(16).toUpperCase();
    }

    document.getElementById("verify").onclick = verify;

```