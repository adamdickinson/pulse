import { build, file, write } from 'bun'
import { join } from 'node:path'

const ROOT_DIR = join(import.meta.dirname, '..')
const SRC_DIR = join(import.meta.dirname)

await build({
	entrypoints: ['./src/entry.tsx'],
	outdir: 'dist/static',
	root: SRC_DIR,
	target: 'browser',
	throw: true,
})

const htmlFile = file(join(ROOT_DIR, 'src/index.html'))
await write(file(join(ROOT_DIR, 'dist/index.html')), htmlFile)
