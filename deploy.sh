# #!/usr/bin/env sh

# # 确保脚本抛出遇到的错误
# set -e

# # 生成静态文件
# yarn docs:build

# # 进入生成的文件夹
# cd docs/.vuepress/dist

# # 如果是发布到自定义域名
# # echo 'www.example.com' > CNAME

# git init
# git add -A
# git commit -m "deploy：$(TZ="Asia/Beijing" date +"%Y-%m-%d %T %Z")"

# # 如果发布到 https://<USERNAME>.github.io
# #git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# # 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:TienOUC/vuepress.git master:gh-pages

# cd -


## Github Action CI
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
yarn
# 生成静态文件
echo "module.exports = { clientId: '${VSSUE_CLIENTID}', clientSecret: '${VSSUE_CLIENTSECRET}', appID: '${VALINE_APPID}', appKey: '${VALINE_APPKEY}', ga: '${GOOGLE_SERACH}' }" > docs/.vuepress/config/secret.js
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# Deploy to GitHub
if [ -z "$ACCESS_TOKEN" ]; then
  msg='deploy'
  githubUrl=git@github.com:TienOUC/vuepress.git
else
  msg='GitHub Action CI/CD'
  githubUrl=https://TienOUC:${ACCESS_TOKEN}@github.com/TienOUC/vuepress.git
  git config --global user.name "tienouc"
  git config --global user.email "${ACCESS_EMAIL}"
fi
git init
git add -A
git commit -m "${msg}：$(TZ="Asia/Beijing" date +"%Y-%m-%d %T %Z")"
git push -f $githubUrl master:gh-pages # 推送到github

cd -
