import { useCallback } from 'react'
import type { LogEntry } from '../../schemas/log-entry'
import { useDb } from '../../context/db'
import { randomId } from '@mantine/hooks'

interface Props {
	onSuccess?(logEntry: LogEntry): void
}

const useLogMetric = ({ onSuccess }: Props) => {
	const db = useDb()
	return [
		async (logEntry: Omit<LogEntry, 'createdAt' | 'id'>) => {
			if (!db) return
			const createdEntry = {
				...logEntry,
				id: randomId('log'),
				createdAt: Date.now(),
			}
			await db.logEntries.insert(createdEntry)
			onSuccess?.(createdEntry)
		},
	]
}

export { useLogMetric }
