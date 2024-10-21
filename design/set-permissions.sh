#!/bin/sh

# `/usr/share/nginx/html` のパーミッションを修正
chmod -R 755 /usr/share/nginx/html

# ファイル所有者を nginx ユーザーに変更
chown -R nginx:nginx /usr/share/nginx/html

# nginx をフォアグラウンドで起動
exec "$@"

