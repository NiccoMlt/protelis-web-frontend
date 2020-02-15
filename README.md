# Protelis on the Web - React frontend

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Use cases

[![UML diagram](http://www.plantuml.com/plantuml/proxy?cache=no&src=https://raw.githubusercontent.com/NiccoMlt/Protelis-Web/develop/docs/src/use-cases.puml)](https://github.com/NiccoMlt/Protelis-Web/blob/develop/docs/src/use-cases.puml)

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

The frontend project is built and checked by Travis CI on latest and LTS NodeJS versions of Windows, Ubuntu Bionic and MacOS.

## License and credits [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

As stated in [`LICENSE` file](./LICENSE), this code is provided under GPLv3 license.

This repository is born after a split of the [Protelis-Web monorepo](https://github.com/NiccoMlt/Protelis-Web) (see [issue NiccoMlt/Protelis-Web#10](https://github.com/NiccoMlt/Protelis-Web/issues/10)).
Git history was kept rebasing the result of a `filter-branch` on `src/main/frontend` folder of the develop branch.

The original code was bootstrapped from [my personal adaptation](https://github.com/NiccoMlt/single-page-react-vertx-howt) of official [Single Page Application development with React and Vert.x](https://how-to.vertx.io/single-page-react-vertx-howto/) tutorial, which are both provided under [Apache License 2.0](https://opensource.org/licenses/Apache-2.0).
