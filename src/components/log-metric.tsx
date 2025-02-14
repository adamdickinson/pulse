import { Button, Textarea, TextInput, Title } from '@mantine/core'
import { useParams } from 'react-router'
import { useMetric } from '../api/metric/use-metric'
import { Form, useForm } from '@mantine/form'
import React, { useEffect } from 'react'
import { useLogMetric } from '../api/metric/use-log-metric'

const LogMetricPage = () => {
	const { name } = useParams()
	if (!name) throw new Error('Nope')
	const metric = useMetric(name)
	const [log] = useLogMetric(name)

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { metricName: name, values: [] },
	})

	useEffect(() => {
		if (!metric) return
		form.setValues({
			metricName: name,
			values:
				metric.measurements?.map(({ name }) => ({
					measurement: name,
					value: '',
				})) ?? [],
		})
	}, [metric, form.setInitialValues])

	console.log(form.getValues())

	if (!metric) return null

	return (
		<Form form={form} onSubmit={log}>
			<Title>{metric.name}</Title>
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
		</Form>
	)
}

export { LogMetricPage }
