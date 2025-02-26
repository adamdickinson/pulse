import * as firebase from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { useDb } from '../context/db'
import { useAuth, type User } from '../context/auth'
import { replicateFirestore } from 'rxdb/plugins/replication-firestore'
import { useEffect } from 'react'

const useFirestoreReplication = (user: User | null) => {
	const db = useDb()

	useEffect(() => {
		if (!user || !db) return

		const firestoreProjectId = process.env.FIREBASE_PROJECT_ID

		const app = firebase.initializeApp({
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.FIREBASE_APP_ID,
		})

		const firestoreDatabase = getFirestore(app)
		const firestoreCollection = collection(
			firestoreDatabase,
			`accounts-${user.email}`,
		)

		const replicationStates = Object.values(db.collections).map((collection) =>
			replicateFirestore({
				replicationIdentifier: `https://firestore.googleapis.com/${firestoreProjectId}`,
				collection,
				firestore: {
					projectId: firestoreProjectId,
					database: firestoreDatabase,
					collection: firestoreCollection,
				},
				pull: {},
				push: {},
				live: true,
			}),
		)

		return () => {
			for (const state of replicationStates) {
				state.cancel().then(() => console.log(state))
			}
		}
	}, [user, db])
}

export { useFirestoreReplication }
