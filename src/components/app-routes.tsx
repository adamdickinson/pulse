import { Route, Routes } from 'react-router'
import { useAuth } from '../context/auth'
import { AddMetricPage } from './pages/add-metric'
import { Layout } from './layout'
import { LogMetricPage } from './pages/log-metric'
import { MetricsPage } from './pages/metrics'
import { SignInPage } from './pages/sign-in'
import { HomePage } from './pages/home'
import { ViewMetricPage } from './pages/view-metric'
import { EditMetricPage } from './pages/edit-metric'

const AppRoutes = () => {
	const { user } = useAuth()
	console.log({ user })
	return (
		<>
			{!!user && (
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<HomePage />} />
						<Route path="metrics">
							<Route index element={<MetricsPage />} />
							<Route path="add" element={<AddMetricPage />} />
							<Route path=":id">
								<Route index element={<ViewMetricPage />} />
								<Route path="edit" element={<EditMetricPage />} />
								<Route path="log" element={<LogMetricPage />} />
							</Route>
						</Route>
					</Route>
				</Routes>
			)}
			{!user && (
				<Routes>
					<Route path="*" element={<SignInPage />} />
				</Routes>
			)}
		</>
	)
}

export { AppRoutes }
