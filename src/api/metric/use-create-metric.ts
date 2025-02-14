import { useCallback } from 'react'
import type { Metric } from '../../schemas/metric'
import { useDb } from '../../context/db'

interface Props {
	onSuccess?(metric: Metric): void
}

const useCreateMetric = ({ onSuccess }: Props) => {
	const db = useDb()
	return [
		async (metric: Metric) => {
			if (!db) return
			await db.metrics.insert(metric)
			onSuccess?.(metric)
		},
	]
}

export { useCreateMetric }
