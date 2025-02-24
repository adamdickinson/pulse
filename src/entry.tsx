import { createRoot } from 'react-dom/client'
import { App } from './components/app'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import './styles/main.css'

const registerServiceWorker = async () => {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.register(
				'/service-worker.js',
				{ scope: '/' },
			)
			if (registration.installing) {
				console.log('Service worker installing')
			} else if (registration.waiting) {
				console.log('Service worker installed')
			} else if (registration.active) {
				console.log('Service worker active')
			}
		} catch (error) {
			console.error(`Registration failed with ${error}`)
		}
	}
}

registerServiceWorker()

Notification.requestPermission().then(async (result) => {
	if (result === 'granted') {
		navigator.serviceWorker.ready.then(async (registration) => {})
	}
})

const appElement = document.getElementById('app')
if (!appElement) throw new Error('Unable to start app')
const root = createRoot(appElement)
root.render(<App />)
