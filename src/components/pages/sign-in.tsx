import { useAuth } from '../../context/auth'
import { SignInButton } from '../sign-in-button'

const SignInPage = () => {
	const { logIn } = useAuth()
	return (
		<>
			<SignInButton onSuccess={logIn} />
		</>
	)
}

export { SignInPage }
