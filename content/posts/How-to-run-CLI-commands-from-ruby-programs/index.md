---
title: "How to run CLI commands from ruby programs"
description: This is how you run CLI commands from Ruby programs.
slug: how-to-run-cli-commands-from-ruby-programs
date: 2019-07-02
language: english
cover: ./cover.png
tags: 
  - Ruby
---
# The Ruby System Method

Use `system` or `exec` to run cli commands from Ruby programs.

```
# test.rb

def show
  system 'ls'
  exec 'pwd'
end

show
```

If you run the program below, it would output the list of directories and files(`ls`) and the current working directory(`pwd`).

# References 
- [How to Run System Commands From Ruby](https://www.rubyguides.com/2018/12/ruby-system/)
- [4 Ways to Write and Run a Ruby Script](https://cobwwweb.com/four-ways-to-write-run-ruby-script)
