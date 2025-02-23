import { createTheme, MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router'
import { DbProvider } from '../context/db'
import { AuthProvider } from '../context/auth'
import { AppRoutes } from './app-routes'
import { useColorScheme } from '@mantine/hooks'
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'

const ROLLBAR_CONFIG = {
	accessToken: 'a8cd6f4bb17d45e3aa57a6ab4aeffd9d',
	environment: 'development',
}

const theme = createTheme({
	fontFamily: 'Funnel Display, sans-serif',
	primaryColor: 'violet',
})

const App = () => {
	const preferredColorScheme = useColorScheme()
	return (
		<RollbarProvider config={ROLLBAR_CONFIG}>
			<ErrorBoundary>
				<MantineProvider theme={theme} forceColorScheme={preferredColorScheme}>
					<BrowserRouter>
						<AuthProvider>
							<DbProvider>
								<AppRoutes />
							</DbProvider>
						</AuthProvider>
					</BrowserRouter>
				</MantineProvider>
			</ErrorBoundary>
		</RollbarProvider>
	)
}

export { App }
