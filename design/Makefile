# デフォルトポート
DEFAULT_PORT=8080

# 使用可能なポートを見つける関数
FIND_AVAILABLE_PORT = $(shell \
    port=$$1; \
    max_attempts=100; \
    attempts=0; \
    while netstat -tuln | grep -q ":$$port\b" && [ $$attempts -lt $$max_attempts ]; do \
        port=$$((port+1)); \
        attempts=$$((attempts+1)); \
    done; \
    if [ $$attempts -eq $$max_attempts ]; then \
        echo "Error: Could not find an available port"; \
        exit 1; \
    fi; \
    echo $$port \
)

# Docker Compose ファイルで使用する環境変数を定義
export PORT := $(call FIND_AVAILABLE_PORT, $(DEFAULT_PORT))
export APP_PORT := $(call FIND_AVAILABLE_PORT, $$(($$(PORT)+1)))

.PHONY: check-port
check-port:
	@echo "使用するポート: $(PORT)"
	@netstat -tuln | grep ":$(PORT)\b" && echo "ポート $(PORT) は使用中です。" || echo "ポート $(PORT) は使用可能です。"

# ターゲット: 起動
.PHONY: up
up: build
	@echo "使用するポート: $(PORT)"
	@docker-compose up -d --remove-orphans
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
