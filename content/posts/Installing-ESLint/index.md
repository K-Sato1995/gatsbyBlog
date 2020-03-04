---
title: 'Installing ESLint'
slug: installing-eslint
date: 2018-12-15
language: english
category: Javascript
tags:
  - ESLint
  - Javascript
  - Tutorial
published: true
description: 'This is just a quick guideline to install ESLint in your JS applications. Follow the steps below and install all the necessary packages.'
---

# Introduction

This is just a quick guideline to install `ESLint` in your JS applications.

# Install packages

Follow the steps below and install all the necessary packages.

```console
$ npm install --save-dev eslint
$ npm add --save-dev eslint-plugin-import eslint-plugin-jsx-a11y
$ npm install --save-dev prettier eslint-plugin-prettier
$ npm install --save-dev eslint-config-prettier
$ npm installl --save-dev eslint-plugin-react-hooks
```

Or just run

```console
$ npm install --save-dev eslint eslint-plugin-import eslint-plugin-jsx-a11y  prettier eslint-plugin-prettier  eslint-config-prettier eslint-plugin-react-hooks
```

FYI, [Difference between ESLint and Prettier](https://www.futurehosting.com/blog/prettier-vs-eslint-whats-the-difference/).

# Create your .eslintrc.json file

```json
{
  "extends": [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "react-hooks"
  ],
  "plugins": ["jsx-a11y", "prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

# Add shortcut commands

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint . --ext .js,.jsx; exit 0",
    "lint-fix": "eslint --fix . --ext .js,.jsx; exit 0"
  }
```

# How to use lint commands

Simply run the commands below to use `ESLint`.

```console
// Run the command to check a specific file.
$ ./node_modules/.bin/eslint yourfile.js

// Run the command to fix errors.
// Each file
$ ./node_modules/.bin/eslint --fix yourfile.js
// Each Folder
$ ./node_modules/.bin/eslint --fix src/actions/
```

## If you are also using Codeclimate

```console
$ touch .codeclimate.yml
```

```
// .codeclimate.yml
eslint:
  enabled: true
  config:
    config: /vfhd-development-kit/projects/vf_helpdesk_frontend/.eslintrc.json
```

#### References

- [Code Climate for ESLint](https://docs.codeclimate.com/docs/eslint)

# References

- [Integrating with ESLint · Prettier](https://prettier.io/docs/en/eslint.html)
- [ESLint で ES6 で書かれた React のコードを検証する - Qiita](https://qiita.com/kjugk/items/b9dfc876e16dbfa4f447#eslint-plugin-react-%E3%81%AE-recommened-rulues-%E3%82%92%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B)
- [ESLint の推奨設定（eslint:recommended）のチェック内容 ｜ Tips Note by TAM](https://www.tam-tam.co.jp/tipsnote/javascript/post11934.html)
- [ESLint ルール 一覧 (日本語) - galife](https://garafu.blogspot.com/2017/02/eslint-rules-jp.html)
- [Prettier と Linter を併用する - Qiita](https://qiita.com/sigwyg/items/ebb21ef70550cee7a163)
- [GitHub - prettier/eslint-config-prettier: Turns off all rules that are unnecessary or might conflict with Prettier.](https://github.com/prettier/eslint-config-prettier#special-rules)
- [Prettier + ESLint + Facebook Code Quality: The Auto-magical React Styling Tutorial](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd)
- [Prettier + ESLint + Facebook Code Quality: The Auto-magical React Styling Tutorial](https://medium.com/@eliotjunior/prettier-eslint-facebook-code-quality-the-auto-magical-react-styling-tutorial-19481acb10dd)
- [Command Line Interface - ESLint - Pluggable JavaScript linter](https://eslint.org/docs/user-guide/command-line-interface#--ext)
- [Running eslint as an npm script results in ELIFECYCLE error. · Issue #2409 · eslint/eslint · GitHub](https://github.com/eslint/eslint/issues/2409)
- [ESLint をグローバルにインストールせずに使う - Qiita](https://qiita.com/mysticatea/items/6bd56ff691d3a1577321)
- [Streamline JavaScript Development with ESLint - NodeSource](https://nodesource.com/blog/streamline-javascript-development-with-eslint/)
