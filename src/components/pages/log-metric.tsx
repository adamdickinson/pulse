import {
	Button,
	Divider,
	Group,
	Skeleton,
	Stack,
	TagsInput,
	Textarea,
	TextInput,
	Title,
} from '@mantine/core'
import { useNavigate, useParams } from 'react-router'
import { useMetric } from '../../api/metric/use-metric'
import { Form, useForm } from '@mantine/form'
import React, { useEffect } from 'react'
import { useLogMetric } from '../../api/metric/use-log-metric'
import { MetricNotFoundPage } from '../metric-not-found'
import {
	validationSchema as logEntryValidationSchema,
	type LogEntry,
} from '../../schemas/log-entry'
import { useMetricLogs } from '../../api/metric/use-metric-logs'
import { filter, flatMap, groupBy, mapValues, pipe, prop, unique } from 'remeda'
import { IconPencil } from '@tabler/icons-react'

const LogMetricPage = () => {
	const { id } = useParams()
	const metric = useMetric(id)
	const logs = useMetricLogs(id)

	const selectedValues = pipe(
		logs ?? [],
		flatMap(prop('values')),
		filter(
			(item): item is { measurement: string; value: string } =>
				!!item.measurement && !!item.value,
		),
		groupBy(prop('measurement')),
		mapValues((values) =>
			unique(values.map(prop('value')).flatMap((value) => value.split(','))),
		),
	)

	const [log] = useLogMetric({})

	const form = useForm<Partial<LogEntry>>({
		mode: 'uncontrolled',
		initialValues: { metricId: id, values: [] },
	})

	useEffect(() => {
		if (!metric) return
		form.setValues({
			metricId: metric.id,
			values:
				metric.measurements?.map(({ name }) => ({
					measurement: name,
					value: '',
				})) ?? [],
		})
	}, [metric, form.setValues])

	const navigate = useNavigate()

	const handleSubmit = async (data: Record<string, unknown>) => {
		await log(data)
		navigate(`/metrics/${id}`)
	}

	if (!id || metric === null) return <MetricNotFoundPage />
	if (metric === undefined) return <Skeleton />

	return (
		<Form form={form} onSubmit={handleSubmit}>
			<Stack gap="md">
				<Title>{metric.name}</Title>
				<Stack gap="lg">
					<Divider />

					{metric.measurements?.map((measurement, index) => (
						<React.Fragment key={measurement.name}>
							{measurement.type === 'Number' && (
								<TextInput
									label={measurement.name}
									type="number"
									placeholder="Enter a number"
									{...form.getInputProps(`values.${index}.value`)}
								/>
							)}
							{measurement.type === 'Paragraph' && (
								<Textarea
									label={measurement.name}
									placeholder="Write as much as you like"
									{...form.getInputProps(`values.${index}.value`)}
								/>
							)}
							{measurement.type === 'Choice' && (
								<TagsInput
									label={measurement.name}
									placeholder="Type to search or enter a new value"
									data={selectedValues[measurement.name]}
									{...form.getInputProps(`values.${index}.value`)}
								/>
							)}
						</React.Fragment>
					))}
					<Divider />
				</Stack>
				<Group justify="end">
					<Button type="submit">
						<Group gap="sm">
							<IconPencil size="16" /> Log
						</Group>
					</Button>
				</Group>
			</Stack>
		</Form>
	)
}

export { LogMetricPage }
