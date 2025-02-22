import {
	validationSchema as metricValidationSchema,
	type Metric,
} from '../../schemas/metric'
import { useDb } from '../../context/db'

interface Options {
	onSuccess?(metric: Metric): void
}

function useUpdateMetric(
	id: string,
	options: Options,
): [(rawMetric: unknown) => Promise<void>]
function useUpdateMetric(
	id: string | undefined | null,
	options: Options,
): [undefined | ((rawMetric: unknown) => Promise<void>)]
function useUpdateMetric(
	id: string | undefined | null,
	{ onSuccess }: Options,
) {
	const db = useDb()
	if (!id) return [undefined] as const
	return [
		async (rawMetric: unknown) => {
			const metric = metricValidationSchema.parse(rawMetric)
			if (!db) return
			await db.metrics.findOne(id).patch(metric)
			onSuccess?.(metric)
		},
	] as const
}

export { useUpdateMetric }
