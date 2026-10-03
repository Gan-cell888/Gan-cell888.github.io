import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gan-cell888.github.io',
  // 博客挂在 /blog/，根目录留给个人品牌站
  base: '/blog',
  output: 'static',
  integrations: [sitemap()],
});
