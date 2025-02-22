import { createTheme, MantineProvider } from '@mantine/core'
import { BrowserRouter } from 'react-router'
import { DbProvider } from '../context/db'
import { AuthProvider } from '../context/auth'
import { AppRoutes } from './app-routes'
import { useColorScheme } from '@mantine/hooks'

const theme = createTheme({
	fontFamily: 'Funnel Display, sans-serif',
	primaryColor: 'violet',
})

const App = () => {
	const preferredColorScheme = useColorScheme()
	return (
		<MantineProvider theme={theme} forceColorScheme={preferredColorScheme}>
			<BrowserRouter>
				<AuthProvider>
					<DbProvider>
						<AppRoutes />
					</DbProvider>
				</AuthProvider>
			</BrowserRouter>
		</MantineProvider>
	)
}

export { App }
