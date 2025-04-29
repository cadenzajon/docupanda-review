export type EmptyViewProps = {
	emptiness?: { isLoading: boolean; error: unknown | undefined }
	message?: string
}

export function EmptyView(props: EmptyViewProps) {
	if (props.emptiness?.error) console.error(props.emptiness.error)

	return (
		<div className="flex flex-col items-center justify-center p-2 text-center">
			{props.message ? props.message : props.emptiness?.isLoading ? 'Loading...' : 'An error has occurred'}
		</div>
	)
}
