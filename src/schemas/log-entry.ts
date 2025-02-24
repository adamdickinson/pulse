import {
	toTypedRxJsonSchema,
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxDocument,
	type RxJsonSchema,
} from 'rxdb'
import { z } from 'zod'

const jsonSchema = {
	title: 'Log Entry',
	description: 'A recording of a logEntry.',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: { type: 'string', maxLength: 100 },
		createdAt: { type: 'integer' },
		metricId: { type: 'string', maxLength: 100 },
		values: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					measurement: { type: 'string' },
					value: { type: 'string' },
				},
			},
		},
	},
	required: ['id', 'createdAt', 'metricId', 'values'],
} as const

const schemaType = toTypedRxJsonSchema(jsonSchema)

const validationSchema = z.object({
	id: z.string().max(100),
	createdAt: z.number(),
	metricId: z.string().max(100),
	values: z.array(
		z.object({
			measurement: z.string(),
			value: z.union([
				z.array(z.string()).transform((value) => value.join(',')),
				z.string(),
			]),
		}),
	),
})

type LogEntry = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaType>
type LogEntryDocument = RxDocument<LogEntry>

export { jsonSchema, validationSchema }
export type { LogEntry, LogEntryDocument }
