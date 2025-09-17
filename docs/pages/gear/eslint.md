---
autoGroup-7: ESLint
title: ESLint
sidebarDepth: 2
date: 2021-04-18
categories:
  - Tools
tags:
  - Tools
---

### 1. ESLint 简介

JavaScript 是一种动态的弱类型解释型语言，没有编译程序，所以一些错误只有在代码执行的时候才能暴露出来，而不像 C/C++ （内置 gcc/g++编译程序）等编译型语言那样，在编译阶段就可以发现问题。因此 Nicholas C. Zakas 于 2013 年 6 月创建了开源项目 [ESLint](https://eslint.org/)，使得原来在执行阶段才能暴露的问题提前到代码编写阶段暴露。

简单来说，ESLint 就是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误，提供一个插件化的 JavaScript 代码检测工具。

**特点：**

> - ESLint 使用 [Espree](https://github.com/eslint/espree) [<sup>[1]</sup>](#refer-anchor) 解析 JavaScript。
> - ESLint 使用 AST [<sup>[2]</sup>](#refer-anchor) 去分析代码中的模式。
> - ESLint 是完全插件化的。每一个规则都是一个插件并且可以在运行时添加更多的规则。

### 2. 本文内容脑图

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051210245.png)

### 3. 理解代码检查

#### 3.1 功能

> - 语言语法检查：例如检查出字符串引号或者函数调用括号没有匹配等问题。
> - 编码错误检查：例如检查出开发者在使用一个不存在的变量或者变量定义了却没有使用等问题。
> - 代码风格检查：例如检查出开发者没有使用分号（与所选风格有关）等问题。

#### 3.2 类型（方式）

> - 编码时检查：编写代码时检查，通常表现为由 IDE 自动实时检查并进行代码提示。
> - 编码后检查：编写代码后检查，通常表现为手动调用检查脚本/工具进行代码的检查或者代码保存后由 IDE 自动检查当前文件。
> - 构建前检查：构建执行前检查，通常表现为将代码检查作为构建任务的一个前置切面，构建时自动触发代码检查。
> - 提交前检查：git commit 前检查，通常表现为将代码检查作为 git commit 的一个 hooks 任务，代码提交前自动触发代码检查。

#### 3.3 工具

代码检查的实现通常不会仅仅是字符串分析处理，这其中会大量涉及到语法分析。既然涉及到语法，那么就需要对不同的代码使用不同的代码检查工具，通常来说，我们会结合 `Prettier`(格式化缩进等)，使用 `ESLint` 工具来实现对 JavaScript 代码的检查，下面重点介绍 ESLint。

### 4. 实现代码检查

#### 4.1 编码后检查

- **首先安装 node^6.14 环境和 ESLint 的 npm 包**

```shell
// 初始化项目
$ npm init -y

// 安装eslint
$ npm install eslint --save-dev

//生成配置文件
$ eslint --init
```

- **生成初始配置文件：**

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051215017.gif)

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051149037.png)

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051149773.png)

- **魔法注释：**

除了配置文件中配置规则，ESLint 还有一个代码中通过注释打规则补丁的办法，如下示例：

```js
// 屏蔽整行的代码检查
const str1 = "${name} is a coder"; // eslint-disable-line
// 屏蔽某一个规则：如此行的no-template-curly-in-string规则
const str2 = "${name} is a coder"; // eslint-disable-line no-template-curly-in-string
```

在安装好 Node 环境和 ESLint 的 npm 包后，禁用 vscode 的 ESLint、Prettier 插件（已经安装的话要禁用），测试如下代码。

- **实践**

不规范代码

```js
//index.js文件

const a = 1;
      var str = "ss";
console.log('111')
```

执行 `eslint index.js` 检查命令

```shell
//编码后检查
 eslint eslint index.js
/code/eslint/index.js
  1:1   error  Expected space or tab after '//' in comment     spaced-comment
  3:7   error  'a' is assigned a value but never used          no-unused-vars
  4:1   error  Expected indentation of 0 spaces but found 6    indent
  4:11  error  'str' is assigned a value but never used        no-unused-vars
  4:11  error  'str' is never reassigned. Use 'const' instead  prefer-const
  4:17  error  Strings must use singlequote                    quotes
  4:21  error  Extra semicolon                                 semi

✖ 7 problems (7 errors, 0 warnings)
  5 errors and 0 warnings potentially fixable with the `--fix` option.
```

在 `.eslintrc.js` 中配置规则

```js
	rules: {
		"quotes": 2,
    "semi": 1,
    "no-console": 1,
    "space-before-function-paren": 0
	}
  //0是忽略，1是警告，2是报错
```

再次执行 `eslint index.js` 检查

```shell
 eslint eslint index.js
/code/eslint/index.js
  1:1   error    Expected space or tab after '//' in comment     spaced-comment
  3:7   error    'a' is assigned a value but never used          no-unused-vars
  4:1   error    Expected indentation of 0 spaces but found 6    indent
  4:11  error    'str' is assigned a value but never used        no-unused-vars
  4:11  error    'str' is never reassigned. Use 'const' instead  prefer-const
  4:17  error    Strings must use singlequote                    quotes
  4:21  warning  Extra semicolon                                 semi
  5:1   warning  Unexpected console statement                    no-console

✖ 8 problems (6 errors, 2 warnings)
  4 errors and 1 warning potentially fixable with the `--fix` option.
```

