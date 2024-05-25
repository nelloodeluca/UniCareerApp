import { dbPromise } from '../databaseSetup';
import { Esame } from '../../types';
import { mapRowToEsame } from './parseEsami';

// Funzione per ottenere tutti gli esami con voto
export const getEsami = async (): Promise<Esame[]> => {
  try {
    const db = await dbPromise;
    const results = await db.executeSql(`SELECT * from esame`);
    return results[0].rows.raw().map(mapRowToEsame);
  } catch (error) {
    console.error('Failed to fetch esami from database:', error);
    throw error;
  }
};

export const deleteEsami = async (id: string): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.executeSql('DELETE FROM esame WHERE id = ?', [Number(id)]);
  } catch (error) {
    console.error('Failed to fetch esami from database:', error);
    throw error;
  }
};
