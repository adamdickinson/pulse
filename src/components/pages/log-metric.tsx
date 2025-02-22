import {
	Button,
	Skeleton,
	Stack,
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

const LogMetricPage = () => {
	const { id } = useParams()
	const metric = useMetric(id)

	const [log] = useLogMetric({})

	const form = useForm<Partial<LogEntry>>({
		mode: 'controlled',
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

	const handleSubmit = async (data: unknown) => {
		const newLog = logEntryValidationSchema.parse(data)
		await log(newLog)
		navigate(`/metrics/${id}`)
	}

	if (!id || metric === null) return <MetricNotFoundPage />
	if (metric === undefined) return <Skeleton />

	return (
		<Form form={form} onSubmit={handleSubmit}>
			<Title>{metric.name}</Title>
			<Stack gap="sm">
				{metric.measurements?.map((measurement, index) => (
					<React.Fragment key={measurement.name}>
						{measurement.type === 'Number' && (
							<TextInput
								label={measurement.name}
								type="number"
								{...form.getInputProps(`values.${index}.value`)}
							/>
						)}
						{measurement.type === 'Paragraph' && (
							<Textarea
								label={measurement.name}
								{...form.getInputProps(`values.${index}.value`)}
							/>
						)}
					</React.Fragment>
				))}
				<Button type="submit">Log</Button>
			</Stack>
		</Form>
	)
}

export { LogMetricPage }
