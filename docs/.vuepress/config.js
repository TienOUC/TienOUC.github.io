const headConfig = require('./config/headConfig');
const pluginsConfig = require('./config/pluginsConfig');
const navConfig = require('./config/navConfig');
const markdownConfig = require('./config/markdownConfig');
const secret = require('./config/secret');

module.exports = {
  // base: "/vuepress/", // deploy github-pages/
  base: '/', // deploy aliyun
  title: "Zephyr's Blog",
  description: 'The truth is what it is, not what you see.',
  markdown: markdownConfig,
  head: headConfig,
  plugins: pluginsConfig,
  themeConfig: {
    smoothScroll: true,
    // lastUpdated: '更新时间',
    nav: navConfig,
    // subSidebar: 'auto',
    //vuepress-theme-reco 第三方主题配置
    author: 'Zephyr',
    type: 'blog',
    logo: '/assets/img/logo.png',
    authorAvatar: '/assets/img/avatar.jpg',
    // valineConfig: {
    //   appId: secret.appId,
    //   appKey: secret.appKey,
    //   // visitor: true // 阅读量统计
    //   // github actions
    //   // appId: JSON.stringify(process.env.VALINE_APPID),
    //   // appKey: JSON.stringify(process.env.VALINE_APPKEY)
    // },

    // vssueConfig: {
    // 	platform: 'github-v4',
    // 	owner: 'TienOUC',
    // 	repo: 'vuepress',
    // 	clientId: secret.clientId,
    // 	clientSecret: secret.clientSecret,
    // },
    // friendLink: [
    //   // {
    //   //   title: '稚晖的个人小站',
    //   //   desc: '十年饮冰，难凉热血',
    //   //   // logo: 'http://www.pengzhihui.xyz/favicon.png',
    //   //   logo:
    //   //     'https://tva1.sinaimg.cn/large/008eGmZEgy1gpfmx6j8khj303k03k3yn.jpg',
    //   //   link: 'http://www.pengzhihui.xyz/archives/'
    //   // },
    //   {
    //     title: '阮一峰',
    //     desc: '阮一峰的网络日志',
    //     // logo: 'http://www.ruanyifeng.com/favicon.ico',
    //     logo:
    //       'https://tva1.sinaimg.cn/large/008eGmZEgy1gpfmx8wr8hj300w00wa9t.jpg',
    //     link: 'http://www.ruanyifeng.com/blog/'
    //   },
    //   // {
    //   //   title: '峰华前端工程师',
    //   //   desc: 'Hello! 我是张旭乾',
    //   //   logo: 'https://zxuqian.cn/img/favicon.ico',
    //   //   link: 'https://zxuqian.cn/'
    //   // },
    //   // {
    //   //   title: '青春永不落幕',
    //   //   desc: '一位网页设计和收集Windows平台软件的爱好者',
    //   //   logo: 'https://qcyblm.github.io/favicon.ico',
    //   //   link: 'https://qcyblm.github.io/'
    //   // }
    //   // {
    //   // 	title: 'vuepress-theme-reco',
    //   // 	desc: '一款简约的VuePress博客&文档主题',
    //   // 	logo: 'https://tva1.sinaimg.cn/large/008i3skNgy1gqlm89wvpyj301s01sgld.jpg',
    //   // 	link: 'https://vuepress-theme-reco.recoluan.com',
    //   // },
    // ],
    noFoundPageByTencent: false, // 404 腾讯公益
    // 备案
    // record: '京ICP备20029652号',
    // recordLink: 'http://www.beian.miit.gov.cn',
    // // cyberSecurityRecord: '京公网安备',
    // // cyberSecurityLink: '公安部备案指向链接',
    // // // 项目开始时间，只填写年份
    startYear: '2019'
  },
  //vuepress-theme-reco 第三方主题配置
  theme: 'reco',
  // 博客配置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: 'Category' // 默认文案 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag' // 默认文案 “标签”
    }
  }
};
