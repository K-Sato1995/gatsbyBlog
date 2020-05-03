require "qiita"
require 'date'

client = Qiita::Client.new()
all_posts = client.get("/api/v2/users/k-penguin-sato/items").body

def parse_date(date_string)
  DateTime.parse(date_string).strftime('%Y-%m-%d')
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

def inline_tags(tags, f)
  tags.each do |tag|
    f.puts "  - #{tag['name']}"
  end
end

def create_header(post, f, index)
  f.puts '---'
  f.puts "title: \"#{post['title']}\""
  f.puts "slug: #{slug(post['title'])}"
  f.puts "date: #{parse_date(post['created_at'])}"
  f.puts "language: japanese"
  f.puts 'tags:'
  inline_tags(post['tags'], f)
  f.puts 'published: true'
  f.puts '---'
end

all_posts.each_with_index do |post, index|
  directory_name = post['title']
  Dir.mkdir(directory_name) unless File.exist?(directory_name)
  Dir.chdir(directory_name)
  f = File.open('index.md', 'w')
  create_header(post, f, index)
  f.puts post['body'].to_s
  Dir.chdir('..')
end

# body
# rendered_body
# coediting
# comments_count
# created_at
# group
# id
# likes_count
# private
# reactions_count
# tags
# title
# updated_at
# url
# user
# page_views_count
