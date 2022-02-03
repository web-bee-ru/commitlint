# @web-bee-ru/commitlint-config

Configurable [`commitlint`](https://github.com/conventional-changelog/commitlint) config used by https://web-bee.ru/.

## Install

```sh
# npm
npm i -D @web-bee-ru/commitlint-config @commitlint/cli
```

## Configure

After installing it, add `commitlint.config.js` into root of your project:

```js
// commitlint.config.js
const makeConfig = require("@web-bee-ru/commitlint-config");

module.exports = makeConfig({
  // @NOTE: uncomment to override defaults:
  // commitTypes: [
  //   "feat", // @NOTE: implementation of functionality
  //   "fix", // @NOTE: bugfix
  //   "wip", // @NOTE: work in progress
  //   "ci", // @NOTE: continuous integration related issues
  //   "chore", // @NOTE: should be moved in the starter-project
  // ],
});

```

## Automate

To lint commits before they are created, install Husky and use the 'commit-msg' hook.

```sh
# Npm
npm i -D husky@7
```

### husky v6/v7

Initialize husky

```sh
# Npm
npx husky-init
```

Add script to package.json

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

Create `.husky/commit-msg` hook file

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit $1
```

### husky v4 (legacy)

You can create a `.huskyrc` file or add to your `package.json` the following code for

```json
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```
