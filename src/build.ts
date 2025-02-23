import { build, file, Glob, write } from 'bun'
import { basename, join } from 'node:path'

const ROOT_DIR = join(import.meta.dirname, '..')
const SRC_DIR = join(import.meta.dirname)

await build({
	entrypoints: ['./src/entry.tsx'],
	outdir: 'dist/static',
	root: SRC_DIR,
	target: 'browser',
	throw: true,
})

const publicGlob = new Glob('public/*')
for await (const filepath of publicGlob.scan(process.cwd())) {
	await write(`dist/${basename(filepath)}`, file(filepath))
}

const htmlFile = file(join(ROOT_DIR, 'src/index.html'))
await write(file(join(ROOT_DIR, 'dist/index.html')), htmlFile)
