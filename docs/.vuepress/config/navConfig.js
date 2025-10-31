module.exports = [
	{
		text: "主页",
		link: "/",
		icon: "reco-home",
	},
	// {
	// 	text: "新闻",
	// 	items: [
	// 		{
	// 			text: "",
	// 			items: [
	// 				{
	// 					text: "全球财经",
	// 					link: "https://news.dodolo.top",
	// 				},
	// 				{
	// 					text: "新冠疫情",
	// 					link: "https://covid.dodolo.top",
	// 				},
	// 				{
	// 					text: "InfoQ",
	// 					link: "https://www.infoq.cn",
	// 				},
	// 			],
	// 		},
	// 	],
	// 	icon: "reco-blog",
	// },
	{
		text: "分类",
		items: [
			{
				text: "前端",
				items: [
					{ text: "JavaScript", link: "/pages/frontend/javascript/" },
					{ text: "TypeScript", link: "/pages/frontend/typescript/" },
					{ text: "Framework", link: "/pages/frontend/framework/" },
					{ text: "CSS", link: "/pages/frontend/css/" },
					{ text: "协议类", link: "/pages/frontend/protocol/" },
					{ text: "组件库", link: "/pages/components/" },
					{ text: "设计模式", link: "/pages/frontend/design-pattern/" },
				],
			},
			{
				text: "后端",
				items: [
					{ text: "Python", link: "/pages/backend/python/" },
					{ text: "Database", link: "/pages/backend/server/" },
				],
			},
			{
				text: "算法",
				items: [
					{ text: "算法归纳", link: "/pages/algorithm/summarization/" },
					{ text: "数据结构", link: "/pages/algorithm/data-structure/" },
				],
			},
			{
				text: "大模型",
				items: [
					{ text: "LLM知识归纳", link: "/pages/llm/" }
				],
			},
			{
				text: "其他",
				items: [
					{ text: "工具类", link: "/pages/gear/" },
					{ text: "自动化", link: "/pages/automator/" },
					{ text: "小程序", link: "/pages/miniprogram/" },
					{ text: "小总结", link: "/pages/summary/" }
				],
			},
		],
		icon: "reco-category",
	},
	{
		text: "标签",
		link: "/tag/",
		icon: "reco-tag",
	},
	{
		text: "时间轴",
		link: "/timeLine/",
		icon: "reco-date",
	},
	{
		text: "联系我",
		items: [
			{
				text: "",
				items: [
					// {
					// 	text: "Gitee",
					// 	link: "https://gitee.com/tienouc",
					// 	icon: "reco-mayun",
					// },
					{
						text: "Github",
						link: "https://github.com/TienOUC",
						icon: "reco-github",
					},
					{
						text: "TextMe",
						link: "/pages/contact/",
						icon: "reco-suggestion",
					},
					// { text: '关于我', link: '/pages/about/', icon: 'reco-faq' }
				],
			},
		],
		icon: "reco-account",
	},
];
