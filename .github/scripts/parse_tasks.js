const marked = require('marked');

function parseTasks(body) {
  if (!body || body.trim() === '') {
    return { total: 0, remaining: 0, listItems: [] };
  }
  const tokens = marked.lexer(body, { gfm: true });
  
  const allTokens = tokens.flatMap(function mapper(token) {
    if (token.tokens && token.tokens.length > 1) {
      return token.tokens.flatMap(mapper);
    }
    return token.items && token.items.length ? token.items.flatMap(mapper) : [token];
  });

  // チェックボックス付きリストアイテムのみを抽出
  const listItems = allTokens.filter(t => t.type === 'list_item' && t.checked !== undefined);
  const incompleteItems = listItems.filter(i => i.checked === false);
  const remaining = incompleteItems.length;
  
  return {
    remaining,
    listItems
  };
}

const body = process.env.PR_BODY || '';
const { remaining, listItems } = parseTasks(body);

// 各タスクのテーブル行を作成
const rows = listItems.map(item => {
  // チェックボックス記号を除去してタスクのテキストを取得
  const taskText = item.text ? item.text.replace(/\[(x| )\]/, '').trim() : '(undefined)';
  // チェック状態によりステータスを決定
  const status = item.checked ? 'Completed' : 'Pending';
  return `| ${taskText} | ${status} |`;
}).join('\n');

console.log(`
Pendingのタスクが${remaining}個残っています。

## Required Tasks
| Task | Status |
|------|---------|
${rows}
`);

// タスクが残っている場合はステータスコード1で終了
if (remaining > 0) {
  process.exit(1);
}