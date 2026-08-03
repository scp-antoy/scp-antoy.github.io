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

后台地址：`/admin/`，可以在网页里像博客后台一样新建、编辑文章。

使用方法：

```powershell
npm.cmd run dev       # 启动预览服务器
npm.cmd run admin     # 启动本地后台代理
```

打开 http://localhost:4321/admin/ ，在后台编辑保存文章（更改会写入本地仓库）。完成后运行：

```powershell
npm.cmd run publish   # 一键提交并推送到 GitHub，触发线上部署
```

> 线上后台访问暂不可用（gfw），本地后台完全不受影响。如需远端写稿，可直接在 GitHub 网页编辑 `src/content/blog/` 下的 Markdown 文件，保存后同样会自动发布。
