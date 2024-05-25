import { dbPromise } from '../databaseSetup';
import { Esame } from '../../types';
import { mapRowToEsame } from './parseEsami';

// Funzione per ottenere tutti gli esami senza voto
export const getEsamiSenzaVoto = async (): Promise<Esame[]> => {
  try {
    const db = await dbPromise;
    const results = await db.executeSql(
      `SELECT e.*, 
              group_concat(c.id || ',' || c.nome || ',' || c.colore) as categorie
       FROM esame e
       LEFT JOIN esame_categoria ec ON e.id = ec.id_e
       LEFT JOIN categoria c ON ec.id_c = c.id
       WHERE e.voto IS NULL
       GROUP BY e.id`
    );

    return results[0].rows.raw().map(mapRowToEsame);
  } catch (error) {
    console.error('Failed to fetch esami from database:', error);
    throw error;
  }
};