---
title: "Web-Application-Database servers"
slug: web-application-database-servers
date: 2019-02-27
language: english
tags:
  - Server
published: true
description: "In this post, I will break down three main servers that are used for web-applications which are web server, application server and database server."
---
In this post, I will break down three main `servers` that are used for web-applications which are `web server`, `application server` and `database server`.

## What is a web server

> A `Web server` is a program that uses HTTP (Hypertext Transfer Protocol) to serve the static files to users, in response to their requests.   
[What is Web server? - Definition from WhatIs.com](https://whatis.techtarget.com/definition/Web-server)

If a web server gets a request to serve a static HTML, CSS of Javascript file, it just returns the requested file.  
But what happens if a web server gets a request that has to be processed dynamically?   
That's when an application server comes in. 

`Nginx` and `Apache` are very well known and widely used `web server softwares`.

## What is an application server?
> An application server is a server program in a computer in a distributed network that provides the business logic for an application program.   
[What is application server? - Definition from WhatIs.com](https://searchsqlserver.techtarget.com/definition/application-server)

It is the server your application is actually run on. An application server is not restricted to HTTP and is able to do a bunch of other stuff.  
When an application server gets a request from the web server, it tells your application about it and your application dose what it's told to do.

If you are familiar with Ruby on Rails, you have probably heard of  `Unicorn`, `Rainbows`, and `Puma`. They are very widely used application server softwares for rails applications.

## What is a databse server?
> A database server is a computer system that provides other computers with services related to accessing and retrieving data from a database.   
[What is a Database Server?](https://www.computerhope.com/jargon/d/database-server.htm)

Basically, it is very self-explanatory.   
A database server holds the `Database Management System (DBMS)` and the `databases`. It searches the database for selected records and passes them back over the network.

## References 
- [App server, Web server: What's the difference? \| JavaWorld](https://www.javaworld.com/article/2077354/app-server-web-server-what-s-the-difference.html)
- [webserver - What is the difference between application server and web server? - Stack Overflow](https://stackoverflow.com/questions/936197/what-is-the-difference-between-application-server-and-web-server)
