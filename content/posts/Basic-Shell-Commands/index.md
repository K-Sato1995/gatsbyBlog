---
title: "Basic Shell Commands"
slug: basic-shell-commands
date: 2018-10-06
language: english
tags:
  - Shell
published: true
description: " I made a list of Linux commands that, I think, are important and frequently used. The main purpose of this post is to memorize basic Linux commands and make myself more familiar with other commands I don't often use. I would keep adding more commands."
---
# Introduction

I made a list of Linux commands that, I think, are important and frequently used. The main purpose of this post is to memorize basic Linux commands and make myself more familiar with other commands I don't often use. I would keep adding more commands.

# Navigating the Filesystem

## pwd

The `pwd` command stands for `Present Working Directory`. It shows what directory you are in. It gives us the absolute path, which means the path that starts from the root (`/`).

```console
$ pwd
```

## ls

The command `ls` stands for `List`. It shows files in the directory you are in. You can see all the hidden files by using the option “-a”.
You can check other options [here](https://www.rapidtables.com/code/linux/ls.html)

```console
$ ls [options] [file|dir]
```

## cd

The command `cd` stands for `Change Directory`. You can go to a different directory with this command.

```console
$ cd [options(s)] [directory]
```

# Getting Help

## man / help

The `man` command allows admins to format and display the user manual that's built into Linux distributions, which documents commands and other system aspects.

```console
$ man [command]
$ [command] --help
```

# Creating Deleting Moving and Copying Files

## mkdir / rmdir

The command `mkdir` and `rmdir` stands for `Make Directory` and `Remove Directory` respectively. Use the `mkdir` command to create a folder or a directory and use `rmdir` to delete a folder or a directory.

```console
$ mkdir [option(s)] directoryname
$ rmdir [option(s)] directoryname
```

## touch

The `touch` command is used to create a file.

```console
$ touch file
```

## cp

The command `cp` stands for `Copy`. It copies `sourcefile` to `targetfile`.

```console
$ cp [option(s)] sourcefile targetfile
```

## rm

Removes the specified files from the file system. Directories are not removed by rm unless the option `-r` is used.

```console
rm [option(s)] file(s)
```

## mv

The `mv` command moves, or renames, files and directories on your filesystem.

```console
//Rename a file named source to destination.
$ mv [options] [-T] source destination

//Move _source file(s)_ to a directory named destination.
$ mv [options] source [source2 ...] destination
```

# Viewing and Editing Files

## cat

The `cat` command displays the contents of a file, printing the entire contents to the screen without interruption.

```console
$ cat [option(s)] file(s)
```

## vi

Edit a file with `vi editor`.

```console
$ vi file_name
```

# File Permissions

## chown

The `chown` keyword stands for `Change Owner`. It transfers the ownership of a file to the user with the specified username.

```console
$ chown [option(s)] username.group file(s)
```

## chgrp

The `chgrp` command stands for `Change Group`. It transfers the group ownership of a given file to the group with the specified group name. The file owner can only change group ownership if a member of both the existing and the new group.

```console
$ chgrp [option(s)] groupname file(s)
```

## chmod

The `chmod` command stands for `Change Mode`. It changes the access permissions.

```console
$ chmod [options] mode file(s)
```

## last

It displays a list of all users logged in (and out) since that file was created.

```console
$ last
```

# Finding Things

## find

The`find` command allows you to search for a file in a given directory. The first argument specifies the directory in which to start the search.

```console
$ find [option(s)]
```

ex1)

```console
$ find / -name my.cnf
```

ex2)

```console
$ find . -type f -name "name-of-the-file"
```

## which

The Linux `which` command is used to find the location of a program.

```console
$ which <programname>
```

# Pattern Matching

## grep

The `grep` command is used to search text. It searches the given file for lines containing a match to the given strings or words.

```console
$ grep 'word' [filename]
```

The `grep` keyword stands for `Global regular expression print`.

**Options for `grep`**

