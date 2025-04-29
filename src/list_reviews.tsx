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
		<div className="flex flex-col">
			{reviews.data.map(review => {
				return (
					<button
						key={review.standardizationId}
						onClick={() =>
							props.onSelect({
								standardizationId: review.standardizationId,
								documentId: review.documentId,
								schemaId: review.schemaId || null,
							})
						}
					>
						{review.filename}
					</button>
				)
			})}
		</div>
	)
}
