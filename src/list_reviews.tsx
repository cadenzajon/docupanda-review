import { useReviewObjects } from './api'
import { EmptyView } from './empty_view'

export type ActiveReview = {
	standardizationId: string
	documentId: string
	schemaId: string | null
}

export type ListReviewsProps = {
	onSelect(review: ActiveReview): void
}

export function ListReviews(props: ListReviewsProps) {
	const reviews = useReviewObjects()

	if (!reviews.data) return <EmptyView emptiness={reviews} />

	return (
		<div className="">
			<select
				className="bg-white p-2 rounded border border-gray-300 shadow-sm"
				onChange={e => {
					const value = reviews.data.find(review => review.standardizationId === e.target.value) as ActiveReview
					props.onSelect({
						standardizationId: value.standardizationId,
						documentId: value.documentId,
						schemaId: value.schemaId || null,
					})
				}}
			>
				<option value="">Select a review</option>
				{[...new Map(reviews.data.map(review => [review.standardizationId, review])).values()].map(review => {
					return (
						<option key={review.standardizationId} value={review.standardizationId}>
							{review.filename}
						</option>
					)
				})}
			</select>
		</div>
	)
}
