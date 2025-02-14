import {
	toTypedRxJsonSchema,
	type ExtractDocumentTypeFromTypedRxJsonSchema,
	type RxJsonSchema,
} from 'rxdb'

const logEntrySchema = {
	title: 'Log Entry',
	description: 'A recording of a logEntry.',
	version: 0,
	primaryKey: 'id',
	type: 'object',
	properties: {
		id: { type: 'string', maxLength: 100 },
		createdAt: { type: 'integer' },
		metricName: { type: 'string', maxLength: 100 },
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
	required: ['id', 'createdAt', 'metricName', 'values'],
} as const satisfies RxJsonSchema<any>

const schemaType = toTypedRxJsonSchema(logEntrySchema)

type LogEntry = ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaType>

export { logEntrySchema }
export type { LogEntry }
