#!/usr/bin/env bun
import { build, file, Glob, write, type HTMLBundle } from 'bun'
import { basename } from 'node:path'

const server = Bun.serve({
	// Enable development mode for:
	// - Detailed error messages
	// - Rebuild on request
	development: true,

	// Handle API requests
	async fetch(req) {
		const path = new URL(req.url).pathname
		if (path === '/service-worker.js') {
			return new Response(Bun.file('./dist/service-worker.js'))
		}

		if (path.startsWith('/static/')) {
			return new Response(Bun.file(`./dist/${path.slice(8)}`))
		}

		const publicGlob = new Glob('public/*')
		for await (const filepath of publicGlob.scan(process.cwd())) {
			await write(`dist/${basename(filepath)}`, file(filepath))
		}

		await build({
			entrypoints: ['./public/index.html'],
			outdir: 'dist',
			minify: {
				whitespace: true,
				identifiers: true,
				syntax: true,
			},
			throw: true,
		})

		// Return 404 for unmatched routes
		return new Response(Bun.file('./public/index.html'), {
			headers: {
				'Referrer-Policy': 'no-referrer-when-downgrade',
			},
		})
	},
})

console.log(`Listening on ${server.url}`)
