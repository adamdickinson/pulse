import {
	Anchor,
	Button,
	Divider,
	Grid,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useMetrics } from '../../api/metric/use-metrics'
import { Link } from 'react-router'

const MetricsPage = () => {
	const metrics = useMetrics()

	return (
		<Stack>
			<Group justify="space-between">
				<Title>Metrics</Title>
				<Button component={Link} to="/metrics/add" variant="outline">
					<Group gap="sm" align="center">
						<IconPlus /> Add Metric
					</Group>
				</Button>
			</Group>
			<Divider />
			{!metrics.length && (
				<Text>
					Start tracking by{' '}
					<Anchor component={Link} to="add">
						adding a new metric
					</Anchor>
					.
				</Text>
			)}
			{!!metrics.length && (
				<Grid>
					{metrics.map(({ id, name }) => (
						<Grid.Col span={4} key={id}>
							<Button
								variant="outline"
								component={Link}
								to={id}
								c="inherit"
								display="block"
								h="3rem"
								lh="3rem"
								px="md"
								td="none"
								w="100%"
							>
								{name}
							</Button>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export { MetricsPage }
