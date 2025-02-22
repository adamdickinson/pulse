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
import { useAuth } from '../context/auth'

const Layout = () => {
	const isOnLogsPage = useMatch('/logs')
	const isOnMetricsPage = useMatch('/metrics')
	const { user } = useAuth()

	return (
		<AppShell padding="md" header={{ height: 60 }}>
			<AppShell.Header>
				<Container h="100%" size="xs">
					<Flex justify="space-between" align="center" h="100%">
						<Group
							component={Link}
							gap="sm"
							// @ts-expect-error -- bad types for Group
							to="/"
							td="none"
							style={{ color: 'inherit' }}
						>
							<IconActivityHeartbeat
								size="48"
								color="var(--mantine-color-violet-5)"
							/>
							<Text fw="bold" size="lg">
								Pulse
							</Text>
						</Group>
						{!!user && (
							<Flex>
								<Button
									component={Link}
									variant={isOnMetricsPage ? 'filled' : 'transparent'}
									to="/metrics"
								>
									Metrics
								</Button>
							</Flex>
						)}
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
