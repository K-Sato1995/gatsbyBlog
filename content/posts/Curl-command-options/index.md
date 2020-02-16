---
title: "Curl command options "
description: List of options you can use with the curl command.
slug: curl-command-options
date: 2019-12-02
language: english
cover: ./cover.png
tags: 
  - Curl
  - Linux
---
# Add headers
You can use `-H` to add headers to your request.

```
$ curl -H "Content-Type: application/json" http://localhost:8888
```

# Make a POST request with Parameters
You can make a post request with parameters with the `-d (-data) ` flag.
You can specify the method you want to use with `-X`. In this case, you are specifying to use the `POST` method.

```
$ curl -d '{"name":"value1", "content":"value2"}'  -X POST http://localhost:3000
```

# Get verbose response 
You can get verbose response with the `-v` option. The `-v` stands for `-verbose`. 

```
$ curl -v http://localhost:8888
```

# Fetch only the HTTP headers

You can use `-I/--head` flag to only fetch the headers.

```
$ curl -I http://localhost:8888
```

# Add cookies

You can pass the data to the HTTP server as a cookie with the `-b/--cookie` command.
NOTE that the file specified with `-b/--cookie` is only used as input. No cookies will be stored in the file. To store cookies, use the `-c/--cookie-jar` option 

```
$ curl -c cookie.txt -b cookie.txt -b "name=value" http://example.com
```

# Send Data like sending them via forms
This lets curl emulate a filled-in form in which a user has pressed the submit button. This causes curl to POST data using the `content-type multipart/form-data` according to RFC1867. 

```
$ curl -F title="Test" -F author="Test" -F attachment-file=@test.txt http://localhost:8880
```

# Resources
- [curl man page](http://www.mit.edu/afs.new/sipb/user/ssen/src/curl-7.11.1/docs/curl.html)
- [List of `curl` options · GitHub](https://gist.github.com/eneko/dc2d8edd9a4b25c5b0725dd123f98b10)
