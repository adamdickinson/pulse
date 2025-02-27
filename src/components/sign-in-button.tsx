import * as z from 'zod'
import { useAuth, type User } from '../context/auth'

const decodeJwtResponse = (token: string) => {
	const base64Url = token.split('.')[1]
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
			.join(''),
	)

	return JSON.parse(jsonPayload)
}

const jwtSchema = z
	.object({
		email: z.string(),
		family_name: z.string(),
		given_name: z.string(),
		picture: z.string(),
	})
	.transform(
		({ email, family_name: familyName, given_name: givenName, picture }) => ({
			email,
			familyName,
			givenName,
			picture,
		}),
	)

interface Props {
	onSuccess(user: User): void
}

const SignInButton = ({ onSuccess }: Props) => {
	const loadSigninButton = (element: HTMLDivElement) => {
		const initialise = () => {
			google.accounts.id.initialize({
				auto_select: true,
				client_id: process.env.GOOGLE_ACCOUNTS_CLIENT_ID,
				callback: ({ credential }) => {
					const jwt = decodeJwtResponse(credential)
					const { email, familyName, givenName, picture } = jwtSchema.parse(jwt)
					onSuccess({ email, familyName, givenName, picture })
				},
			})
			google.accounts.id.renderButton(element, { type: 'standard' })
		}

		if (!('google' in window)) window.onload = () => initialise()
		else initialise()
	}

	return <div ref={loadSigninButton} style={{ colorScheme: 'light' }} />
}

export { SignInButton }
