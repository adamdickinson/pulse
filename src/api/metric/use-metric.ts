import { useEffect, useState } from 'react'
import { useDb } from '../../context/db'
import type { MetricDocument } from '../../schemas/metric'

const useMetric = (name?: string) => {
	const db = useDb()
	const [metric, setMetric] = useState<MetricDocument | null | undefined>(
		undefined,
	)

	useEffect(() => {
		if (!name) return
		db?.metrics.findOne(name).exec().then(setMetric)
	}, [name, db])

	return name ? metric : null
}

export { useMetric }
