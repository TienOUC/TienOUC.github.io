const secret = require('./secret');

module.exports = [
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: '有新的内容更新',
        buttonText: '点击刷新'
      }
    }
  ],
  // [
  //   '@vssue/vuepress-plugin-vssue', {
  //     platform: 'github-v4',
  //     owner: 'TienOUC',
  //     repo: 'vuepress',
  //     clientId: secret.clientId,
  //     clientSecret: secret.clientSecret,
  //     autoCreateIssue: true
  //   }
  // ],
  [
    '@vuepress/nprogress' //网页加载进度条
  ],
  // [
  //   '@vuepress-reco/vuepress-plugin-kan-ban-niang',
  //   {
  //     theme: ['whiteCat'],
  //     clean: true,
  //     height: 150,
  //     width: 90,
  //     modelStyle: {
  //       right: '50px',
  //       bottom: '0px',
  //     }
  //   }

  // ],
  [
    // '@vuepress/back-to-top' //返回页面顶部按钮
    '@vuepress-reco/vuepress-plugin-back-to-top'
    // 'go-top'
  ],
  // [
  //   '@vuepress/google-analytics',
  //   {
  //     ga: secret.ga
  //     // github actions
  //     // 'ga': process.env.GA
  //   }
  // ],
  [
    '@vuepress/medium-zoom',
    {
      selector: 'img',
      options: {
        margin: 16
      }
    }
  ],
  [
    'vuepress-plugin-auto-sidebar',
    {
      sort: {
        mode: 'created_time_asc',
        readmeFirst: true
      },
      title: {
        mode: 'titlecase'
      },
      sidebarDepth: 2,
      collapse: {
        open: true
      }
    }
  ],
  ['vuepress-plugin-flowchart']
];
