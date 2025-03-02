import {
	toTypedRxJsonSchema,
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxDocument,
	type RxJsonSchema,
} from 'rxdb'
import { z } from 'zod'

const jsonSchema = {
	title: 'Metric',
	description: 'A distinct health concern; e.g. blood pressure, stress, etc',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: { type: 'string', maxLength: 100 },
		name: { type: 'string' },
		imageUrl: { type: 'string' },
		schedule: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					start: { type: 'string' },
					interval: { type: 'string' },
				},
				required: ['start', 'interval'],
			},
		},
		measurements: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					id: { type: 'string', maxLength: 100 },
					type: { type: 'string' },
					name: { type: 'string' },
				},
				required: ['id', 'type', 'name'],
			},
		},
	},
	required: ['id', 'name'],
} as const

const schemaType = toTypedRxJsonSchema(jsonSchema)

const validationSchema = z.object({
	id: z.string().max(100),
	name: z.string(),
	schedule: z.array(
		z.object({
			start: z.coerce.string(),
			interval: z.string(),
		}),
	),
	measurements: z.array(
		z.object({
			id: z.string(),
			type: z.string(),
			name: z.string(),
		}),
	),
})

type Metric = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaType>
type MetricDocument = RxDocument<Metric>

export { jsonSchema, validationSchema }
export type { Metric, MetricDocument }
