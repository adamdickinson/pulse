#!/usr/bin/env bun
import { build, type HTMLBundle } from 'bun'
import home from './index.html'

const server = Bun.serve({
	// Enable development mode for:
	// - Detailed error messages
	// - Rebuild on request
	development: true,

	// Handle API requests
	async fetch(req) {
		const path = new URL(req.url).pathname
		if (path.startsWith('/static/'))
			return new Response(Bun.file(`./dist/${path.slice(8)}`))

		await build({
			entrypoints: ['./src/entry.tsx'],
			outdir: 'dist',
			target: 'browser',
		})

		// Return 404 for unmatched routes
		return new Response(Bun.file('./src/index.html'))
	},
})

console.log(`Listening on ${server.url}`)
