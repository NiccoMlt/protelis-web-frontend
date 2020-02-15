# Protelis on the Web - React frontend

[![Build Status](https://travis-ci.com/NiccoMlt/Protelis-Web-Frontend.svg?token=gFNEyVkpY7xNqwmKzp7q&branch=master)](https://travis-ci.com/NiccoMlt/Protelis-Web-Frontend)
[![codecov](https://codecov.io/gh/NiccoMlt/Protelis-Web-frontend/branch/master/graph/badge.svg)](https://codecov.io/gh/NiccoMlt/Protelis-Web-frontend)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Web frontend for [Protelis Web backend](https://github.com/NiccoMlt/Protelis-Web), deployed by default at https://protelis-web-frontend.now.sh.

This is a Typescript project built with Yarn and `create-react-app` scripts and can be imported as a VS Code or WebStorm project.

## Code quality & CI

### Type checking [![Typescript Version](https://img.shields.io/badge/typescript-3.7.5-blue.svg?logo=typescript)](https://www.typescriptlang.org/)

The frontend project is completely developed in [TypeScript](https://www.typescriptlang.org/), so transpiled Javascript code should be statically type-checked on compile-time.

TypeScript was chosen instead of [Flow](https://flow.org/) for better third-party support and personal preference.

### Code style [![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

Basic code style configuration (max line length, indent style and size, ...) on frontend project are handled by EditorConfig directly on the editor.

Advanced code style checks are done with [ESLint](https://eslint.org/):
the tool checks code compliance to an [Airbnb React/Javascript code style](https://github.com/airbnb/javascript) [adaptation for TypeScript](https://github.com/iamturns/eslint-config-airbnb-typescript).

ESLint was chosen instead of TSLint because of the [deprecation announcement](https://medium.com/palantir/tslint-in-2019-1a144c2317a9) for the latter (see issue [#4534](https://github.com/palantir/tslint/issues/4534)).

### Continuous integration

The project is built and checked by [Travis CI](https://travis-ci.com/) with latest LTS NodeJS version on Ubuntu Bionic.

### Continuous deployment

The project is deployed on [Zeit Now](https://zeit.co) automatically via GitHub Apps hooks.
It can be manually deployed with `now` or `now --prod` commands.

## License and credits [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

As stated in [`LICENSE` file](./LICENSE), this code is provided under GPLv3 license.

This repository is born after a split of the [Protelis-Web monorepo](https://github.com/NiccoMlt/Protelis-Web) (see [issue NiccoMlt/Protelis-Web#10](https://github.com/NiccoMlt/Protelis-Web/issues/10)).
Git history was kept rebasing the result of a `filter-branch` on `src/main/frontend` folder of the develop branch.

The original code was bootstrapped from [my personal adaptation](https://github.com/NiccoMlt/single-page-react-vertx-howt) of official [Single Page Application development with React and Vert.x](https://how-to.vertx.io/single-page-react-vertx-howto/) tutorial, which are both provided under [Apache License 2.0](https://opensource.org/licenses/Apache-2.0).
