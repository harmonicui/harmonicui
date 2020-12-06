import fs from 'fs'
import path from 'path'

const baseDir = 'node_modules/@harmonicui'

const presets = [
  'test-preset-1',
  'test-preset-2',
]

export function setupTestPresets (): void {
  createBaseDirIfNotExists()
  presets.forEach(preset => installPreset(preset))
}

export function cleanupTestPresets (): void {
  presets.forEach(preset => {
    uninstallPreset(preset)
  })
}

function createBaseDirIfNotExists () {
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir)
  }
}

function installPreset (preset: string) {
  fs.symlinkSync(
    path.resolve(`src/__fixtures__/presets/${preset}`),
    `${baseDir}/${preset}`,
    'dir',
  )
}

function uninstallPreset (preset: string) {
  fs.unlink(`${baseDir}/${preset}`,
    (error) => {
      if (error) throw error
    })
}
