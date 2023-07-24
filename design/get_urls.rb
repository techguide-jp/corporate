require 'open-uri'
require 'nokogiri'

# URLを設定
url = 'https://techguide.connpass.com/event/'

# URLからHTMLを取得
html = open(url)

# Nokogiriオブジェクトを作成
doc = Nokogiri::HTML.parse(html)

# aタグのhref属性を抽出し、指定の形式に一致するものだけを取得
links = doc.css('a').select{|a| a[:href] =~ /^https:\/\/techguide\.connpass\.com\/event\/*/}.map{|a| a[:href]}

# url_list.txtというファイルにリンクのリストを出力
File.open("url_list.txt", "w") do |file|
  links.each do |link|
    file.puts(link)
  end
end

