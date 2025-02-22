import type { LogEntry } from '../../schemas/log-entry'
import { useDb } from '../../context/db'
import { randomId } from '@mantine/hooks'
import { validationSchema as logEntryValidationSchema } from '../../schemas/log-entry'

interface Props {
	onSuccess?(logEntry: LogEntry): void
}

const useLogMetric = ({ onSuccess }: Props) => {
	const db = useDb()
	return [
		async (logEntry: Record<string, unknown>) => {
			if (!db) return
			const createdEntry = logEntryValidationSchema.parse({
				...logEntry,
				id: randomId(),
				createdAt: Date.now(),
			})
			await db.logEntries.insert(createdEntry)
			onSuccess?.(createdEntry)
		},
	]
}

export { useLogMetric }
