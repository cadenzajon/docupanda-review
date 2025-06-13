import { JsonSchema, OwnPropsOfControl } from '@jsonforms/core'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import { useMemo } from 'react'

export type Specifier = {
	path: string
	id: string
}

function resolveSchemaPointer(schema: JsonSchema, pointer: string | undefined): JsonSchema | undefined {
	if (!pointer || !pointer.startsWith('#/')) return undefined
	const parts = pointer.replace(/^#\//, '').split('/')
	let current: any = schema
	for (const part of parts) {
		current = current[part]
	}

	return current
}

export type TrapRendererProps = {
	schema: JsonSchema
	activate(path: string): void
	Renderer: React.ComponentType<OwnPropsOfControl>
	props: OwnPropsOfControl
}

function TrapRenderer({ activate, Renderer, schema, props }: TrapRendererProps) {
	const inner = <Renderer {...props} />

	if (!props.id) return inner

	if (!props.id.startsWith('#/properties/')) return inner

	const trueSchema = resolveSchemaPointer(schema, props.id)
	if (trueSchema?.type !== 'string') return inner

	const cleanedId = props.id.replaceAll('/properties', '')

	return (
		<div
			className="test-class"
			onMouseOver={event => {
				// event.stopPropagation()
				activate(cleanedId)
			}}
		>
			{inner}
		</div>
	)
}

export type FormProps = {
	schema: JsonSchema
	uiSchema?: any
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
					<TrapRenderer props={renderProps} Renderer={renderer.renderer} activate={props.setActivePath} schema={props.schema} />
				),
			})),
		[]
	)

	return (
		<JsonForms
			schema={props.schema}
			uischema={props.uiSchema ?? { type: 'Control', scope: '#' }}
			data={props.data}
			cells={materialCells}
			renderers={trappedRenderers}
			onChange={({ data }) => console.log(data)}
		/>
	)
}
