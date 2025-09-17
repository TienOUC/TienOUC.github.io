---
autoGroup-8: StoryBook
title: StoryBook
isTimeLine: true
date: 2020-06-28
categories:
  - FrontEnd
tags:
  - Tools
---

::: tip
[ Storybook ](https://storybook.js.org) 是一款可以让开发者独立开发 React、Vue 等组件的响应式开源工具
:::

<!-- more -->

## 1. 安装

```
cd my-project-directory
npx -p @storybook/cli sb init
```

项目根目录下生成 `.storybook` , `src` 下生成 `stories`---组件示例

`yarn storybook` 启动后即可看到类似如下的组件展示页面

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gge3fay2lyj30va0jb408.jpg)

因为 storybook 是独立于 react-cli 运行的，所以在 `.storybook` 下新增 `preview.js` ，配置如下

```js
import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/theme';
import 'story.css';

addDecorator((storyFn) => {
	return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
});

addParameters({
	options: {
		showRoots: true,
	},
});
```

## 2. 新建组件

在项目 `src` 下新建 `components/Avatar` 组件文件夹，包含 `index.js`、 `style.js`、 `avatar.stories.js`三个文件

- index.js

```js
import React from 'react';
import PropTypes from 'prop-types';
import avatarImg from 'assets/images/avatar.jpg';
import StyledAvatar, { StatusIcon, AvatarClip, AvatarImage } from './style';

function Avatar({ src, size = '48px', status, statusIconSize = '8px' }) {
	return (
		<StyledAvatar>
			{status && <StatusIcon status={status} size={statusIconSize}></StatusIcon>}
			<AvatarClip size={size}>
				<AvatarImage src={avatarImg} />
			</AvatarClip>
		</StyledAvatar>
	);
}

Avatar.propTypes = {
	src: PropTypes.string.isRequired,
	size: PropTypes.string,
	status: PropTypes.oneOf(['online', 'offline']),
	statusIconSize: PropTypes.string,
};

export default Avatar;
```

- style.js

```js
import styled, { css } from 'styled-components';
import { circle } from 'utils/mixins';

const circleMixinFn = (color, size = '8px') => css`
	content: '';
	display: block;
	position: absolute;
	${circle(color, size)}
`;

const StyledAvatar = styled.div`
	position: relative;
`;

const StatusIcon = styled.div`
	position: absolute;
	left: 2px;
	top: 4px;

	&::before {
		${({ size }) => circleMixinFn('#f1f2f3')};
		transform: scale(2);
	}

	&::after {
		${({ theme, status, size }) => {
			if (status === 'online') {
				return circleMixinFn(theme.green, size);
			} else if (status === 'offline') {
				return circleMixinFn(theme.gray, size);
			}
		}};
	}
`;

const AvatarClip = styled.div`
	width: ${({ size }) => size};
	height: ${({ size }) => size};
	border-radius: 50%;
	overflow: hidden;
`;

const AvatarImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`;
export default StyledAvatar;
export { StatusIcon, AvatarClip, AvatarImage };
```

- avatar.stories.js

```js
import React from 'react';
import Avatar from '.';
import avatarImg from 'assets/images/avatar.jpg';

export default {
	title: 'UI组件/ Avatar',
	component: Avatar,
};

export const Default = () => {
	return <Avatar src={avatarImg} />;
};

export const Size = () => {
	return (
		<div className="row-elements">
			<div>
				<Avatar src={avatarImg} size="48px" />
			</div>
			<div>
				<Avatar src={avatarImg} size="56px" />
			</div>
			<div>
				<Avatar src={avatarImg} size="64px" />
			</div>
			<div>
				<Avatar src={avatarImg} size="72px" />
			</div>
		</div>
	);
};

export const WithStatus = () => {
	return (
		<div className="row-elements">
			<div>
				<Avatar src={avatarImg} status="online" />
			</div>
			<div>
				<Avatar src={avatarImg} status="offline" />
			</div>
			<div>
				<Avatar src={avatarImg} status="online" size="64px" />
			</div>
		</div>
	);
};
```

`yarn storybook` 启动

![](https://tva1.sinaimg.cn/large/007S8ZIlly1gge3e1px0lj30tm0jntah.jpg)

## 3. Hygen

各个组件的文件夹结构相同，引入代码也有相同的部分，此时利用 Hygen 模版生成器就可以一键生成，省去了手动创建文件和编写相同代码，提高了开发效率。

### 3.1 安装配置

```
yarn add global hygen  //安装
hygen init self  // 初始化
```

安装初始化后项目根目录下生成了 `_templates`，再使用 `hygen generator new component` 命令来创建组件模版生成器的模版，在 `_templates/component/new` 下新建 `index.ejs.t`、 `stories.ejs.t` 、`style.ejs.t`三个文件，配置如下:

- index.ejs.t

```js
---
to: src/components/<%= name %>/index.js
---

import React from 'react'
import PropTypes from 'prop-types'
import Styled<%= name %> from './style';

function <%= name %> ({children, ...rest}) {
    return (
        <Styled<%= name %> {...rest}>
            {children}
        </Styled<%= name %>>
    )
}

<%= name %>.propTypes = {
    children: PropTypes.any
}

export default <%= name %>
```

- stories.ejs.t

```js
---
to: src/components/<%= name %>/<%= h.changeCase.lcFirst(name)%>.stories.js
---

import React from 'react'
import <%= name %> from '.';

export default {
    title: '<%= name %>',
    component: <%= name %>
}

export const Default = () => {
    return <<%= name %>> Default </<%= name %>>
}
```

- style.ejs.t

```js
---
to: src/components/<%= name %>/style.js
---

import styled from 'styled-components'

const Styled<%= name %> = styled.div``

export default Styled<%= name %>
```

其中 `name` 是组件名

然后使用 `hygen component new [组件名]` 即可生成组件初始文件，以上各个文件内容会自动写入

## 4. 项目（React-IM）

React + Styled-Components + React-Spring + Storybook

:link: [ React-IM ](https://tienouc.gitee.io/react-im)  
:link: [ 视频 ](http://blog.dodolo.top/video/React-IM.mp4)
