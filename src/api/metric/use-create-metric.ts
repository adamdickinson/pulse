import {
	validationSchema as metricValidationSchema,
	type Metric,
} from '../../schemas/metric'
import { useDb } from '../../context/db'
import { findImage } from '../../helpers/pixabay'

interface Options {
	onSuccess?(metric: Metric): void
}

const useCreateMetric = ({ onSuccess }: Options) => {
	const db = useDb()
	return [
		async (rawMetric: unknown) => {
			const metric = metricValidationSchema.parse(rawMetric)
			const imageUrl = await findImage(metric.name)
			console.log(imageUrl)
			if (!db) return
			await db.metrics.insert({ ...metric, imageUrl })
			onSuccess?.(metric)
		},
	]
}

export { useCreateMetric }
