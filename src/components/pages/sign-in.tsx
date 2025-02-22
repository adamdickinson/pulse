import { useAuth } from '../../context/auth'
import { SignInButton } from '../sign-in-button'
import { Stack, Text } from '@mantine/core'

const SignInPage = () => {
	const { logIn } = useAuth()
	return (
		<Stack>
			<Text>Log in to get started</Text>
			<SignInButton onSuccess={logIn} />
		</Stack>
	)
}

export { SignInPage }
