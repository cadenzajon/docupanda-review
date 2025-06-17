import { useMemo, useState } from 'react'
import { useReviewObject, useSchema } from './api'
import { Decoration, DocumentView } from './document_view'
import { EmptyView } from './empty_view'
import { Form } from './form'
import { ActiveReview } from './list_reviews'
import { uiSchema } from './ui_schema'

export type ReviewViewProps = {
	standardizationId: string
	documentId: string
	schemaId: string
	onSelect?: (review: ActiveReview | null) => void
}

export function ReviewView(props: ReviewViewProps) {
	// console.log('ReviewView render', props)
	const review = useReviewObject(props.standardizationId)
	const schema = useSchema(props.schemaId)
	const [activePath, setActivePath] = useState<string | null>(null)

	const parsed = useMemo(() => {
		if (!review.data) return null

		return parseData('#', review.data.data)
	}, [review.data])

	return (
		<div className="grid grid-cols-12 gap-4 size-full">
			<div className="col-span-4 max-h-screen overflow-y-scroll min-w-0 h-full shadow-xl rounded-lg overflow-hidden">
				{!review.data ? (
					<EmptyView emptiness={review} />
				) : (
					<div className="flex flex-col gap-4 size-full pt-4 basis-1/3 min-w-0">
						<div className="px-4 flex items-center gap-2">
							<h2 className="text-2xl">{review.data.filename}</h2>
							<button
								className="ml-2 text-gray-400 hover:text-red-500 text-lg font-bold px-2 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
								title="Close review"
								onClick={() => props.onSelect?.(null)}
							>
								&times;
							</button>
						</div>
						<h4>{schema.data?.schemaName}</h4>

						{!schema.data ? (
							<EmptyView emptiness={schema} />
						) : (
							<div className="flex-1 min-h-0 p-4">
								<Form
									schema={schema.data.jsonSchema as any}
									uiSchema={uiSchema}
									data={parsed?.data ?? {}}
									onDataChange={() => null}
									setActivePath={setActivePath}
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="col-span-8 max-h-screen ovherflow-y-scroll min-w-0 h-full shadow-xl rounded-lg overflow-hidden">
				<DocumentView documentId={props.documentId} decorations={parsed?.decorations ?? []} activePath={activePath} />
			</div>
		</div>
	)
}

export type ParsedData = {
	decorations: Decoration[]
	data: unknown
}

function parseData(path: string, data: unknown): ParsedData {
	if (Array.isArray(data)) {
		const newData = []
		const decorations: Decoration[] = []

		for (const index in data) {
			const itemParsed = parseData(`${path}/${index}`, data[index])

			newData.push(itemParsed.data)
			decorations.push(...itemParsed.decorations)
		}

		return {
			data: newData,
			decorations,
		}
	}

	if (typeof data === 'object' && data) {
		const d = data as { value?: unknown; review?: { boundingBoxes: [number, number, number, number][]; page: number } | null } & Record<
			string,
			unknown
		>

		// if (d.value !== undefined && d.review === null && Object.keys(d).length === 2) {
		// 	return { data: d.value, decorations: [] }
		// }

		if (d.value !== undefined && d.review && Object.keys(d).length === 2) {
			const box = d.review.boundingBoxes?.[0] ?? []
			const decoration: Decoration = {
				path,
				x: box[0],
				y: box[1],
				width: box[2],
				height: box[3],
				pageNumber: d.review.page,
			}

			return {
				data: d.value,
				decorations: [decoration],
			}
		}

		const newData: Record<string, unknown> = {}
		const decorations: Decoration[] = []

		for (const key in d) {
			const itemParsed = parseData(
				`${path}/${key}`,
				// @ts-ignore
				d[key]
			)

			newData[key] = itemParsed.data
			decorations.push(...itemParsed.decorations)
		}

		return {
			data: newData,
			decorations,
		}
	}

	throw new Error('unreachable')
}
