require 'date'

## Incomplete
module Helpers
  def parse_date(date_string)
    DateTime.parse(date_string).strftime('%Y-%m-%d')
  end

  def slug(string)
    slug = string.parameterize
    return string if slug.empty?
  
    slug
  end

  def create_header(post, f, index)
    f.puts '---'
    f.puts "title: \"#{post[:title]}\""
    f.puts "slug: #{slug(post[:title])}"
    f.puts "date: #{parse_date(post[:created_at])}"
    f.puts "language: #{post[:language]}"
    f.puts "category: #{find_category(post[:category_id])}"
    f.puts 'tags:'
    inline_tags(find_tags(index), f)
    f.puts 'published: true'
    f.puts "description: \"#{post[:introduction]}\""
    f.puts '---'
  end  
end