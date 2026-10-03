#!/usr/bin/env bash
set -euo pipefail

# 把两套站点拼成一份可直接发布的目录：
#   site/      根目录静态品牌站（主入口）
#   site/blog/ Astro 博客
rm -rf site
mkdir -p site

cp index.html styles.css main.js i18n.js posts-data.js site/
cp -r assets site/assets
cp -r dist/. site/blog/
cp dist/robots.txt site/robots.txt

# 旧博客地址保留跳转页，避免已分享出去的链接失效
redirect() {
  local from="$1" to="$2"
  mkdir -p "site/$from"
  printf '%s' "<!DOCTYPE html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\">\
<meta http-equiv=\"refresh\" content=\"0;url=$to\">\
<link rel=\"canonical\" href=\"$to\">\
<title>页面已迁移</title></head>\
<body><p>页面已迁移至 <a href=\"$to\">$to</a></p></body></html>" > "site/$from/index.html"
}

for path in archive about guestbook; do
  redirect "$path" "/blog/$path/"
done

for dir in dist/posts/*/; do
  [ -d "$dir" ] || continue
  slug="$(basename "$dir")"
  redirect "posts/$slug" "/blog/posts/$slug/"
done

echo "staged $(find site -type f | wc -l) files into site/"
