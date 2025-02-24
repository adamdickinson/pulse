import { useEffect, useMemo, useState, type DependencyList } from 'react'
import { useDb } from '../../context/db'
import type { Metric } from '../../schemas/metric'
import type { MangoQuery } from 'rxdb'

const useMetrics = (query?: MangoQuery<Metric>, deps?: DependencyList) => {
	// biome-ignore lint/correctness/useExhaustiveDependencies: own deps
	const memoisedQuery = useMemo(() => query, deps ?? [query])
	const db = useDb()
	const [metrics, setMetrics] = useState<Metric[]>([])

	useEffect(() => {
		db?.metrics.find(memoisedQuery).exec().then(setMetrics)
	}, [db, memoisedQuery])

	return metrics
}

export { useMetrics }
