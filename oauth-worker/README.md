# 博客后台 OAuth 代理（Cloudflare Worker）

Decap CMS 的 GitHub 在线登录需要一个 OAuth 代理服务。这个 Worker 就是代理，部署到 Cloudflare 免费版即可。

## 部署步骤

1. 打开 https://dash.cloudflare.com/ 注册或登录（免费）。
2. 左侧选择 Workers & Pages，点 Create application → Create Worker。
3. 把 `worker.js` 的完整内容粘贴进编辑器，点 Deploy。
4. 在 Worker 的 Settings → Variables 里添加两个环境变量：
   - `GITHUB_CLIENT_ID`：你的 GitHub OAuth App 的 Client ID
   - `GITHUB_CLIENT_SECRET`：你的 GitHub OAuth App 的 Client Secret（在 https://github.com/settings/applications/3770488 页面 Generate a new client secret 生成）
5. 打开 https://github.com/settings/applications/3770488 ，把 Authorization callback URL 改成：
   `https://你的Worker域名.workers.dev/callback`
6. 把 `https://你的Worker域名.workers.dev` 填到博客 `public/admin/config.yml` 的 `backend.base_url`，推送后线上后台即可登录。

注意：Client Secret 只在 Cloudflare 环境变量里设置，不要发到聊天或提交进代码。
