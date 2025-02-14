import { createRoot } from 'react-dom/client'
import { App } from './components/app'
import '@mantine/core/styles.css'
import './styles/main.css'

const root = createRoot(document.getElementById('app'))
root.render(<App />)
