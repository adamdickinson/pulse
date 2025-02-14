import { addRxPlugin, createRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { metricSchema } from '../schemas/metric'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv'
import { logEntrySchema } from '../schemas/log-entry'

const setupDatabase = async () => {
	addRxPlugin(RxDBDevModePlugin)

	const db = await createRxDatabase({
		name: 'pulse',
		storage: wrappedValidateAjvStorage({ storage: getRxStorageDexie() }),
		eventReduce: true,
	})

	await db.addCollections({
		metrics: { schema: metricSchema },
		logEntries: { schema: logEntrySchema },
	})

	return db
}

export { setupDatabase }
