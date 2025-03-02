import { IconActivityHeartbeat, IconHeartbeat } from '@tabler/icons-react'
import { useAuth } from '../../context/auth'
import { SignInButton } from '../sign-in-button'
import {
	Anchor,
	Avatar,
	Divider,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core'
import styled, { keyframes } from 'styled-components'

const heartbeat = keyframes`
	0% {
		transform: scale(0.97);
	}

	5% {
		transform: scale(1);
	}

	33% {
		transform: scale(0.97);
	}

	38% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.97);
	}
`

const IconAvatar = styled(Avatar)`
	animation: ${heartbeat} 2s ease-out infinite;
`

const SignInPage = () => {
	const { logIn } = useAuth()

	const clear = () => {
		window.indexedDB.databases().then((databases) => {
			for (const database of databases)
				window.indexedDB.deleteDatabase(database.name)
		})
	}
	return (
		<Stack align="center" py="xl" h="100vh" justify="center">
			<IconAvatar color="cyan" variant="gradient" size={150}>
				<IconActivityHeartbeat
					size="18em"
					strokeWidth={1.6}
					style={{ stroke: 'var(--mantine-color-body)' }}
				/>
			</IconAvatar>
			<Title fw="light">Pulse</Title>
			<Divider w={50} mb="sm" mt="5vh" />
			<Group>
				<Text c="dimmed">Sign in</Text>
				<SignInButton onSuccess={logIn} />
			</Group>
			<Anchor onClick={clear}>Clear data</Anchor>
		</Stack>
	)
}

export { SignInPage }
