import {
	Accordion,
	AccordionItem,
	Button,
	Center,
	Container,
	Flex,
	Group,
	Input,
	InputLabel,
	SegmentedControl,
	Select,
	Stack,
	TableOfContents,
	Tabs,
	Text,
	TextInput,
	Title,
} from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form'
import { Icon123, IconNote, IconNumber, IconPlus } from '@tabler/icons-react'
import { useMetrics } from '../api/metric/use-metrics'
import { Link } from 'react-router'
import React from 'react'

const MetricsPage = () => {
	const metrics = useMetrics()

	return (
		<Stack>
			<Group justify="flex-end">
				<Button component={Link} to="/metrics/create" variant="outline">
					Create Metric
				</Button>
			</Group>
			<Tabs orientation="vertical">
				<Tabs.List>
					{metrics.map(({ name }) => (
						<Tabs.Tab key={name} value={name}>
							{name}
						</Tabs.Tab>
					))}
				</Tabs.List>

				{metrics.map(({ name, measurements }) => (
					<Tabs.Panel key={name} value={name}>
						<Container>
							<Title order={3}>{name}</Title>
							<ul>
								{measurements?.map(({ name, type }) => (
									<li key={name}>
										<Text size="sm">
											{name} ({type})
										</Text>
									</li>
								))}
							</ul>
						</Container>
					</Tabs.Panel>
				))}
			</Tabs>
		</Stack>
	)
}

export { MetricsPage }
