#!/usr/bin/env bun
import { build, file, Glob, write, type HTMLBundle } from 'bun'
import { basename } from 'node:path'
import App from '../public/index.html'

const server = Bun.serve({
	routes: {
		'/*': App,
	},
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
			define: {
				FIREBASE_API_KEY: JSON.stringify(Bun.env.FIREBASE_API_KEY),
				FIREBASE_AUTH_DOMAIN: JSON.stringify(Bun.env.FIREBASE_AUTH_DOMAIN),
				FIREBASE_PROJECT_ID: JSON.stringify(Bun.env.FIREBASE_PROJECT_ID),
				FIREBASE_STORAGE_BUCKET: JSON.stringify(
					Bun.env.FIREBASE_STORAGE_BUCKET,
				),
				FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
					Bun.env.FIREBASE_MESSAGING_SENDER_ID,
				),
				FIREBASE_APP_ID: JSON.stringify(Bun.env.FIREBASE_APP_ID),
				GOOGLE_ACCOUNTS_CLIENT_ID: JSON.stringify(
					Bun.env.GOOGLE_ACCOUNTS_CLIENT_ID,
				),
			},
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
