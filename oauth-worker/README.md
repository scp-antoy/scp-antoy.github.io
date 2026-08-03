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

## 命令行部署（推荐，可由 Codex 自动完成）

1. 在 https://dash.cloudflare.com/profile/api-tokens 创建 API Token，选择模板 `Edit Cloudflare Workers`，创建后复制 Token。
2. 把 Token 粘贴到 `C:\Users\Mao\Documents\Codex\2026-08-03\w\work\cloudflare-token.txt`。
3. 在 https://github.com/settings/applications/3770488 生成 Client Secret，粘贴到 `C:\Users\Mao\Documents\Codex\2026-08-03\w\work\github-oauth-secret.txt`。
4. 在项目目录运行：

```powershell
cd oauth-worker
$env:CLOUDFLARE_API_TOKEN = Get-Content "C:\Users\Mao\Documents\Codex\2026-08-03\w\work\cloudflare-token.txt"
npx wrangler deploy
Get-Content "C:\Users\Mao\Documents\Codex\2026-08-03\w\work\github-oauth-secret.txt" | npx wrangler secret put GITHUB_CLIENT_SECRET
```
