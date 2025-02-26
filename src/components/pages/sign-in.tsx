import { IconActivityHeartbeat, IconHeartbeat } from '@tabler/icons-react'
import { useAuth } from '../../context/auth'
import { SignInButton } from '../sign-in-button'
import { Avatar, Divider, Stack, Text, Title } from '@mantine/core'

const SignInPage = () => {
	const { logIn } = useAuth()
	return (
		<Stack align="center" py="xl" h="100vh" justify="center">
			<Avatar color="cyan" variant="gradient" size={120}>
				<IconActivityHeartbeat
					size="18em"
					strokeWidth={1.6}
					style={{ stroke: 'var(--mantine-color-body)' }}
				/>
			</Avatar>
			<Title fw="light">Pulse</Title>
			<Divider w={50} mb="xl" mt="sm" />
			<Text c="dimmed">Log in to get started</Text>
			<SignInButton onSuccess={logIn} />
		</Stack>
	)
}

export { SignInPage }
