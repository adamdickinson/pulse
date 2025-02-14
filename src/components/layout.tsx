import {
	AppShell,
	Box,
	Button,
	Container,
	Flex,
	Group,
	Text,
} from '@mantine/core'
import { IconActivityHeartbeat } from '@tabler/icons-react'
import { Link, Outlet, useMatch, useMatches } from 'react-router'

const Layout = () => {
	const isOnLogsPage = useMatch('/logs')
	const isOnMetricsPage = useMatch('/metrics')

	return (
		<AppShell padding="md" header={{ height: 60 }}>
			<AppShell.Header>
				<Container h="100%" size="xs">
					<Flex justify="space-between" align="center" h="100%">
						<Group
							component={Link}
							gap="sm"
							to="/"
							td="none"
							style={{ color: 'inherit' }}
						>
							<IconActivityHeartbeat
								size="48"
								color="var(--mantine-color-violet-5)"
							/>
							<Text visibleFrom="sm" fw="bold" size="lg">
								Pulse
							</Text>
						</Group>
						<Flex gap="xs">
							<Button
								component={Link}
								variant={isOnLogsPage ? 'filled' : 'light'}
								to="/logs"
							>
								Logs
							</Button>
							<Button
								component={Link}
								variant={isOnMetricsPage ? 'filled' : 'light'}
								to="/metrics"
							>
								Metrics
							</Button>
						</Flex>
					</Flex>
				</Container>
			</AppShell.Header>
			<AppShell.Main>
				<Container size="xs" pt="lg">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	)
}

export { Layout }
