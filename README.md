# 恒温的树洞 - Astro 博客

一个简洁、优雅的个人博客，基于 Astro 框架构建。

🔗 **在线访问**：https://gan-cell888.github.io/

## ✨ 特性

- 📝 **Markdown 写作** — 使用 Markdown 撰写文章，简单高效
- 🏷️ **标签系统** — 文章支持多标签筛选
- 📚 **归档页面** — 按时间线浏览所有文章
- 🌙 **暗色模式** — 支持切换主题，自动保存偏好
- 💬 **留言板** — 基于 GitHub Discussions 的评论系统
- ✨ **科技感动效** — 鼠标光效、卡片发光、打字机效果
- 📱 **响应式设计** — 适配各种屏幕尺寸
- 🔍 **SEO 友好** — 自动生成 meta 标签、sitemap、robots.txt
- 🚀 **高性能** — Astro 静态生成，加载速度极快

## 📂 项目结构

```
my-blog-astro/
├── public/                  # 静态资源
│   ├── assets/images/       # 图片资源
│   ├── favicon.svg          # 网站图标
│   ├── robots.txt           # 爬虫配置
│   └── sitemap.xml          # 网站地图
├── src/
│   ├── components/          # Astro 组件
│   │   ├── Header.astro     # 顶部导航
│   │   ├── Footer.astro     # 页脚
│   │   ├── CursorGlow.astro # 鼠标光效
│   │   ├── ThemeToggle.astro # 暗色模式切换
│   │   ├── TypingEffect.astro # 打字机效果
│   │   └── TagFilter.astro  # 标签筛选
│   ├── content/
│   │   ├── config.ts        # 内容集合配置
│   │   └── posts/           # Markdown 文章
│   ├── layouts/
│   │   ├── BaseLayout.astro # 基础布局
│   │   └── PostLayout.astro # 文章布局
│   ├── pages/
│   │   ├── index.astro      # 首页
│   │   ├── about.astro      # 关于页面
│   │   ├── archive.astro    # 归档页面
│   │   ├── guestbook.astro  # 留言板
│   │   └── posts/
│   │       └── [...slug].astro # 动态文章路由
│   ├── scripts/
│   │   └── main.js          # 客户端脚本
│   └── styles/
│       └── global.css       # 全局样式
├── astro.config.mjs         # Astro 配置
├── package.json
└── tsconfig.json
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:4321 预览。

### 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 📝 写新文章

1. 在 `src/content/posts/` 目录创建新的 `.md` 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: 文章标题
date: 2026-06-27
category: 分类
tags: [标签1, 标签2]
readTime: 5 分钟阅读
cover: /assets/images/posts/cover.jpg  # 可选
description: 文章描述
---

文章内容...
```

3. 运行 `npm run build` 重新构建

## 🎨 自定义

### 修改主题颜色

编辑 `src/styles/global.css` 中的 CSS 变量：

```css
:root {
  --accent: #4f46e5;        /* 主色调 */
  --accent-light: #818cf8;  /* 浅色主调 */
  /* ... */
}
```

### 配置留言板

留言板使用 [Giscus](https://giscus.app/)，需要：

1. 在 GitHub 仓库开启 Discussions
2. 安装 [Giscus App](https://github.com/apps/giscus)
3. 在 https://giscus.app 获取配置参数
4. 更新 `src/pages/guestbook.astro` 中的配置

## 🚀 部署

### GitHub Pages

1. 在 GitHub 仓库设置中启用 GitHub Pages
2. 选择 GitHub Actions 作为部署源
3. 推送代码到 main 分支，自动部署

### 其他平台

构建 `dist/` 目录可以部署到任何静态托管平台：

- Vercel
- Netlify
- Cloudflare Pages

## 📄 License

MIT

---

> 用代码搭建，用文字记录。
