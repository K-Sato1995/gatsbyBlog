require "qiita"
require 'blog_api'

## Incomplete

module Generators
  class BaseClient; attr_reader :client; end

  class QiitaClient < BaseClient
    def initialize
      @client = Qiita::Client.new
    end

    def get_all_posts
      client.get("/api/v2/users/k-penguin-sato/items").body
    end
  end

  class BlogClient < BaseClient
    def initialize
      @client = BlogApi::Client.new
    end

    def get_all_posts
      client.posts
    end

    private

    def find_category(c_id, categories)    
      categories.each do |category|
        return category[:name] if c_id == category[:id]
      end
    end
    
    def find_tags(index, post_tags_array)
      post_tags = post_tags_array[index]
      tags = []
    
      post_tags.each do |tag|
        tags << tag[:name]
      end
      tags
    end
  end
end


# client = Generators::Clients::BlogClient.new
# p client.get_all_posts
