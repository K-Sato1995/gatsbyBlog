---
title: 'Web-Application-Database servers'
slug: web-application-database-servers
date: 2019-02-27
language: english
tags:
  - Yarn
  - React
published: true
description: 'Explainint What the differences between `yarn upgrade` and `yarn upgrade --latest` are. Incidentally, You can learn why yarn upgrade dose not update package.json.'
---

# Overview

Here are the definitions of both `yarn upgrade` and `yarn upgarde --latest`.

### `yarn upgrade`

This command updates dependencies to their latest version based on the version range specified in the package.json file. The yarn.lock file will be recreated as well.

### yarn upgrade --latest

The `upgrade --latest` command upgrades packages the same as the upgrade command, but ignores the version range specified in package.json. Instead, the version specified by the latest tag will be used (potentially upgrading the packages across major versions).
The package.json file will be updated to reflect the latest version range.

# Conclusion

Adding the `--latest` flag will ignore the semantic version range in `package.json`, so the version upgraded to may not fit that range, so the package.json file is updated to reflect the new latest version.

# Resources

- [Yarn Upgrade Doesn't Update Package.json](https://github.com/yarnpkg/yarn/issues/3266)
- [yarn upgrade](https://classic.yarnpkg.com/en/docs/cli/upgrade)
