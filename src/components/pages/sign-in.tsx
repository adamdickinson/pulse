import { IconActivityHeartbeat, IconHeartbeat } from '@tabler/icons-react'
import { useAuth } from '../../context/auth'
import { SignInButton } from '../sign-in-button'
import { Avatar, Stack, Text, Title } from '@mantine/core'

const SignInPage = () => {
	const { logIn } = useAuth()
	return (
		<Stack align="center" py="xl">
			<Avatar color="cyan" variant="gradient" size={80}>
				<IconActivityHeartbeat
					size="15em"
					strokeWidth={1.8}
					style={{ stroke: 'var(--mantine-color-body)' }}
				/>
			</Avatar>
			<Title fw="light">Pulse</Title>
			<Text>Log in to get started</Text>
			<SignInButton onSuccess={logIn} />
		</Stack>
	)
}

export { SignInPage }
