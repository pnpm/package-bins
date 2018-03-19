import {PackageBin, PackageJson} from '@pnpm/types'
import fs = require('mz/fs')
import pFilter = require('p-filter')
import path = require('path')

export interface Command {
  name: string,
  path: string,
}

export default async function binify (pkg: PackageJson, pkgPath: string): Promise<Command[]> {
  if (pkg.bin) {
    return commandsFromBin(pkg.bin, pkg.name, pkgPath)
  }
  if (pkg.directories && pkg.directories.bin) {
    const binDir = path.join(pkgPath, pkg.directories.bin)
    const files = await findFiles(binDir)
    return pFilter(
      files.map((file) => ({
        name: file,
        path: path.join(binDir, file),
      })),
      async (cmd: Command) => (await fs.stat(cmd.path)).isFile(),
    )
  }
  return []
}

async function findFiles (dir: string): Promise<string[]> {
  try {
    return await fs.readdir(dir)
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw err
    }
    return []
  }
}

function commandsFromBin (bin: PackageBin, pkgName: string, pkgPath: string) {
  if (typeof bin === 'string') {
    return [
      {
        name: pkgName,
        path: path.join(pkgPath, bin),
      },
    ]
  }
  return Object.keys(bin)
    .map((commandName) => ({
      name: commandName,
      path: path.join(pkgPath, bin[commandName]),
    }))
}
