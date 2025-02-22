import {
	validationSchema as metricValidationSchema,
	type Metric,
} from '../../schemas/metric'
import { useDb } from '../../context/db'

interface Options {
	onSuccess?(metric: Metric): void
}

const useCreateMetric = ({ onSuccess }: Options) => {
	const db = useDb()
	return [
		async (rawMetric: unknown) => {
			const metric = metricValidationSchema.parse(rawMetric)
			if (!db) return
			await db.metrics.insert(metric)
			onSuccess?.(metric)
		},
	]
}

export { useCreateMetric }
