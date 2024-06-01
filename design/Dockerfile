# Node.jsの公式イメージから
FROM node:20

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

# アプリケーションの依存関係をインストールする
COPY TechGuide/package*.json ./
RUN npm install

# アプリケーションのソースをバンドルする
COPY . .

# ポートを開ける
EXPOSE 8080

# PostCSSを実行する
CMD [ "npm", "run", "watch" ]
