import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Text,
	Select,
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
import { MetricNotFoundPage } from '../metric-not-found'
import type { Metric } from '../../schemas/metric'
import { IconX, IconPlus } from '@tabler/icons-react'
import { randomId } from '@mantine/hooks'
import { ScheduleInput } from '../form/schedule-input'
import { useUpdateMetric } from '../../api/metric/use-update-metric'

const EditMetricPage = () => {
	const { id } = useParams()
	const metric = useMetric(id)

	const form = useForm<Metric>({ mode: 'uncontrolled' })

	const { measurements } = form.getValues()

	const addMeasurement = () => {
		form.insertListItem('measurements', {
			id: randomId(''),
			name: '',
			type: null,
		})
	}

	const removeMeasurement = (index: number) => {
		form.removeListItem('measurements', index)
	}

	const navigate = useNavigate()
	const [update] = useUpdateMetric(id, {
		onSuccess: () => {
			navigate(`/metrics/${id}`)
		},
	})

	useEffect(() => {
		if (!metric) return
		form.setValues(metric.toMutableJSON())
	}, [metric, form.setValues])

	if (!id || metric === null) return <MetricNotFoundPage />
	if (metric === undefined) return <Skeleton />

	return (
		<Form form={form} onSubmit={update}>
			<Title>Edit Metric</Title>
			<Text mt="sm">
				A metric is something you want to track. It could be your average heart
				rate, blood pressure, or a daily diary.
			</Text>
			<Stack mt="xl" gap="xl">
				<TextInput
					placeholder="Metric Name, e.g. Blood Pressure"
					size="lg"
					{...form.getInputProps('name')}
				/>
				<Stack>
					<Title size="h4">Measurements</Title>
					{measurements?.map((item, index) => (
						<Stack key={item.id}>
							<Flex gap="md" align="center">
								<TextInput
									flex="1 1 0"
									placeholder="Name"
									{...form.getInputProps(`measurements.${index}.name`)}
									key={form.key(`measurements.${index}.name`)}
								/>
								<Select
									flex="1 1 0"
									data={['Number', 'Paragraph', 'Choice', 'Rating']}
									placeholder="Type"
									{...form.getInputProps(`measurements.${index}.type`)}
									key={form.key(`measurements.${index}.type`)}
								/>
								<ActionIcon variant="light">
									<IconX onClick={() => removeMeasurement(index)} />
								</ActionIcon>
							</Flex>
						</Stack>
					))}
					<Group>
						<Button variant="outline" onClick={addMeasurement}>
							<IconPlus />{' '}
							<Text ms="xs" size="sm">
								Add measurement
							</Text>
						</Button>
					</Group>
				</Stack>
				<Stack>
					<Title order={4}>Schedule</Title>
					<Text>Get reminders to log your data.</Text>
					<ScheduleInput
						{...form.getInputProps('schedule')}
						key={form.key('schedule')}
					/>
				</Stack>
				<Group>
					<Button type="submit">Save Metric</Button>
				</Group>
			</Stack>
		</Form>
	)
}

export { EditMetricPage }
