import { build, file, Glob, write } from 'bun'
import { basename, join } from 'node:path'

const ROOT_DIR = join(import.meta.dirname, '..')
const SRC_DIR = join(import.meta.dirname)

const publicGlob = new Glob('public/*')
for await (const filepath of publicGlob.scan(process.cwd())) {
	await write(`dist/${basename(filepath)}`, file(filepath))
}

await build({
	entrypoints: ['./public/index.html'],
	outdir: 'dist',
	env: 'inline',
	publicPath: '/',
	minify: {
		whitespace: true,
		identifiers: true,
		syntax: true,
	},
	throw: true,
})
