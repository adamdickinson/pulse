import {
	Anchor,
	AspectRatio,
	BackgroundImage,
	Button,
	Divider,
	Grid,
	Group,
	Stack,
	Text,
	Title,
	type ButtonProps,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useMetrics } from '../../api/metric/use-metrics'
import { Link } from 'react-router'
import styled from 'styled-components'

const BackgroundButton = styled(Button)<{ $src: string }>`
	position: relative;

	&:before {
		background-image: url(${({ $src }) => $src});
		background-size: cover;
		content: "";
		height: 100%;
		left: 0;
		opacity: 0.1;
		top: 0;
		transform: none;
		transition: 0.15s transform, 0.15s blur;
		filter: blur(1px);
		width: 100%;
	}

	&:hover:before {
		transform: scale(1.1);
		filter: blur(3px);
	}

	& > span {
		position: relative;
		z-index: 1;
	}

`

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
					{metrics.map(({ id, name, imageUrl }) => (
						<Grid.Col span={{ base: 6, md: 4 }} key={id}>
							<div style={{ containerType: 'inline-size' }}>
								<BackgroundButton
									$src={imageUrl}
									component={Link}
									to={id}
									display="block"
									h="100cqw"
									lh="3rem"
									px="md"
									td="none"
									w="100%"
								>
									{name}
								</BackgroundButton>
							</div>
						</Grid.Col>
					))}
				</Grid>
			)}
		</Stack>
	)
}

export { MetricsPage }
