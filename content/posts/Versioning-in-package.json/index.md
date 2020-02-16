---
title: "Versioning in package.json "
slug: versioning-in-package-json
date: 2019-09-12
language: english
tags:
  - npm
published: true
description: "What the f**k are the (~) and (^) in package.json??? Well...You'll find it out here in this post."
---
# Introduction
npm uses the package.json file to specify the version of a package that your app depends on.
npm uses the tilde (~) and caret (^) to designate which patch and minor versions to use respectively.

# Versioning 
npm packages follow [Semantic Versioning](https://semver.org/).

```
major.minor.patch
1.0.2
```

# Tilde
 if you see `~1.0.2` it means to install version `1.0.2` or the latest patch version such as `1.0.4`. 

# caret
If you see `^1.0.2` it means to install version `1.0.2` or the latest minor or patch version such as `1.1.0`.

# References
- [What's the difference between a tilde (~) and a caret (^) in a npm package.json file? / Michael Lee](https://michaelsoolee.com/npm-package-tilde-caret/)
- [package.jsonのversion指定 - Qiita](https://qiita.com/chihiro/items/5826678bc9287fb57a28)
