---
title: "Devise Token Auth"
slug: devise-token-auth
date: 2019-12-10
language: english
category: Rails
tags:
  - Gem
  - DeviseTokenAuth
published: true
description: "Here are some resources about a rails gem 'Devise Token Auth'."
---
# What the tokens are used for 

### `access-token`:
This serves as the user's password for each request. A hashed version of this value is stored in the database for later comparison. This value should be changed on each request.

### `client`:
This enables the use of multiple simultaneous sessions on different clients. (For example, a user may want to be authenticated on both their phone and their laptop at the same time.)

### `expiry`:
The date at which the current session will expire. This can be used by clients to invalidate expired tokens without the need for an API request.

### `uid`:
A unique value that is used to identify the user. This is necessary because searching the DB for users by their access token will make the API susceptible to timing attacks.

# Where the authentication is handled

All authentication should be handled invisibly by the [controller concerns](https://github.com/lynndylanhurley/devise_token_auth/tree/master/app/controllers/devise_token_auth/concerns).

Therefore, you add `  include DeviseTokenAuth::Concerns::SetUserByToken` to the application controller.

# What the models do 
Models that include the  `DeviseTokenAuth::Concerns::User concern` will have access to the public methods listed in the link below.

- [Model Integration - devise-token-auth](https://devise-token-auth.gitbook.io/devise-token-auth/usage/model_concerns)

# Endpoints
- [Usage - devise-token-auth](https://devise-token-auth.gitbook.io/devise-token-auth/usage)

# References 
- [Installation - devise-token-auth](https://devise-token-auth.gitbook.io/devise-token-auth/)
- [devise token auth を使って簡単に早くAPIを作る 1 │ Masahiro's tech note](http://clc.gonna.jp/2017/01/post-1306/)
- (This one contains Rspec examples!!)[Vieo course about devise_token_auth](https://ja.coursera.org/lecture/photo-tourist-web-app-capstone/server-devise-token-auth-setup-iKf15)

# Use it with React 
- [Building Basic React Authentication - Better Programming - Medium](https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71)
- [useAuth \| useHooks](https://usehooks.com/useAuth/)
- [CRUD React-Native & RoR backend with Devise Auth Token](https://medium.com/@eth3rnit3/crud-react-native-ror-backend-with-devise-auth-token-4407cac3aa0b)
- [Great example on GitHub (1)](https://github.com/Skezey/react-context-auth)
- [Great example on GitHub (2)](https://github.com/sfulsom/final-blog)

# Unpermitted parameter:session issue

- ["Unpermitted parameter: session" issues when action_controller.action_on_unpermitted_parameters is :raise · Issue #676 · lynndylanhurley/devise_token_auth · GitHub](https://github.com/lynndylanhurley/devise_token_auth/issues/676)

# Skip some routes
- [ruby on rails - routes with devise and devise_token_Auth not working - Stack Overflow](https://stackoverflow.com/questions/36437087/routes-with-devise-and-devise-token-auth-not-working
)
