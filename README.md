# @pnpm/pkg-bins

> Returns bins of a package

<!--@shields('npm', 'travis')-->
[![npm version](https://img.shields.io/npm/v/@pnpm/pkg-bins.svg)](https://www.npmjs.com/package/@pnpm/pkg-bins) [![Build Status](https://img.shields.io/travis/pnpm/pkg-bins/master.svg)](https://travis-ci.org/pnpm/pkg-bins)
<!--/@-->

## Installation

```sh
npm i -S @pnpm/pkg-bins
```

## Usage

```ts
import getBinsFromPkg from '@pnpm/pkg-bins'

await pkgBinsFromPkg(path.resolve('package.json'), process.cwd())
//> [{name: 'bin-name', path: 'path-to-bin'}]
```

## API

### `getBinsFromPkg(packageJson, pathToPkg): Promise<Array<{name: string, path: string}>>`

## License

[MIT](./LICENSE) © [Zoltan Kochan](https://www.kochan.io/)
