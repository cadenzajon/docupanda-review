import { Worker, Viewer } from '@react-pdf-viewer/core'
import { useOriginalUrl } from './api'
import { EmptyView } from './empty_view'
import { useState } from 'react'
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
	const [numPages, setNumPages] = useState(0)

	if (!originalUrl.data) return <EmptyView emptiness={originalUrl} />

	console.log(props.decorations, props.activePath)

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="relative">
				<Document file={originalUrl.data.url} onLoadSuccess={({ numPages }) => setNumPages(numPages)} loading="Loading PDF...">
					{Array.from({ length: numPages }).map((_, i) => {
						return (
							<div key={i} className="relative w-[800px] overflow-hidden">
								<Page pageNumber={i + 1} renderAnnotationLayer={false} renderTextLayer={false} width={800} />

								<div className="absolute inset-0">
									{props.decorations
										.filter(decoration => decoration.pageNumber === i + 1)
										.map(decoration => (
											<div
												key={decoration.path}
												className={`absolute border-2 ${props.activePath === decoration.path ? 'border-red-600' : 'border-slate-600'}`}
												style={{
													left: `${decoration.x * 100}%`,
													top: `${decoration.y * 100}%`,
													width: `${decoration.width * 100}%`,
													height: `${decoration.height * 100}%`,
												}}
											/>
										))}
								</div>
							</div>
						)
					})}
				</Document>
			</div>
		</div>
	)
}
