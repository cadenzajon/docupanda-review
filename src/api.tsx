import createClient from 'openapi-react-query'
import createFetchClient from 'openapi-fetch'
import { createContext, useContext } from 'react'
import { type paths } from './api_schema'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
const client = createClient(createFetchClient<paths>({ baseUrl: 'https://app.docupanda.io/' }))

const ApiProvider = createContext<string | null>(null)

export function ProvideApi(props: { apiKey: string; children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ApiProvider.Provider value={props.apiKey}>{props.children}</ApiProvider.Provider>
		</QueryClientProvider>
	)
}

function useHeaders() {
	const apiKey = useContext(ApiProvider)
	if (!apiKey) throw new Error('useApiKey must be used within a ProvideApiKey')

	return { 'X-API-Key': apiKey, accept: 'application/json' }
}

export function useReviewObjects() {
	return client.useQuery('get', '/reviews', { headers: useHeaders() })
}

export function useReviewObject(standardizationId: string) {
	return client.useQuery('get', '/review', {
		params: { query: { standardization_id: standardizationId } },
		headers: useHeaders(),
	})
}

export function useSchema(schemaId: string) {
	return client.useQuery('get', '/schema/{schema_id}', {
		params: { path: { schema_id: schemaId } },
		headers: useHeaders(),
	})
}

export function useOriginalUrl(documentId: string) {
	return client.useQuery('get', '/document/{document_id}/download/original-url', {
		params: { path: { document_id: documentId } },
		headers: useHeaders(),
	})
}
