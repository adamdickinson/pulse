import { useEffect, useMemo, useState } from 'react'
import { useDb } from '../../context/db'
import type { LogEntryDocument } from '../../schemas/log-entry'

const useMetricLogs = (metricId?: string) => {
	const db = useDb()
	const [logs, setLogs] = useState<LogEntryDocument[] | null | undefined>(
		undefined,
	)

	useEffect(() => {
		if (!metricId) return
		db?.logEntries
			.find({ selector: { metricId }, sort: [{ createdAt: 'desc' }] })
			.exec()
			.then(setLogs)
	}, [metricId, db])

	return metricId ? logs : null
}

export { useMetricLogs }
