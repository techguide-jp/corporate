# イベントページ作成手順
1. 作成したいイベントページのconnpassサイトのurlを、url_list.txtに羅列する
    - もし一覧ページから一括取得したい場合は、`ruby get_urls.rb` を叩く
1. 必要情報をスクレイピングするのに、 `ruby get_ogp.rb` を叩く
    - result.ymlに結果が出力される
1. result.ymlを内容を確認し、調整した後、finish.ymlに移植する
1. `ruby transfer.rb` を叩き、finish.ymlの内容からoutput.htmlを生成する
1. `cp output.html TechGuide/event.html` を叩き、所定の場所に配置する
1. `localhost:88/event.html` にアクセスして内容を確認
1. 問題なければ、mainブランチに適応してリリース
