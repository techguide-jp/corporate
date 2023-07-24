require 'erb'
require 'yaml'

# Yamlファイルの読み込み
yaml_file = 'finish.yml'
data = YAML.load(File.read(yaml_file))

# HTMLテンプレートの読み込み
template_file = 'event_card.erb.html'
template = ERB.new(File.read(template_file))

# レイアウトファイルの読み込み
layout_file = 'event.erb.html'
layout = ERB.new(File.read(layout_file))

output_file = "output.html"

# 各イベントのHTMLを生成
events_html = data.map do |event|
  template.result_with_hash(event)
end.join

# レイアウトにイベントのHTMLを埋め込む
result = layout.result_with_hash({events: events_html})

# 結果を出力ファイルに書き込む
File.open(output_file, 'w') do |file|
  file.write(result)
end
