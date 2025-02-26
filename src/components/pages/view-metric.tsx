import {
	Accordion,
	Badge,
	Button,
	Chip,
	ChipGroup,
	Collapse,
	Divider,
	Grid,
	Group,
	Skeleton,
	Stack,
	Table,
	Text,
	Textarea,
	TextInput,
	Timeline,
	Title,
} from '@mantine/core'
import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router'
import { useMetric } from '../../api/metric/use-metric'
import { MetricNotFoundPage } from '../metric-not-found'
import { useMetricLogs } from '../../api/metric/use-metric-logs'
import { format, formatDistanceToNow } from 'date-fns'
import {
	IconChevronDown,
	IconChevronRight,
	IconPin,
	IconRuler,
	IconRuler2,
} from '@tabler/icons-react'

const ViewMetricPage = () => {
	const { id } = useParams()
	const metric = useMetric(id)
	const logs = useMetricLogs(id)

	const [openLogs, setOpenLogs] = useState<Set<string>>(new Set())

	const toggleLog = (id: string) =>
		setOpenLogs((current) => {
			const next = new Set(current)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})

	if (metric === null) return <MetricNotFoundPage />
	if (metric === undefined) return <Skeleton />

	return (
		<Stack>
			<Group>
				<Title flex="1 1 0">{metric.name}</Title>
				<Button component={Link} to="log">
					Log
				</Button>
				<Button component={Link} to="edit">
					Edit
				</Button>
			</Group>

			<Accordion>
				<Timeline bulletSize={24} lineWidth={2}>
					{logs?.map((log) => (
						<Timeline.Item
							bullet={
								openLogs.has(log.id) ? (
									<IconChevronDown size={12} />
								) : (
									<IconChevronRight size={12} />
								)
							}
							title={format(new Date(log.createdAt), 'PP p')}
							key={log.id}
							onClick={() => toggleLog(log.id)}
							style={{ cursor: 'pointer' }}
							lineVariant="dashed"
						>
							<Collapse in={openLogs.has(log.id)} mt="sm">
								<Divider />
								<Stack py="sm">
									{log.values.map(({ measurement, value }) => {
										const type = metric.measurements?.find(
											({ name }) => measurement === name,
										)?.type

										return (
											<Group key={measurement} c="dimmed" align="start">
												<Title order={5} size="sm" flex="0 0 6rem">
													{measurement}
												</Title>
												<Group flex="1 1 0">
													{type === 'Choice' &&
														value?.split(',').map((badgeLabel) => (
															<Badge size="xs" key={badgeLabel}>
																{badgeLabel}
															</Badge>
														))}
													{type !== 'Choice' && <Text size="xs">{value}</Text>}
												</Group>
											</Group>
										)
									})}
								</Stack>
								<Divider />
								<Text size="xs" mt="xs" fs="italic">
									Logged{' '}
									{formatDistanceToNow(log.createdAt, { addSuffix: true })}
								</Text>
							</Collapse>
						</Timeline.Item>
					))}
				</Timeline>
			</Accordion>
		</Stack>
	)
}

export { ViewMetricPage }
