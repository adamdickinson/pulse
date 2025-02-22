import { useMemo } from 'react'
import { useMetrics } from '../api/metric/use-metrics'
import { Temporal } from '@js-temporal/polyfill'

const useUpcomingReminders = () => {
	const metrics = useMetrics()
	return useMemo(() => {
		const now = Temporal.Now.plainDateTimeISO()
		return metrics
			.flatMap(
				(metric) =>
					metric.schedule?.map((routine) => ({ routine, metric })) ?? [],
			)
			.filter(({ routine: { start, interval } }) => {
				const firstTime = Temporal.PlainDateTime.from(start)
				if (interval === 'weekly')
					return (
						now.dayOfWeek === firstTime.dayOfWeek &&
						Temporal.PlainTime.compare(
							firstTime.toPlainTime(),
							now.toPlainTime(),
						) >= 0
					)
				throw new Error('Only weekly is supported')
			})
	}, [metrics])
}

export { useUpcomingReminders }
