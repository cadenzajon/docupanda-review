import { useMemo, useState } from 'react'
import { useReviewObject, useSchema } from './api'
import { Decoration, DocumentView } from './document_view'
import { EmptyView } from './empty_view'
import { Form, Specifier } from './form'

export type ReviewViewProps = {
	standardizationId: string
	documentId: string
	schemaId: string
}

export function ReviewView(props: ReviewViewProps) {
	const review = useReviewObject(props.standardizationId)
	const schema = useSchema(props.schemaId)
	const [activePath, setActivePath] = useState<string | null>(null)

	const parsed = useMemo(() => {
		if (!review.data) return null

		return parseData('#', review.data.data)
	}, [review.data])

	return (
		<div className="size-full flex justify-center gap-4 p-4">
			<div className="min-w-0 h-full shadow-xl rounded-lg overflow-hidden">
				{!review.data ? (
					<EmptyView emptiness={review} />
				) : (
					<div className="flex flex-col gap-4 size-full pt-4 basis-1/3 min-w-0">
						<div className="px-4">
							<h2 className="text-2xl">{review.data.filename}</h2>
							<h4>{schema.data?.schemaName}</h4>
						</div>

						{!schema.data ? (
							<EmptyView emptiness={schema} />
						) : (
							<div className="overflow-y-auto flex-1 min-h-0 p-4">
								<Form
									schema={schema.data.jsonSchema as any}
									data={parsed?.data ?? {}}
									onDataChange={console.log}
									setActivePath={setActivePath}
								/>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="min-w-0 h-full shadow-xl rounded-lg overflow-hidden basis-2/3">
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
		// if (data.value !== undefined && data.review === null && Object.keys(data).length === 2) {
		// 	return { data: data.value, decorations: [] }
		// }

		if (data.value !== undefined && data.review && Object.keys(data).length === 2) {
			const box = data.review.boundingBoxes[0]
			const decoration: Decoration = {
				path,
				x: box[0],
				y: box[1],
				width: box[2],
				height: box[3],
				pageNumber: data.review.page,
			}

			return {
				data: data.value,
				decorations: [decoration],
			}
		}

		const newData: Record<string, unknown> = {}
		const decorations: Decoration[] = []

		for (const key in data) {
			const itemParsed = parseData(
				`${path}/${key}`,
				// @ts-ignore
				data[key]
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
