import { useEffect, useMemo, useState } from 'react'
import { useDb } from '../../context/db'
import type { Metric } from '../../schemas/metric'

const useMetric = (name: string) => {
	const db = useDb()
	const [metric, setMetric] = useState<Metric>([])

	useEffect(() => {
		db?.metrics.findOne(name).exec().then(setMetric)
	}, [name, db])

	return metric
}

export { useMetric }
