import {
	AppShell,
	Flex,
	Text,
	Title,
	Group,
	ActionIcon,
	Button,
	Center,
} from '@mantine/core'
import {
	IconHeartbeat,
	IconHeartPlus,
	IconPencilPlus,
} from '@tabler/icons-react'
import { Link } from 'react-router'

const HomePage = () => (
	<>
		<Text size="xl">Welcome back, Adam!</Text>
		<Text>Here are your upcoming log reminders:</Text>
	</>
)

export { HomePage }
