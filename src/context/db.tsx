import { createContext, useContext, useEffect, useState } from 'react'
import type { RxDatabase } from 'rxdb'
import { setupDatabase } from '../helpers/db'

interface Props {
	children: React.ReactNode
}

const Context = createContext<RxDatabase | undefined>(undefined)

const DbProvider = ({ children }: Props) => {
	const [db, setDb] = useState<RxDatabase | undefined>(undefined)

	useEffect(() => {
		setupDatabase().then(setDb)
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
