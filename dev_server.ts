import { serve } from 'bun'
import devHtml from './dev.html'

const apiKey = process.env.DOCUPANDA_API_KEY
if (!apiKey) throw new Error('DOCUPANDA_API_KEY is not set')

const server = serve({
	routes: {
		'/api-key': () => {
			return new Response(apiKey)
		},
		'/*': devHtml,
	},
	development: true,
})

console.log(`🚀 Server running at ${server.url}`)
