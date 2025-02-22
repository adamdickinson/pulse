import {
	ActionIcon,
	Button,
	Flex,
	Group,
	Select,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { Form, useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useCreateMetric } from '../../api/metric/use-create-metric'
import { useNavigate } from 'react-router'
import { ScheduleInput } from '../form/schedule-input'

const AddMetricPage = () => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			id: randomId(''),
			name: '',
			measurements: [{ id: randomId('') }],
			schedule: [],
		},
	})

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
	const [create] = useCreateMetric({
		onSuccess: () => {
			navigate('/metrics')
		},
	})

	return (
		<Form form={form} onSubmit={create}>
			<Title>Add Metric</Title>
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
					{measurements.map((item, index) => (
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
									data={['Number', 'Paragraph']}
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
					<Button type="submit">Create Metric</Button>
				</Group>
			</Stack>
		</Form>
	)
}

export { AddMetricPage }