可以看到因为配置了新规则导致提示信息发生了变化，此时执行 `eslint --fix index.js` 修复

```shell
 eslint eslint --fix index.js
/code/eslint/index.js
  3:7  error    'a' is assigned a value but never used    no-unused-vars
  4:7  error    'str' is assigned a value but never used  no-unused-vars
  5:1  warning  Unexpected console statement              no-console

✖ 3 problems (2 errors, 1 warning)
```

执行完之后，可以看到下面代码中`缩进`、`引号`、`分号`、`var关键字`的报错已自动修复，但未引用的变量仍需手动做删除处理，console.log 的 warning 设置为 `0` 即可消除（因为配置 `"no-console": 1`，所以会有 warning）。

```js
// index.js文件

const a = 1;
const str = "ss";
console.log("111");
```

#### 4.2 编码时检查

项目开发中，若都需要像前面步骤中先执行 `eslint . --fix` 统一格式，再 push 提交代码。或者是把指令添加到 `package.json` 文件中，执行`npm run eslint`，再 push。这样就很麻烦，并且也不够直观，因为错误问题只有在你执行了指令之后才能看到。

为了在编写阶段提示错误信息，就有了可在 IDE 安装集成的格式化插件，以 VsCode 为例，安装 ESLint 插件，在设置中打开实时检查功能，并配置好相应规则即可。

```json
//配置eslint
  "editor.codeActionsOnSave": { // 保存时自动fix
      "source.fixAll.eslint": true
  },
  "eslint.quiet": true,   // warning时不报红色下划线，可用于处理no-console规则爆的warning
```

错误修复：若有规则冲突，可以修改项目目录下的 `.eslintrc.js` 文件，VsCode 插件设置很傻瓜化，这里不做过多介绍。

> - 同时安装了 ESLint 的 npm 包和 IDE 插件时，优先执行哪个配置呢？若项目中有 `.eslintrc.js` 文件，则优先执行`.eslintrc.js` 文件配置。

#### 4.3 Webpack 构建前检查

- (1) 安装 ESLint 并初始化 ESLint 配置文件

```shell
npm install eslint --dev
eslint --init
```

- (2) 安装 eslint-loader

```shell
npm install eslint-loader --dev
```

- (3) webpack 配置

```js
rules: [
	{
		test: /.js$/,
		exclude: /node_modules/,
		use: [
			"babel-loader",
			"eslint-loader", // webpack的里的数组配置选项是右执行，即写在后面的先执行，依次往左
		],
	},
];
```

因为内部项目使用 webpack 打包，所以其他构建工具（gulp 等）略

#### 4.4 Git 提交前检查

两种实现方法

- (1) Git Hooks

Git Hook 也称之为 git 钩子，每个钩子都对应一个任务，通过 shell 脚本可以编写钩子任务触发时要具体执行的操作。
本文关注实现 git 提交前的代码检查，所以我们只看 git commit 这个钩子，使用步骤如下：

> 1. 编写 hook 任务：项目的.git/hooks 文件夹下新建一个 pre-commit 文件
>
> ```shell
> #!/bin/sh
> echo "before commit" //  设置 npm run lint 即为执行 ESLint 检查
> ```
>
> 2. 触发钩子：项目下执行 git commit 命令  
>    git commit 命令执行后，可以发现 commit 操作不管是否成功，都可以看到输出的 before commit 信息。但这种编写 shell 脚本的方法依然不够简洁易用。这里推荐 [husky](https://typicode.github.io/husky/#/)[<sup>[4]</sup>](#refer-anchor)。

- (2) husky

> 1. 使用 `npm install -D husky` 安装 husky。
> 2. 在 packgae.json 中添加 prepare 脚本。
>
> ```js
> {
>  "scripts": {
>    "prepare": "husky install"
>  }
> }
> ```

prepare 脚本会在 npm install 安装依赖之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 `husky install` 命令，该命令会创建 `.husky/` 目录并指定该目录为 git hooks 所在的目录。

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051836624.png)

添加 git hooks，运行以下命令创建 git hooks

```shell
$ npx husky add .husky/pre-commit "npm run lint"
```

运行完该命令后我们会看到 `.husky/` 目录下新增了一个名为`pre-commit` 的 shell 脚本。也就是说在在执行 git commit 命令时会先执行 pre-commit 这个脚本。pre-commit 脚本内容如下:

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112051837047.png)

