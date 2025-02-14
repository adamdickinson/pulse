import { useEffect, useMemo, useState } from 'react'
import { useDb } from '../../context/db'
import type { Metric } from '../../schemas/metric'

const useMetrics = () => {
	const db = useDb()
	const [metrics, setMetrics] = useState<Metric[]>([])

	useEffect(() => {
		db?.metrics.find().exec().then(setMetrics)
	}, [db])

	return metrics
}

export { useMetrics }
