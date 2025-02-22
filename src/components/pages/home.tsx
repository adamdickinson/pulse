import { Anchor, Group, List, Stack, Text } from '@mantine/core'
import { useAuth } from '../../context/auth'
import { useMetrics } from '../../api/metric/use-metrics'
import { Link } from 'react-router'
import { useUpcomingReminders } from '../../hooks/use-upcoming-reminders'
import { Temporal } from '@js-temporal/polyfill'

const HomePage = () => {
	const { user } = useAuth()
	const metrics = useMetrics()
	const upcomingReminders = useUpcomingReminders()
	return (
		<>
			<Text size="xl">Hi there{user && `, ${user?.givenName}`}!</Text>
			<Stack>
				{!metrics.length && (
					<Text>
						Start by{' '}
						<Anchor to="metrics/add" component={Link}>
							setting up some metrics to track
						</Anchor>
						.
					</Text>
				)}
				{!!upcomingReminders.length && (
					<>
						<Text>Here are your upcoming log reminders:</Text>
						<List listStyleType="none">
							{upcomingReminders.map(({ routine, metric }) => (
								<List.Item key={metric.id}>
									<Group align="baseline">
										<Text c="dimmed" size="sm">
											{Temporal.PlainTime.from(routine.start).toString({
												smallestUnit: 'minute',
											})}
										</Text>
										<Anchor component={Link} to={`metrics/${metric.id}/log`}>
											{metric.name}
										</Anchor>
									</Group>
								</List.Item>
							))}
						</List>
					</>
				)}
				{!upcomingReminders.length && !!metrics.length && (
					<Text>You're all up to date!</Text>
				)}
			</Stack>
		</>
	)
}

export { HomePage }
