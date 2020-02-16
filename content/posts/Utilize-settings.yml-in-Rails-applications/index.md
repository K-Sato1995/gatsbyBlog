---
title: Utilize settings.yml in Rails applications
description: Utilize settings.yml in Rails applications by using a gem called settingslogic.
slug: utilize-settings-yml-in-rails-applications
date: 2019-07-04
language: english
cover: ./cover.png
tags: 
  - Rails
  - Gem
---
# Installation
Add the following line to your Gemfile and run `bundle install`.

```
gem `settingslogic`
```

# Define Your Class
Add the code below to `config/initializers/settings.rb`.

```ruby
# config/initializers/settings.rb
class Settings < Settingslogic
  source "#{Rails.root}/config/settings.yml"
  namespace Rails.env
end
```

# Create your settings
You can start writing settings in `config/settings.yml` since you set an absolute path to `settings.yml`.
You can write settings like the code below.

```yml
# config/settings.yml
# config/application.yml
defaults: &defaults
  cool:
    saweet: nested settings
  neat_setting: 24
  awesome_setting: <%= "Did you know 5 + 5 = #{5 + 5}?" %>

development:
  <<: *defaults
  neat_setting: 800

test:
  <<: *defaults

production:
  <<: *defaults
```

# Access your settings
You can access your settings like the code below.

````
>> Rails.env
=> "development"

>> Settings.cool
=> "#<Settingslogic::Settings ... >"

>> Settings.cool.saweet
=> "nested settings"

>> Settings.neat_setting
=> 800

>> Settings.awesome_setting
=> "Did you know 5 + 5 = 10?"
````
# References
- [GitHub - binarylogic/settingslogic: A simple and straightforward settings solution that uses an ERB enabled YAML file and a singleton design pattern.](https://github.com/binarylogic/settingslogic)
