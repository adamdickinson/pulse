import React from 'react'
import { IconHeartbeat, IconPencil, IconPencilPlus } from '@tabler/icons-react'
import {
	ActionIcon,
	AppShell,
	Burger,
	Button,
	Center,
	Container,
	createTheme,
	Flex,
	Group,
	MantineProvider,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core'
import { Link, Route } from 'react-router'
import { BrowserRouter } from 'react-router'
import { Routes } from 'react-router'
import { HomePage } from './home'
import { MetricsPage } from './metrics'
import { Layout } from './layout'
import { CreateMetricsPage } from './create-metrics'
import { DbProvider } from '../context/db'
import { LogMetricPage } from './log-metric'

const theme = createTheme({
	fontFamily: 'Funnel Display, sans-serif',
	primaryColor: 'violet',
})

const App = () => (
	<DbProvider>
		<MantineProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="metrics">
							<Route index element={<MetricsPage />} />
							<Route path="create" element={<CreateMetricsPage />} />
							<Route path=":name" element={<LogMetricPage />} />
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	</DbProvider>
)

export { App }