```
-c : This prints only a count of the lines that match a pattern
-h : Display the matched lines, but do not display the filenames.
-i : Ignores, case for matching
-l : Displays list of a filenames only.
-n : Display the matched lines and their line numbers.
-v : This prints out all the lines that do not matches the pattern
-e exp : Specifies expression with this option. Can use multiple times.
-f file : Takes patterns from file, one per line.
-E : Treats pattern as an extended regular expression (ERE)
-w : Match whole word
-o : Print only the matched parts of a matching line,
 with each such part on a separate output line.
```

# Redirecting Input and Output

## echo

The `echo` command displays text.

```console
$ echo [option(s)] [string(s)]
```

## printf

The `printf` command in Linux is used to display the given string, number or any other format specifier on the terminal window. 

```console
$ printf "%s\n" "Hello, World!"
```

# Super User

## sudo

The keyword `sudo` stands for `SuperUser Do`. If you want any command to be done with administrative or root privileges, you can use the `sudo` command.

```console
$ sudo [command]
```

# Directory Trees Disk Usage and Processes

## df

The `df` keyword stands for `Disk Free`. This command is used to check disk space usage on a linux system. The most common usage is like below, used along with the `-h` flag.

```console
$ df -h
```

## du

The `du` keyword stands for `Disk Usage`. It shows the disk usage summary of the directory you are in.

```console
$ du [directory]
```

# Command History

## history

The `history` command prints a list of previously typed commands.

```console
$ history
```

## clear

This command clears all the clutter on the terminal and gives you a clean window to work on.

```console
$clear
```

# Environment variables

## env

It prints the variables of the current environment. It can be used to print a list of the current environment variables or to run another program in a custom environment without modifying the current one.

```console
$ env [OPTION]... [-] [NAME=VALUE]... [COMMAND [ARG]...]
```


# Text Processing

## diff

The `diff` command analyzes two files and prints the lines that are different.

```console
$ diff file1.txt file2.txt
```

## cmp

The `cmp` command in Linux/UNIX is used to compare the two files byte by byte and helps you to find out whether the two files are identical or not.

```console
$ cmp file1.txt file2.txt
```

# Networking commands 

## ping

The `ping` command stands for `Packet INternet Groper`. It lets you check whether or not a remote host is alive and responding.
[More info about `ping` command](https://www.sanfoundry.com/10-ping-command-usage-examples-linux/)

```console
$ ping [OPTIONS] destination(IP/DN)
```

## nslookup

The `nslookup` command stands for `name server lookup`. It translates a domain name to an IP address (or vice versa).

```console
$ nslookup [OPTIONS] [IP/DN]
```

## traceroute

The `traceroute` command shows the journey that a packet of information undertakes from its source to its destination.

```console
$ traceroute [OPTIONS] destination(IP/DN)
```

## curl

`curl` is a tool to transfer data from or to a server, using one of the supported protocols (HTTP, HTTPS, FTP, FTPS, SCP, SFTP, TFTP, DICT, TELNET, LDAP or FILE). The command is designed to work without user interaction.

```console
$ curl [options / URLs]
```

```console
$ curl -d "name=k-sato&email=e@example.com" -X POST URL
```
[Great article about this command](https://www.tecmint.com/linux-curl-command-examples/)

## ifconfig

`ifconfig` stands for `interface configuration``. It is used to view and change the configuration of the network interfaces on your system.
Running the ifconfig command with no arguments, like this.

```console
$ ifconfig
```

## telnet

The `telnet` connect destination host:port via a telnet protocol if connection establishes means connectivity between two hosts is working fine.

- Click [here](https://www.computerhope.com/unix/utelnet.htm) for further information.
- [How to Get Telnet for MacOS in Mojave or High Sierra](http://osxdaily.com/2018/07/18/get-telnet-macos/)

```console
$  telnet geekflare.com 443
```

## netstat

The `netstat` command allows you a simple way to review each of your network connections and open sockets.

```console
$ netstat
```

## hostname

It shows or sets the system's host name.

```console
$ hostname
```
