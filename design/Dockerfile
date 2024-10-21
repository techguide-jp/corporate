FROM nginx:alpine

# パーミッション修正スクリプトをコンテナにコピー
COPY set-permissions.sh /usr/local/bin/set-permissions.sh

# スクリプトに実行権限を付与
RUN chmod +x /usr/local/bin/set-permissions.sh

# エントリーポイントをスクリプトに設定
ENTRYPOINT ["/usr/local/bin/set-permissions.sh"]

# デフォルトのコマンド
CMD ["nginx", "-g", "daemon off;"]

