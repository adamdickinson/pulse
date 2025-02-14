import {
	ActionIcon,
	Button,
	Card,
	Flex,
	Group,
	Paper,
	Select,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { Form, useForm } from '@mantine/form'
import { randomId } from '@mantine/hooks'
import { IconPlus, IconX } from '@tabler/icons-react'
import { useCreateMetric } from '../api/metric/use-create-metric'
import { useNavigate } from 'react-router'

const CreateMetricsPage = () => {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			measurements: [{ key: randomId() }],
		},
	})

	const { measurements } = form.getValues()

	const addMeasurement = () => {
		form.insertListItem('measurements', {
			name: '',
			type: null,
			key: randomId(),
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
						<Stack key={item.key}>
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
				<Group>
					<Button type="submit">Create Metric</Button>
				</Group>
			</Stack>
		</Form>
	)
}

export { CreateMetricsPage }
