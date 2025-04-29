import { JsonSchema, OwnPropsOfControl } from '@jsonforms/core'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { useMemo } from 'react'

export type Specifier = {
	path: string
	id: string
}

export type TrapRendererProps = {
	activate(path: string): void
	Renderer: React.ComponentType<OwnPropsOfControl>
	props: OwnPropsOfControl
}

function TrapRenderer({ activate, Renderer, props }: TrapRendererProps) {
	const inner = <Renderer {...props} />
	if (!props.id) return inner

	if (!props.id.startsWith('#/properties/')) return inner

	const base = props.id.split('/').pop()
	const parentPath = props.path ? `#/${props.path.replaceAll('.', '/')}` : '#'
	const path = `${parentPath}/${base}`

	const trueSchema = props.schema?.properties?.[base as any]

	if (trueSchema?.type !== 'string') return inner

	return (
		<div
			onMouseOver={event => {
				// event.stopPropagation()
				activate(path)
			}}
		>
			{inner}
		</div>
	)
}

export type FormProps = {
	schema: JsonSchema
	data: unknown
	onDataChange(data: unknown): void
	setActivePath(path: string | null): void
}

export function Form(props: FormProps) {
	const trappedRenderers = useMemo(
		() =>
			materialRenderers.map(renderer => ({
				...renderer,
				renderer: (renderProps: OwnPropsOfControl) => (
					<TrapRenderer props={renderProps} Renderer={renderer.renderer} activate={props.setActivePath} />
				),
			})),
		[]
	)

	return (
		<JsonForms
			schema={props.schema}
			uischema={{ type: 'Control', scope: '#' } as any}
			data={props.data}
			cells={materialCells}
			renderers={trappedRenderers}
			onChange={({ data }) => console.log(data)}
		/>
	)
}
