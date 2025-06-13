import { useState } from 'react'
import { ProvideApi } from './api'
import { ActiveReview, ListReviews } from './list_reviews'
import './src.css'
import { ReviewView } from './review_view'
import { EmptyView } from './empty_view'

export type DocupandaReviewProps = {
	apiKey: string
}

export function DocupandaReview({ apiKey }: DocupandaReviewProps) {
	const [selectedReview, setSelectedReview] = useState<ActiveReview | null>(null)

	return (
		<div className="flex items-center justify-center min-h-screen">
			<ProvideApi apiKey={apiKey}>
				{selectedReview && selectedReview.schemaId ? (
					<ReviewView
						standardizationId={selectedReview.standardizationId}
						documentId={selectedReview.documentId}
						schemaId={selectedReview.schemaId}
						onSelect={setSelectedReview}
					/>
				) : selectedReview ? (
					<EmptyView message="Review could not be normalized" />
				) : (
					<ListReviews onSelect={setSelectedReview} />
				)}
			</ProvideApi>
		</div>
	)
}
