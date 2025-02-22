import { createContext, useContext, useEffect, useState } from 'react'
import { z } from 'zod'

interface Api {
	user: User | null
	logIn(user: User): void
	logOut(): void
}

const Context = createContext<Api | undefined>(undefined)

const userSchema = z.object({
	email: z.string(),
	familyName: z.string(),
	givenName: z.string(),
	picture: z.string(),
})

type User = z.infer<typeof userSchema>

const getUser = () => {
	try {
		const storedUser = window.localStorage.getItem('login')
		if (!storedUser) return null
		return userSchema.parse(JSON.parse(storedUser))
	} catch {
		return null
	}
}

interface Props {
	children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(getUser)

	const logIn = (user: User) => {
		window.localStorage.setItem('login', JSON.stringify(user))
		setUser(user)
	}

	const logOut = () => {
		window.localStorage.removeItem('login')
		setUser(null)
	}

	const api = {
		user,
		logIn,
		logOut,
	}

	return <Context.Provider value={api}>{children}</Context.Provider>
}

const useAuth = () => {
	const auth = useContext(Context)
	if (!auth) throw new Error('Auth context not available')
	return auth
}

export { useAuth, AuthProvider }
export type { User }
