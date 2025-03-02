import {
	validationSchema as metricValidationSchema,
	type Metric,
	type MetricDocument,
} from '../../schemas/metric'
import { useDb } from '../../context/db'

interface Options {
	name: string
	onSuccess?(metric: Metric): void
}

const useDeleteMetric = ({ name, onSuccess }: Options) => {
	const db = useDb()
	return [
		async () => {
			const metric: MetricDocument = await db.metrics.findOne(name).exec()
			await metric.remove()
			onSuccess?.(metric)
		},
	]
}

export { useDeleteMetric }