![](https://cdn.jsdelivr.net/gh/tienouc/blog-img/202112052212973.png)

**若 husky 版本是 v7.0+, 则需要把 npm 也升级到 v7.0+**

### 5. Prettier + ESLint

#### 5.1 解决冲突

项目中同时使用 ESLint + Prettier 时，往往会有一些冲突，比如 **ESLint 默认是要双引号，加分号的。而 Prettier 默认是单引号，不加分号的。所以这两个默认配置会冲突。** 本质原因是 ESLint 既负责了代码质量检测，又负责了一部分的格式美化工作，格式化的部分规则和 Prettier 不兼容。能不能让 ESLint 只负责代码质量检测而让 Prettier 负责美化呢? 社区已经有了解决方案，即 `eslint-config-prettier + eslint-plugin-prettier`。

> - `eslint-config-prettier` 的作用是关闭 ESLint 中与 Prettier 相互冲突的规则。
> - `eslint-plugin-prettier` 的作用是赋予 ESLint 用 Prettier 格式化代码的能力。

```shell
// 安装依赖
npm install eslint-config-prettier eslint-plugin-prettier -D
```

修改 `.eslintrc.js`

```js
// .eslintrc.js
{
   // 其余的配置
 - "extends": ["plugin:vue/essential", "standard"]
 + "extends": ["plugin:vue/essential", "standard",  "plugin:prettier/recommended"]
  // 其余的配置
}
```

`plugin:prettier/recommended` 这个规则具体做了什么？

```js
// node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js
module.exports = {
	// plugin:prettier/recommended 就是加载这个
	configs: {
		recommended: {
			extends: ["prettier"],
			plugins: ["prettier"],
			rules: {
				"prettier/prettier": "error",
				"arrow-body-style": "off",
				"prefer-arrow-callback": "off",
			},
		},
	},
	// 其他的
};
```

加载了 `node_modules/eslint-plugin-prettier/eslint-plugin-prettier.js` 文件导出的 `configs` 中的 `recommended` 配置项。下面解析他们分别做了什么。

> - `extends: ['prettier']`: 通过 `eslint-config-prettier` 关闭 ESLint 和 Prettier 相冲突的规则。
> - `plugins: ['prettier']`: 加载 `eslint-plugin-prettier`，赋予 ESLint 用 Prettier 格式化文档的功能
> - `'prettier/prettier': 'error'`: 让代码文件中不符合 Prettier 格式化规则的都标记为错误，结合 vscode-eslint 插件便可以看到这些错误被标记为红色，当运行 `eslint --fix` 命令时，将自动修复这些错误。
> - `arrow-body-style` 和 `prefer-arrow-callback`: 这两个规则在 ESLint 和 Prettier 中存在不可解决的冲突，所以关闭掉。

#### 5.2 常用配置

- `.prettierrc.js` 文件常用配置

```js
module.exports = {
	// tab缩进大小,默认为2
	tabWidth: 4,
	// 使用tab缩进，默认false
	useTabs: false,
	// 使用分号, 默认true
	semi: false,
	// 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	singleQuote: false,
	// 行尾逗号,默认none,可选 none|es5|all
	// es5 包括es5中的数组、对象
	// all 包括函数对象等所有可选
	trailingCooma: "all",
	// 对象中的空格 默认true
	// true: { foo: bar }
	// false: {foo: bar}
	bracketSpacing: true,
	// JSX标签闭合位置 默认false
	// false: <div
	//          className=""
	//          style={{}}
	//       >
	// true: <div
	//          className=""
	//          style={{}} >
	jsxBracketSameLine: false,
	// 箭头函数参数括号 默认avoid 可选 avoid| always
	// avoid 能省略括号的时候就省略 例如x => x
	// always 总是有括号
	arrowParens: "avoid",
};
```

- 查看整个项目不符合 ESLint 配置的所有文件，并且可以一次性修改所有不符合 ESLint 配置的文件。

```js
  //在 package.json 文件中添加 checklint 和 reviselint 命令
  "scripts": {
    "checklint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "reviselint": "eslint --fix --ext .js,.vue --ignore-path .gitignore ."
  },

```

### 参考资料

<div id="refer-anchor"></div>

**[1]**&nbsp;Espress 是 [Esprima](https://esprima.org/) 的一个分支，Esprima 是一个用于教育目的 ECMAScript(JavaScript) 解析架构，主要用于多用途分析。其本身也是使用 ECMAScript 编写的。

- **主要特性：**

> - 支持[ECMAScript 5.1](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
> - 抽象语法树 (AST) 敏感的格式，兼容 Mozilla [Parser API](https://developer.mozilla.org/en-US/docs/Glossary/Parser)
> - 经过重度测试，超过 500 个单元测试以及 100% 的代码覆盖
> - 可选跟踪语法节点定位 (index-based and line-column)
> - 超级快，速度是 UglifyJS parse-js 的 2.5 倍([speed comparison](https://esprima.org/test/compare.html))

**[2]**&nbsp;[javascript ast 介绍](https://www.jianshu.com/p/9d47ff51ffbe)

**[3]**&nbsp;[ESLint](https://eslint.org/)

**[4]**&nbsp;[husky](https://typicode.github.io/husky/#/) | [GitHook 工具 —— husky（格式化代码）](https://juejin.cn/post/6947200436101185566)

**[5]**&nbsp;[Prettier](https://prettier.io/) | [Eslint + Prettier + stylelint + Husky + Lint-staged 规范你的工程代码规范](https://juejin.cn/post/7018053886699110407)
