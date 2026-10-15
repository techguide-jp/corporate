# SafeQR 問い合わせ導線の確認

2026-10-16、ローカルproduction build（Vite preview、127.0.0.1:4175）。PC 1280×900・モバイル390×900で、サポート/Privacy各ページの問い合わせ部分を撮影した。メールアドレス・mailtoの表示なし、横はみ出しなし。

| 画面 | PC | モバイル |
|---|---|---|
| /safeqr/ の問い合わせ | [1280px](contact-support-1280.png) | [390px](contact-support-390.png) |
| /safeqr/privacy/ の運営者・窓口 | [1280px](contact-privacy-1280.png) | [390px](contact-privacy-390.png) |

各リンクから既存/contact/へ遷移し、category=other、件名「SafeQRについて」または「SafeQRのプライバシーについて」の事前入力を確認した。ブラウザーのconsole/page errorは今回の確認で0件。送信はしていない。

pnpm validateはformat/lint/型検査（0 errors/0 warnings）・68テスト成功・build成功。フォームの送信処理、Turnstile、他製品のページは変更していない。ソースページ識別は既存の計測許可リストでotherへ正規化されるため、SafeQR個別の分析対応を追加したものではない。

PRの画像参照は、この画像を保存した完全コミットSHA固定URLを使う。期限付きArtifactは使わない。本番反映結果はIssue #64へ別途記録する。
