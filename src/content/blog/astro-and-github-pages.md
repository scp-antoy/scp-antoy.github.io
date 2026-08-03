---
title: 把博客发布到 GitHub Pages
description: 记录本站的技术方案：Astro 静态站加 GitHub Actions 自动部署。
pubDate: 2026-08-03
tags:
  - 博客
  - GitHub
draft: false
---

本站用 Astro 生成静态页面，代码放在 GitHub 仓库里。每次推送到 `main` 分支后，GitHub Actions 会自动构建，并把结果发布到 GitHub Pages。

以后写文章只需要在 `src/content/blog` 下新建一个 Markdown 文件，填好标题、日期和标签，然后提交推送，一两分钟后线上就会更新。
