import { useOriginalUrl } from './api'
import { EmptyView } from './empty_view'
import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`,
	import.meta.url
).toString()

export type Decoration = {
	path: string
	x: number
	y: number
	width: number
	height: number
	pageNumber: number
}

export type DocumentViewProps = {
	documentId: string
	decorations: Decoration[]
	activePath: string | null
}

export function DocumentView(props: DocumentViewProps) {
	const originalUrl = useOriginalUrl(props.documentId)

	const processedDecorations = props.decorations.map(d => ({
		...d,
		left: d.x * 100,
		top: d.y * 100,
		width: (d.width - d.x) * 100,
		height: (d.height - d.y) * 100,
	}))

	if (!originalUrl?.data) return <EmptyView emptiness={originalUrl} />

	return (
		<div className="inline-block relative max-h-screen overflow-y-scroll">
			<div className="relative">
				<Document file={originalUrl.data}>
					<Page pageNumber={1} renderAnnotationLayer={false} renderTextLayer={false} className="w-full h-auto" />
				</Document>

				{/* Overlay bounding boxes */}
				{processedDecorations
					.filter(d => props.activePath === d.path && d.x)
					.map((decoration, i) => {
						const active = props.activePath === decoration.path && decoration.x
						const style = {
							position: 'absolute' as const,
							left: `${decoration.left}%`,
							top: `${decoration.top}%`,
							width: `${decoration.width}%`,
							height: `${decoration.height}%`,
							border: `3px solid ${active ? 'red' : 'blue'}`,
							backgroundColor: `${active ? '#ffff0080' : 'transparent'}`,
							boxSizing: 'border-box',
							pointerEvents: 'none',
						}
						return <div className="bounding-box" key={i} style={style as any} />
					})}
			</div>
		</div>
	)
}
