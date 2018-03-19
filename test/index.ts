import getBinsFromPkg from '@pnpm/package-bins'
import test = require('tape')
import path = require('path')

const fixtures = path.join(__dirname, 'fixtures')

test('getBinsFromPkg()', async (t) => {
  const pkgPath = path.join(fixtures, 'one-bin')
  const pkg = require(path.join(pkgPath, 'package.json'))
  t.deepEqual(
    await getBinsFromPkg(pkg, pkgPath),
    [{name: 'one-bin', path: path.join(pkgPath, 'one-bin')}]
  )
  t.end()
})
