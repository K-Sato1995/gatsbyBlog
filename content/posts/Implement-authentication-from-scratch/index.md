---
title:  Implement authentication from scratch
description: Here is a concise guide to implemente authentication functionality without any third-party library in your rails applications.
slug: implement-authentication-from-scratch
date: 2019-10-01
language: english
cover: ./cover.png
tags: 
  - Rails
---
# Create author resources  

Run the commands below.

```
$ rails generate model Author
$ rails generate controller Authors name:string email:string password_digest:string
$ rails generate migration add_index_to_authors_email // Add index
$ rake db:migrate
```

# Set validations 
Add validations for `name` and `email`.

```ruby
# models/author.rb
class Author < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
end
```

# Add secure password to Author

You'll have your users put the password and its confirmatin in the form and send them as hashed values. (Hash values can not be decrypted even though they got intercepted by a third party during the transmission.)
You check if the sent hashed value matches the hashed password stored in the db. And if it dose, you allow your user to log in to the application.


## Add has secure password
It's quite easy to setup in rails. Simply put `has_secure_password` in Author model.(Also add the minimum length of each password.)

```ruby
class Author < ApplicationRecord
  #
  # other code
  #
  validates :password, length: { minimum: 6 }
  has_secure_password
end
```

`has_secure_password`

- Enables you to store hased password in your db as password_digest
- Lets you use password and password_confirmation params and validations for them.
- Lets you use `authenticate` method.

### Add bcrypt gem 

Add `gem 'bcrypt'` to your Gemfile and run `bundle install`.

```ruby
gem 'bcrypt'
```

## Check if it's working correctly 

Run the commands in the rails console to see if you can use the `authenticate` method.
The `authenticate` method returns false if the given password was wrong and returns the author object if the given password was correct.

```ruby
$ Author.create(name:"test", email:"test@email.com", password:"000000")
$ Author.first.authenticate('test')
//=> false 
$ Author.first.authenticate('000000')
//=> 
#<Author:0x0000560ee2e0a1b8
 id: 1,
 name: "test",
 email: "test@email.com",
 password_digest: "$2a$12$bQQu49N3xNCKO8StooXLBOqwwCAv7NbPqt3aG35AFDHRUgh.C8BgO",
 created_at: Mon, 30 Sep 2019 08:40:11 UTC +00:00,
 updated_at: Mon, 30 Sep 2019 08:40:11 UTC +00:00>
```

# Sign up functionality 

Let's start from setting up the routes for users to sign up.


```ruby
Rails.application.routes.draw do
  resources :authors
  get  '/signup',  to: 'authors#new'
  post '/signup',  to: 'authors#create'
```


Add the code below to the author controller.

```ruby
class AuthorsController < ApplicationController
  def show
    @author = Author.find(params[:id])
  end

  def new
    @author = Author.new
  end


  def create
    @author = Author.new(author_params)
    if @author.save
      redirect_to @author
    else
      render 'new'
    end
  end

  private

  def author_params
    params.require(:author).permit(:name, :email, :password, :password_confirmation)
  end
end
```

Lastly, create a sign up page and show page for each user under `views/authors/`.

```ruby
# views/authors/show.html.erb
<%= @author.name %>
<%= @author.email %>
```

```ruby
# views/authors/new.html.erb
<% provide(:title, 'Sign up') %>
<h1>Sign up</h1>

<div class="row">
  <div class="col-md-6 col-md-offset-3">
    <%= form_for(@author) do |f| %>

      <%= f.label :name %>
      <%= f.text_field :name, class: 'form-control' %>

      <%= f.label :email %>
      <%= f.email_field :email, class: 'form-control' %>

      <%= f.label :password %>
      <%= f.password_field :password, class: 'form-control' %>

      <%= f.label :password_confirmation, "Confirmation" %>
      <%= f.password_field :password_confirmation, class: 'form-control' %>

      <%= f.submit "Create my account", class: "btn btn-primary" %>
    <% end %>
  </div>
</div>
```

# Sign in/out

`HTTP` is a stateless protocol. So we use sessions to maintain the user state.
The `new` action is used to put informatin for a new session and `create` actioin is used to actually create a new session. And the `destroy` action is used to delete a session.

## Set up routes 
Set up routes for `sessions`.


