import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const dataPath = join(root, 'src/data/questions.json')
const packagePath = join(root, 'package.json')

test('local question database contains random and official exam banks', () => {
  assert.equal(existsSync(dataPath), true, 'src/data/questions.json should exist')
  const data = JSON.parse(readFileSync(dataPath, 'utf8'))
  assert.equal(Array.isArray(data), true, 'question database should be an array')

  const random = data.filter((q) => q.exam_set === null)
  assert.equal(random.length, 140, 'random practice bank should contain 140 questions')

  for (const set of ['A', 'B', 'C', 'D']) {
    const official = data.filter((q) => q.exam_set === set)
    assert.equal(official.length, 40, `official exam ${set} should contain 40 questions`)
    assert.deepEqual(
      official.map((q) => q.exam_position),
      Array.from({ length: 40 }, (_, i) => i + 1),
      `official exam ${set} should be in fixed 1-40 order`,
    )
  }
})

test('app source no longer imports or depends on Supabase', () => {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
  assert.equal(pkg.dependencies?.['@supabase/supabase-js'], undefined)

  const sourceFiles = listFiles(join(root, 'src')).filter((file) => /\.(ts|vue)$/.test(file))
  const combinedSource = sourceFiles.map((file) => readFileSync(file, 'utf8')).join('\n')
  assert.equal(combinedSource.includes('@supabase'), false)
  assert.equal(combinedSource.includes('@/lib/supabase'), false)
  assert.equal(combinedSource.includes('supabase.from'), false)
})

function listFiles(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    return statSync(path).isDirectory() ? listFiles(path) : [path]
  })
}
