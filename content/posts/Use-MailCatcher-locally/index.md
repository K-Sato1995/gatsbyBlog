---
title: Use MailCatcher locally
description: Here is a simple guideline about how to use MailCatcher locally.
slug: use-mailcatcher-locally
date: 2019-11-06
language: english
cover: ./cover.png
tags: 
  - Mail
  - Rails
---
# Install MailCatcher locally 

No need to add it to Gemfile or anything. Just install it on your local machine.

```
$ gem install mailcatcher
```

# Run MailCatcher locally 

Simply run the command below.

```
$ mailcatcher
```

# Add the settings to your rails app

If you are trying to use MailCatcher with your rails app,  add the following code to `config/environments/development.rb`.

```ruby
Rails.application.configure do
   ## Other settings ##
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = { :address => "localhost", :port => 1025 }
end
```

# References 
- [MailCatcher](https://mailcatcher.me/)
