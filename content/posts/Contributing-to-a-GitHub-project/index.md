---
title: "Contributing to a GitHub project"
slug: contributing-to-a-github-project
date: 2018-11-01
language: english
cover: ./cover.png
generate-card: false
tags: 
  - Git
  - Tutorial
  - GitHub
description: This is a simple guide for beginners to make a Pull Request and contribute to a GitHub project. If you have never contributed any OSS project on GitHub, this guide might be useful to make your first PR(PullRequest).
---
# Introduction

This is a simple guide for beginners to make a Pull Request and contribute to a GitHub project.

# Simple Steps

(1) Fork the original project.

![Screen Shot 2019-04-21 at 9 15 34 AM](https://user-images.githubusercontent.com/32632542/56463803-40290900-6416-11e9-968d-56691ece6fae.png)

(2) Clone forked project on your page on your local pc.

```console
$ git clone git@github.com:AccountName/NameOfTheProject.git
```

(3) Create `upstream` which points to the original project

```console
$ git remote add upstream git@github.com:AccountName/NameOfTheProject.git
```
(4) Make sure your origin is upto date with the upstream and create your feature branch.

```
$ git checkout master
// Pull from the original project's repository and push it to the clone on your account.
$ git pull upstream master && git push origin master
$ git checkout -b NameOfNewBranch
```

(5) Push it to origin and make a PR.

```
$ git push origin NameOfNewBranch
```

# Setting up a remote and local environment

First of all, go to **the page of the project** you want to contribute to and click the `fork` button which is placed at the upper right corner of the page. This will create a copy of the repository in your own GitHub account.  
 Secondly, you need to create a copy of the project locally on your pc. Go to the page of the project **in your account** again and get the clone with SSH and run the command below.

```console
$ git clone git@github.com:AccountName/NameOfTheProject.git
```

Thirdly, change the directory to the project that you've just created.

```console
$ cd NameOfTheProject
```

Lastly, you need to create a new remote that points to the original project. Go to the page of the project again and find the `SSH clone URL` and use it to create the new remote (`upstream`) by running the command below.

```console
$ git remote add upstream git@github.com:AccountName/NameOfTheProject.git
```

If you followed all the steps above, you now have two remotes for this project.

- (1) `origin`: This remote points to **your GitHub fork of the project**. You can **read and write** to this remote.
- (2) `upstream`: This remote points to the **original project’s GitHub repository**. You can **only read** from this remote.

# Create a Pull Request

First and foremost, make sure the branch that you make a new branch from is up-to-date.  
For instance, if you want to create a new branch from the master branch for your PR, you can run commands below.

```console
$ git checkout master
// Pull from the original project's repository and push it to the clone on your account.
$ git pull upstream master && git push origin master
$ git checkout -b NameOfNewBranch
```

After your work on your new branch, commit your work and push it to the `origin` remote.

```console
$ git push origin NameOfNewBranch
```

Lastly, you can create a `PR` by pressing the green button saying `Compare & pull request`.

If you need more information regarding this matter, check [Here](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)

# Resources

- [firstcontributions](https://github.com/firstcontributions/first-contributions)
- [The beginner's guide to contributing to a github-project](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)
