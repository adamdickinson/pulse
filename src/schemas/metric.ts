import {
	toTypedRxJsonSchema,
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxJsonSchema,
} from 'rxdb'

const metricSchema = {
	title: 'Metric',
	description: 'A distinct health concern; e.g. blood pressure, stress, etc',
	version: 0,
	primaryKey: 'name',
	type: 'object',
	properties: {
		name: { type: 'string', maxLength: 100 },
		measurements: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					type: { type: 'string' },
					name: { type: 'string' },
				},
			},
		},
	},
	required: ['name'],
} as const satisfies RxJsonSchema<any>

const schemaType = toTypedRxJsonSchema(metricSchema)

type Metric = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaType>

export { metricSchema }
export type { Metric }
