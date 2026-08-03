# scp-antoy 的博客

基于 Astro 的个人博客，部署在 GitHub Pages。

## 本地开发

```powershell
npm.cmd run dev
```

打开 http://localhost:4321 预览。

## 写一篇文章

1. 在 `src/content/blog/` 下新建一个 Markdown 文件，例如 `my-post.md`。
2. 在文件开头填写如下信息：

```yaml
---
title: 文章标题
description: 一句话摘要
pubDate: 2026-01-01
tags:
  - 标签1
  - 标签2
draft: false
---
```

3. 正文用 Markdown 语法书写。
4. 发布：

```powershell
npm.cmd run build
git add .
git commit -m "新文章"
git push
```

推送后 GitHub Actions 会自动构建并发布，约 1-2 分钟生效。如果暂时不想让某篇文章上线，把 `draft` 改成 `true`。

## 修改站点信息

- 博客标题和副标题：`src/pages/index.astro`
- 导航和页脚：`src/layouts/BaseLayout.astro`
- 关于页：`src/pages/about.astro`
- 全站样式：`src/styles/global.css`

## 后台管理（可视化编辑器）

后台地址：`/admin/`，可以像博客后台一样新建、编辑文章，保存后自动提交并触发部署。

本地使用（不依赖线上能否访问）：

```powershell
npm.cmd run dev
npm.cmd run admin
```

然后打开 http://localhost:4321/admin/ ，文章会直接保存到本地仓库，之后再 `git push` 发布。

线上使用：访问 `https://scp-antoy.github.io/admin/`，首次需要创建 GitHub OAuth App：

1. 打开 https://github.com/settings/developers ，点 New OAuth App
2. Application name 填 `scp-antoy blog`
3. Homepage URL 填 `https://scp-antoy.github.io/`
4. Authorization callback URL 填 `https://scp-antoy.github.io/admin/`
5. 创建后复制 Client ID，填到 `public/admin/config.yml` 的 `app_id`，然后推送
6. 刷新后台页面，用 GitHub 账号登录即可
