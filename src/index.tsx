import { ProvideApi } from './api'
import './src.css'
import { ReviewView } from './review_view'
import { EmptyView } from './empty_view'
import { Routes, Route, useNavigate, useParams, Link } from 'react-router'
import { useReviewObjects } from './api'
import { useEffect, useState } from 'react'

export type DocupandaReviewProps = {
	apiKey: string
}

function ReviewViewRoute() {
	const navigate = useNavigate()
	const { standardizationId, documentId, schemaId } = useParams()

	if (!standardizationId || !documentId || !schemaId) {
		return <EmptyView message="Review could not be normalized" />
	}

	return (
		<ReviewView
			standardizationId={standardizationId}
			documentId={documentId}
			schemaId={schemaId}
			onSelect={() => navigate('/')} // Go back to list on close
		/>
	)
}

function DocumentListPage() {
	const { data, isLoading, error } = useReviewObjects()

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading documents</div>
	if (!data || !Array.isArray(data)) return <div>No documents found</div>

	// Sort by timestamp descending if available, converting to number if needed
	const sorted = [...data].sort((a, b) => {
		const aTime = a.timestamp ? +new Date(a.timestamp) : 0
		const bTime = b.timestamp ? +new Date(b.timestamp) : 0
		return bTime - aTime
	})

	console.log(sorted)

	return (
		<div className="max-w-2xl mx-auto p-8">
			<h1 className="text-2xl font-bold mb-4">Select a document to review</h1>
			<ul className="space-y-2">
				{sorted.map(doc => (
					<li
						key={`${doc.standardizationId}-${doc.documentId}-${doc.schemaId}`}
						className="bg-white rounded shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between"
					>
						<div>
							<div className="font-semibold">{doc.filename}</div>
							<div className="text-gray-500 text-sm">
								{doc.timestamp ? new Date(doc.timestamp).toLocaleString() : 'No timestamp'}
							</div>
						</div>
						<Link
							className="mt-2 md:mt-0 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
							to={`/review/${doc.standardizationId}/${doc.documentId}/${doc.schemaId}`}
						>
							Review
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export function DocupandaReview() {
	const [apiKey, setApiKey] = useState<string | null>(null)

	useEffect(() => {
		fetch('/api-key')
			.then(res => res.text())
			.then(setApiKey)
			.catch(err => {
				console.error('Failed to fetch API key', err)
			})
	}, [])

	if (!apiKey) return null // or show a loading spinner

	return (
		<ProvideApi apiKey={apiKey}>
			<Routes>
				<Route path="/" element={<DocumentListPage />} />
				<Route path="/review/:standardizationId/:documentId/:schemaId" element={<ReviewViewRoute />} />
				<Route path="*" element={<EmptyView message="Not found" />} />
			</Routes>
		</ProvideApi>
	)
}
