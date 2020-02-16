---
title: Git Resources
description: Collection of posts about Git I found on the internet. The posts are either in Japanese or English
slug: git-resources
date: 2019-07-22
language: english
cover: ./cover.png
tags: 
  - Git
---
# Dealing With Merge Conflicts 
- [Dealing With Merge Conflicts](https://www.git-tower.com/learn/git/ebook/en/command-line/advanced-topics/merge-conflicts)

# git push の取り消し方法 
- [git push の取り消し方法 | WWWクリエイターズ](http://www-creators.com/archives/2020)

# Put commits together
- [Squash All Commits Related to a Single Issue into a Single Commit · todotxt/todo.txt-android Wiki · GitHub](https://github.com/todotxt/todo.txt-android/wiki/squash-all-commits-related-to-a-single-issue-into-a-single-commit)
- [rebase -i でコミットをまとめる - Qiita](https://qiita.com/takke/items/3400b55becfd72769214)
- [他人のコミットをgit merge --squashするべきでないのではという話 - Qiita](https://qiita.com/pshiko/items/1e9acd114b7e85884866)

```
$ git rebase -i HEAD~4
```

# Check out remote branch onto your local pc
- [リモートのgitブランチをローカルにチェックアウトする - setoya-blog](https://www.setoya-blog.com/entry/2012/11/04/132746)

```
$ git checkout -b other_branch origin/other_branch
```
# Git Command Aliases 

```
git config --global alias.co checkout
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.br branch
```

# Untrack already tracked filed

```
## File
$ git rm --cached <file-name>

## Directory
git rm -r --cached directory/
```

- [Untrack already tracked files in your git repository](https://k-sato1995.github.io/blog/untrack-already-tracked-files-in-your-git-repository)
- [Git: Removing already tracked files](https://clubmate.fi/git-removing-files-from-the-staging-area-and-the-tree/)

# Git Reset 

```
--soft: uncommit changes, changes are left staged (index).
--hard: uncommit + unstage + delete changes, nothing left.
--mixed (default): uncommit + unstage changes, changes are left in working tree.
```


# Git Tags 
- [Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

```
# Show all tags
$ git tag
# Create a tag 
$ git tag -a v1.4 -m "my version 1.4"
# Create a tag with a specific commit hash 
$  git tag -a v1.2 9fceb02 -m 'my version 0.1.0'
# Show the tag data along with the commit that was tagged 
$ git show v1.4
# Sharing a tag
$ git push origin v1.5
# Sharing tags 
$ git push origin --tags
# Deleting tags 
$ git tag -d v1.4
# Delete a remote tag
$ git push origin --delete <tagname>
```

# Git Unstage staged files/directories

The command below unstage all the staged files.

```
$ git reset HEAD
```

```
# Stage files exept a directory (In this case, it's staging all the files and directories besides stuff under the vendor directory.
$ git add . && git reset -- vendor/*
```

- [Add all files to a commit except a single file? - Stack Overflow](https://stackoverflow.com/questions/4475457/add-all-files-to-a-commit-except-a-single-file)

# Fix folder name to uppercase/lowercase in git

- [I change the capitalization of a directory and Git doesn't seem to pick up on it](https://stackoverflow.com/questions/6899582/i-change-the-capitalization-of-a-directory-and-git-doesnt-seem-to-pick-up-on-it)

# Remove all untracked directories and files

```
git clean -n 
git clean -df // use -f if you just wanna delete untracked files.
```

- [Remove all untracked files](https://koukia.ca/how-to-remove-local-untracked-files-from-the-current-git-branch-571c6ce9b6b1)

