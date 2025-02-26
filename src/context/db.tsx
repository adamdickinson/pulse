import { createContext, useContext, useEffect, useState } from 'react'
import type { RxDatabase } from 'rxdb'
import { replicateFirestore } from 'rxdb/plugins/replication-firestore'
import { setupDatabase } from '../helpers/db'
import { setupFirestore } from '../helpers/use-firestore-replication'

interface Props {
	children: React.ReactNode
}

const Context = createContext<RxDatabase | undefined>(undefined)

const DbProvider = ({ children }: Props) => {
	const [db, setDb] = useState<RxDatabase | undefined>(undefined)

	useEffect(() => {
		setupDatabase().then((db) => {
			setDb(db)

		})
	}, [])

	if (db) return <Context.Provider value={db}>{children}</Context.Provider>
	return null
}

const useDb = () => {
	const db = useContext(Context)
	if (!db) throw new Error('Db context not available')
	return db
}

export { useDb, DbProvider }
