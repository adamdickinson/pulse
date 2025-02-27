#!/usr/bin/env bun
import App from '../public/index.html'

const server = Bun.serve({
	routes: {
		'/*': App,
	},
	development: true,
})

console.log(`Listening on ${server.url}`)
