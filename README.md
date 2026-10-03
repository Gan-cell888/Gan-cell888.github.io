# 恒温的树洞 — 个人品牌站 & Astro 博客

在武汉，用代码与文字，把复杂的技术写成有温度的故事。

🔗 **在线访问**：https://gan-cell888.github.io/

## ✨ 当前站点（个人品牌站）

根目录的静态站点是主入口，可直接用任意静态服务器打开。

### 特性

- 🎨 **品牌视觉** — 冷暖「恒温」色温体系，深色 / 明亮双主题
- 🧊 **3D 首屏** — Three.js 粒子场、浮动几何与连线网络
- 🎛️ **色温控制** — 右侧滑杆实时调节全站冷暖色调
- 🌗 **明暗主题** — 右上角切换，偏好写入 `localStorage`，并同步 Giscus
- 🌐 **中英双语** — 右上角 `EN` / `中` 切换，覆盖导航与主要文案
- 📚 **真实作品** — 原博客文章：读书笔记、生活随笔，支持筛选与全文阅读
- 💬 **GitHub 留言** — Giscus（GitHub Discussions），失败时提供降级入口
- 📱 **响应式** — 电脑与手机自适应，含移动菜单与触控布局
- 🎯 **交互** — 作品筛选、卡片 3D 倾斜、磁吸按钮、滚动显现、表单校验

### 入口文件

```
├── index.html          # 页面结构（主入口）
├── styles.css          # 视觉系统 / 明暗主题 / 响应式
├── main.js             # 交互、3D、阅读层、表单、Giscus
├── i18n.js             # 明暗主题 + 中英文案
├── posts-data.js       # 原博客文章数据（供作品/写作区渲染）
└── assets/
    ├── avatar.jpg      # 头像
    └── covers/         # 六篇作品封面
```

### 本地预览

```bash
# 任意静态服务器均可，例如：
python -m http.server 5173 --bind 127.0.0.1
```

访问 http://127.0.0.1:5173/ 。

### 内容说明

- 作品区 / 写作区数据来自 `posts-data.js`（与 `src/content/posts/` 的 Markdown 对应）
- 修改文章标题、简介或正文时，建议同时更新 `posts-data.js` 与对应 Markdown
- 新增作品封面放入 `assets/covers/`，在 `index.html` 作品卡片中引用

---

## 📝 Astro 博客（源工程）

`src/` 下仍是基于 Astro 的博客工程，用于 Markdown 写作、归档、留言等页面。

### 特性

- 📝 **Markdown 写作** — 使用 Markdown 撰写文章
- 🏷️ **标签系统** — 文章支持多标签筛选
- 📚 **归档页面** — 按时间线浏览所有文章
- 🌙 **暗色模式** — 支持切换主题
- 💬 **留言板** — 基于 GitHub Discussions（Giscus）
- 🔍 **SEO 友好** — meta、sitemap、robots.txt
- 🚀 **静态生成** — Astro 构建

### 项目结构（节选）

```
├── public/                  # 静态资源
├── src/
│   ├── components/          # Astro 组件
│   ├── content/posts/       # Markdown 文章
│   ├── layouts/             # 页面布局
│   ├── pages/               # 路由页面
│   └── scripts/             # 客户端脚本
├── astro.config.mjs
└── package.json
```

### 常用命令

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 产物在 dist/
```

### 写新文章

1. 在 `src/content/posts/` 创建 `.md` 文件
2. 添加 frontmatter：

```markdown
---
title: 文章标题
date: 2026-06-27
category: 分类
tags: [标签1, 标签2]
readTime: 5 分钟阅读
description: 文章描述
---
```

3. 如需出现在品牌站作品/写作区，同步更新 `posts-data.js`

### 留言板（Giscus）

1. 在 GitHub 仓库开启 Discussions
2. 安装 [Giscus App](https://github.com/apps/giscus)
3. 在 https://giscus.app 获取配置参数
4. 更新 `src/pages/guestbook.astro` 或根目录 `main.js` 中的 `data-repo` 等配置

当前配置指向：`Gan-cell888/Gan-cell888.github.io` · General 分类

---

## 🚀 部署

- **GitHub Pages**：推送 `main` 后由 Actions 自动部署
- **其他平台**：可直接托管根目录静态文件，或部署 `dist/`

## 📄 License

MIT

---

> 用代码搭建，用文字记录。写代码 / 拍照片 / 看书 / 记录生活。
