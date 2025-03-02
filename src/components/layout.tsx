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
							<Text variant="gradient">
								<IconActivityHeartbeat
									size="48"
									strokeWidth={1.5}
									style={{ stroke: 'url(#gradient1)' }}
								>
									<defs>
										<linearGradient
											id="gradient1"
											gradientUnits="userSpaceOnUse"
											x1="0"
											x2="24"
											y1="24"
											y2="0"
										>
											<stop
												offset="0%"
												stopColor="var(--mantine-color-pink-4)"
											/>
											<stop
												offset="100%"
												stopColor="var(--mantine-color-violet-5)"
											/>
										</linearGradient>
									</defs>
								</IconActivityHeartbeat>
							</Text>
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
			<AppShell.Main display="flex">
				<Container size="xs" py="md" flex="1 1 0">
					<Outlet />
				</Container>
			</AppShell.Main>
		</AppShell>
	)
}

export { Layout }
