import { openDB, type IDBPDatabase } from 'idb';
import type {
  Patient,
  LabTestDefinition,
  TestOrder,
  Sample,
  InventoryItem,
  BillingEntry,
  ScheduleEntry,
} from '../domain/types';

type DbSchema = {
  patients: Patient;
  testDefinitions: LabTestDefinition;
  testOrders: TestOrder;
  samples: Sample;
  inventory: InventoryItem;
  billing: BillingEntry;
  schedule: ScheduleEntry;
};

let dbPromise: Promise<IDBPDatabase<DbSchema>> | null = null;

export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<DbSchema>('medlabpro-db', 1, {
      upgrade(db) {
        db.createObjectStore('patients', { keyPath: 'id' });
        db.createObjectStore('testDefinitions', { keyPath: 'id' });
        db.createObjectStore('testOrders', { keyPath: 'id' });
        db.createObjectStore('samples', { keyPath: 'id' });
        db.createObjectStore('inventory', { keyPath: 'id' });
        db.createObjectStore('billing', { keyPath: 'id' });
        db.createObjectStore('schedule', { keyPath: 'id' });
      },
    });
  }
  return dbPromise;
}

export async function getAll<TStore extends keyof DbSchema>(
  store: TStore,
): Promise<DbSchema[TStore][]> {
  const db = await getDb();
  return db.getAll(store);
}

export async function putItem<TStore extends keyof DbSchema>(
  store: TStore,
  value: DbSchema[TStore],
) {
  const db = await getDb();
  await db.put(store, value);
}

export async function deleteItem<TStore extends keyof DbSchema>(
  store: TStore,
  key: string,
) {
  const db = await getDb();
  await db.delete(store, key);
}