```ruby
Rails.application.routes.draw do
  resources :authors
  # Create new users
  get  '/signup',  to: 'authors#new'
  post '/signup',  to: 'authors#create'
  # Sessions
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
end
```

## Create a session controller 

```
$ rails generate controller Sessions
```

Add the code to `SessionsController`.

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    author = Author.find_by(email: params[:session][:email].downcase)
    if author && author.authenticate(params[:session][:password])
      log_in author
      redirect_to author
    else
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
```

And add the code to `SessionHelper` and include session helper in `ApplicationController`.
The `session` used in the code below is the built-in `session` method in Rails.

```ruby
module SessionsHelper
  def log_in(author)
    session[:author_id] = author.id
  end

  def current_author
    @author ||= Author.find_by(id: session[:author_id]) if session[:author_id]
  end

  def logged_in?
    !current_author.nil?
  end

  def log_out
    session.delete(:author_id)
    @current_author = nil
  end
end
```

```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper
end
```

## Remember me functionality


First of all, add a column called `remember_digest` to `Author`.

```
 $ rails generate migration add_remember_digest_to_users remember_digest:string
```

Update code in Author model. Each method has its description in the code.

```ruby
class Author < ApplicationRecord
  attr_accessor :remember_token
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 6 }

  has_secure_password

  class << self
    # Return the hash value of the given string
    def digest(string)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
      BCrypt::Password.create(string, cost: cost)
    end

    # Return a random token
    def generate_token
      SecureRandom.urlsafe_base64
    end
  end

  # Create a new token -> encrypt it -> stores the hash value in remember_digest in DB.
  def remember
    self.remember_token = Author.generate_token
    update_attribute(:remember_digest, Author.digest(remember_token))
  end

  # Check if the given value matches the one stored in DB
  def authenticated?(remember_token)
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end
end
```

Update the session helper.

```ruby
module SessionsHelper
  def log_in(author)
    session[:author_id] = author.id
  end

  def current_author
    if (author_id = session[:author_id])
      @current_author ||= User.find_by(id: author_id)
    elsif (author_id = cookies.signed[:author_id])
      author = User.find_by(id: author_id)
      if author && author.authenticated?(cookies[:remember_token])
        log_in author
        @current_author = author
      end
    end
  end

  def logged_in?
    !current_author.nil?
  end

  # Make the author's session permanent
  def remember(author)
    author.remember
    cookies.permanent.signed[:author_id] = author.id
    cookies.permanent[:remember_token] = author.remember_token
  end

  # Delete the permanent session
  def forget(author)
    author.forget
    cookies.delete(:author_id)
    cookies.delete(:remember_token)
  end

  def log_out
    forget(current_author)
    session.delete(:author_id)
    @current_author = nil
  end
end
```

Update the session controller.

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    author = Author.find_by(email: params[:session][:email].downcase)
    if author && author.authenticate(params[:session][:password])
      log_in author
      params[:session][:remember_me] == '1' ? remember(author) : forget(author)
      redirect_to author
    else
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
```

Lastly add `remember_me` check box in the view.

```ruby
<div class="login-form">
  <h2>Log in</h2>
  <%= form_for(:session, url: login_path) do |f| %>
    <%= f.email_field :email, autofocus: true, autocomplete: "email", placeholder: 'Email', class: 'login-input'%><br/>
    <%= f.password_field :password, autocomplete: "current-password", placeholder: 'Password', class: 'login-input' %>
    <div class="check-field">
      <%= f.check_box :remember_me %>
      <%= f.label :remember_me %>
    </div>
    <%= f.submit "Log in", class: 'btn btn-outline-primary login-btn' %>
  <% end %>
</div>
```

# Authorization

Add the mothos to the author controller.

```ruby
class AuthorsController < ApplicationController
  before_action :authenticate_author

  ##
    Other code
  ##
  
  private

  def author_params
    params.require(:author).permit(:name, :email, :password, :password_confirmation)
  end

  def authenticate_author
    unless logged_in?
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end

  def correct_author
    @author = Author.find(params[:id])
    redirect_to(root_url) unless current_author?(@author)
  end
end
```

Add the method to the session helper.

```ruby
module SessionsHelper
  def current_author?(author)
    author == current_author
  end
end
```

# References

- [Ruby on Rails チュートリアル：実例を使って Rails を学ぼう](https://railstutorial.jp/chapters/sign_up?version=5.1#sec-unsuccessful_signups)
