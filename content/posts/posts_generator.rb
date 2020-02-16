require 'json'
require 'httparty'
require 'date'
require 'pp'
require 'active_support/core_ext/string/inflections'

p '======================EXECUTING============================'
url = 'https://k-blog0130.herokuapp.com/api/v1/posts_list'

response = HTTParty.get(url, format: :plain)
DATA = JSON.parse(response, symbolize_names: true)

posts_array = DATA[:data][:posts]

def find_tags(index)
  post_tags_array = DATA[:data][:post_tags]
  post_tags = post_tags_array[index]
  tags = []

  post_tags.each do |tag|
    tags << tag[:name]
  end
  tags
end

def inline_tags(tags, f)
  tags.each do |tag|
    f.puts "  - #{tag}"
  end
end

def slug(string)
  slug = string.parameterize
  return string if slug.empty?

  slug
end

def parse_date(date_string)
  DateTime.parse(date_string).strftime("%Y-%m-%d")
end

def create_header(post, f, index)
  f.puts '---'
  f.puts "title: #{post[:title]}"
  f.puts "description: #{post[:introduction]}"
  f.puts "slug: #{slug(post[:title])}"
  f.puts "date: #{parse_date(post[:created_at])}"
  f.puts "language: #{post[:language]}"
  f.puts 'cover: ./cover.png'
  f.puts 'tags: '
  inline_tags(find_tags(index), f)
  f.puts '---'
end

posts_array.each_with_index do |post, index|
  directory_name = post[:title].split(' ').join('-')
  Dir.mkdir(directory_name) unless File.exist?(directory_name)
  Dir.chdir(directory_name)
  f = File.open('index.md', 'w')
  create_header(post, f, index)
  f.puts post[:content].to_s
  Dir.chdir('..')
end
p '========================DONE============================'
