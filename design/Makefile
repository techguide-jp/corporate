# デフォルトポート
DEFAULT_PORT=8080

# 使用可能なポートを見つける関数
FIND_AVAILABLE_PORT = $(shell \
    port=$(DEFAULT_PORT); \
    while lsof -i:$$port >/dev/null 2>&1; do \
        port=$$((port+1)); \
    done; \
    echo $$port \
)

# Docker Compose ファイルで使用する環境変数を定義
export PORT := $(FIND_AVAILABLE_PORT)

# ターゲット: 起動
.PHONY: up
up: build
	@echo "使用するポート: $(PORT)"
	@docker-compose up -d
	@PORT_NUMBER=$$(docker-compose port nginx 80 | awk -F: '{print $$2}') && \
	if [ -n "$$PORT_NUMBER" ]; then \
		echo "アクセス用URL: http://localhost:$$PORT_NUMBER"; \
	else \
		echo "コンテナが起動していないか、ポートが見つかりません。"; \
	fi

# ターゲット: 停止
.PHONY: down
down:
	@docker-compose down

# ターゲット: 再起動
.PHONY: restart
restart: down up

# ターゲット: ログ表示
.PHONY: logs
logs:
	@docker-compose logs -f

# ターゲット: 状態確認
.PHONY: status
status:
	@docker-compose ps

# ターゲット: コンテナに入る
.PHONY: exec
exec:
	@docker-compose exec nginx sh -c "cd /usr/share/nginx/html && sh"

# ターゲット: アクセスURLを表示
.PHONY: url
url:
	@PORT_NUMBER=$$(docker-compose port nginx 80 | awk -F: '{print $$2}') && \
	if [ -n "$$PORT_NUMBER" ]; then \
		echo "アクセス用URL: http://localhost:$$PORT_NUMBER"; \
	else \
		echo "コンテナが起動していないか、ポートが見つかりません。"; \
	fi

# ターゲット: ビルド
.PHONY: build
build:
	@docker-compose build

# ターゲット: ヘルプの修正
.PHONY: help
help:
	@echo "使用可能なコマンド:"
	@echo "  make up      - コンテナを起動し、アクセス用URLを表示します。"
	@echo "  make down    - コンテナを停止します。"
	@echo "  make restart - コンテナを再起動します。"
	@echo "  make build   - Docker イメージをビルドします。"
	@echo "  make logs    - コンテナのログを表示します。"
	@echo "  make status  - コンテナの状態を表示します。"
	@echo "  make exec    - コンテナ内のシェルに入ります。"
	@echo "  make url     - アクセス用のURLを表示します。"
