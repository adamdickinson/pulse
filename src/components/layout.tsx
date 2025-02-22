import {
	AppShell,
	Avatar,
	Box,
	Button,
	Container,
	Flex,
	Group,
	Menu,
	Text,
} from '@mantine/core'
import { IconActivityHeartbeat, IconLogout } from '@tabler/icons-react'
import { Link, Outlet, useMatch, useMatches } from 'react-router'
import { useAuth } from '../context/auth'

const Layout = () => {
	const isOnLogsPage = useMatch('/logs')
	const isOnMetricsPage = useMatch('/metrics')
	const { user, logOut } = useAuth()

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
							<Group>
								<Button
									component={Link}
									variant={isOnMetricsPage ? 'filled' : 'transparent'}
									to="/metrics"
								>
									Metrics
								</Button>
								<Menu>
									<Menu.Target>
										<Avatar
											src={user.picture}
											alt={`${user.givenName} ${user.familyName}`}
											name={`${user.givenName} ${user.familyName}`}
											color="initials"
										/>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Item
											leftSection={<IconLogout size={14} />}
											onClick={logOut}
										>
											Sign out
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
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
