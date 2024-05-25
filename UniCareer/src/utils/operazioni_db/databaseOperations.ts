import SQLite from 'react-native-sqlite-storage';
import { dbPromise } from '../databaseSetup';



// Funzione per eliminare un esame
export const deleteEsameById = async (id: string): Promise<void> => {
  try {
    const db = await dbPromise;
    await db.executeSql(`DELETE FROM esame WHERE id = ?`, [id]);
  } catch (error) {
    console.error('Failed to delete the esame:', error);
    throw error;
  }
};
