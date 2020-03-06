---
title: 'Understanding Linux Permissions'
slug: understanding-linux-permissions
date: 2019-05-14
language: english
category: Others
tags:
  - Linux
  - Shell
published: true
description: 'Understanding how permissions work in Linux system.'
---

# Introduction

The multi-user capability of Unix-like systems is a feature that is deeply ingrained into the design of the operating system.

# File Permissions

On a Linux system, each file and directory is assigned access rights for the owner of the file.

You can check the permission settings by using `ls -l`.

```bash
$ ls -l
drwxr-xr-x. 13 root  root  1027 Jan  3 12:32 bin/cat
```

Let's explore what `drwxr-xr-x. 13 root root 1077 Jan 3 12:32 bin/cat` means one by one.

| Command               | Meaning                        |
| :-------------------- | :----------------------------- |
| d                     | File Type                      |
| rwxr-xr-x.            | File Mode                      |
| 13                    | Number of links                |
| root                  | The owner of the file          |
| root                  | The group the file belongs to  |
| 1027                  | Size of the file               |
| Jan 　 3 <u>12:32</u> | Time Stamp                     |
| bin/cat               | The name of the file/directory |

## File Type

| Command | File Type     |
| :------ | :------------ |
| -       | File          |
| d       | Directory     |
| l       | Symbolic Link |

## File Mode

The `r` letter means the user has permission to `read` the file/directory. The `w` letter means the user has permission to `write` the file/directory. And the `x` letter means the user has permission to execute the file/directory.

| Command | Meaning     |
| :------ | :---------- |
| r       | read        |
| w       | write       |
| x       | execute     |
| -       | not allowed |

Let's take a look at the 9 letters in the command.
The first 3 letters show the permissions for the file owner, the second 3 letters show the permissions for the group owner and the last 3 letters show the permissions for other users.

```
rwx/ r-x/ r-x/

Owner: rwx
Group: r-x
Users: r-x
```

# Change File Modes

The `chmod` command is used to change the permissions of a file or directory.

## Octal Mode

Each permission may be specified with an octal number: `read = 4`; `write = 2`; `execute = 1`; `no permission = 0`.

| Meaning 　 | Number |
| :--------: | :----: |
|  read(r)   |   4    |
|  write(w)  |   2    |
| execute(x) |   1    |

### Example

The command below means giving permissions to `read(4)`, `write(2)` and `execute(1)` to the owner and permissions to `read(4)` and `execute(1)` to the group user and permissions to `read(4)` to other users.

```bash
chmod 754 myfile
```

## Symbolic Mode

The below is the basic syntax of `chmod`.

```
% chmod who operator permission filename
```

You can use the following commands to change modes.

| Command  |            Meaning            |
| :------: | :---------------------------: |
| u(user)  |          user access          |
| g(group) |         group access          |
| o(other) |         other access          |
|  a(all)  | user, group, and other access |

| Command |            Meaning            |
| :-----: | :---------------------------: |
|    +    |   add specified permissions   |
|    -    | remove specified permissions  |
|    =    | set the specified permissions |

### Example

In the following example, read permission are taken away from others.

```
% chmod o-r filea
```

In the following example, read and execute permissions are added for user, group, and others.

```
$ chmod a+rx fileb
```

In the following example, read, write, and execute permissions are assigned to the group.

```
$ chmod g=rwx filec
```

# References

- [Learning the shell - Lesson 9: Permissions](http://linuxcommand.org/lc3_lts0090.php)
