require 'open-uri'
require 'nokogiri'
require 'yaml'

# スクレイピング対象のURLリストを格納したファイルのパス
url_list_file = "url_list.txt"
# URLリストを読み込む
url_list = File.open(url_list_file).readlines.map(&:chomp)
result = []
# URLリストをループしてスクレイピングを行う
url_list.each do |url|
  begin
    html = URI.open(url)
    doc = Nokogiri::HTML.parse(html)
    # ページタイトルの取得
    title = doc.title
    # OG画像の取得
    og_image = doc.xpath("//meta[@property='og:image']/@content").first
    og_image_content = og_image ? og_image.value : ""
    # descriptionの取得
    description = doc.xpath("//meta[@name='description']/@content").first
    description_content = description ? description.value : ""
    result << {
      "url" => url,
      "title" => title,
      "og_image" => og_image_content,
      "description" => description_content
    }
  rescue Exception => e
    puts "Error occurred while processing #{url}: #{e}"
  end
end
# 結果をyml形式で出力する
File.open("result.yml", "w") do |f|
  YAML.dump(result, f)
end
