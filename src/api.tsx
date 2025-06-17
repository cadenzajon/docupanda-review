import createClient from 'openapi-react-query'
import createFetchClient from 'openapi-fetch'
import { createContext, useContext, useMemo } from 'react'
import { type paths } from './api_schema'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function createAuthedClient(apiKey: string) {
	return createClient(
		createFetchClient<paths>({
			baseUrl: 'https://app.docupipe.ai/',
			fetch: (url, options: RequestInit = {}) =>
				fetch(url, {
					...options,
					headers: {
						...(options.headers || {}),
						'X-API-Key': apiKey,
						accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}),
		})
	)
}

export const ApiProvider = createContext<ReturnType<typeof createAuthedClient> | null>(null)

export function ProvideApi(props: { apiKey: string; children: React.ReactNode }) {
	const queryClient = useMemo(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // 👈 disable tab focus refetch
					},
				},
			}),
		[]
	)

	const client = useMemo(() => createAuthedClient(props.apiKey), [props.apiKey])

	return (
		<QueryClientProvider client={queryClient}>
			<ApiProvider.Provider value={client}>{props.children}</ApiProvider.Provider>
		</QueryClientProvider>
	)
}

function useClient() {
	const client = useContext(ApiProvider)
	if (!client) throw new Error('Must be used within ProvideApi')
	return client
}

export function useUpdateSchema() {
	return useClient().useMutation('post', '/schema/update')
}

export function useReviewObjects() {
	return useClient().useQuery('get', '/reviews')
}

export function useReviewObject(standardizationId: string) {
	return useClient().useQuery('get', '/review', {
		params: { query: { standardization_id: standardizationId } },
	})
}

export function useSchema(schemaId: string) {
	return useClient().useQuery('get', '/schema/{schema_id}', {
		params: { path: { schema_id: schemaId } },
	})
}

export function useOriginalUrl(documentId: string) {
	return useClient().useQuery('get', '/document/{document_id}/download/original-url', {
		params: { path: { document_id: documentId } },
	})
}
