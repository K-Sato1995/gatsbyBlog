require "qiita"

client = Qiita::Client.new(access_token: "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd")
p client.list_items
client.list_users
client.list_user_items("r7kamura")
