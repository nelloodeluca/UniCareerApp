import { dbPromise } from '../databaseSetup';
import { Esame, Categoria } from '../../types';

// Funzione per ottenere tutti gli esami con voto
export const getEsamiConVoto = async (): Promise<Esame[]> => {
  try {
    const db = await dbPromise;
    const results = await db.executeSql(
      `SELECT e.*, 
              group_concat(c.id || ',' || c.nome || ',' || c.colore) as categorie
       FROM esame e
       LEFT JOIN esame_categoria ec ON e.id = ec.id_e
       LEFT JOIN categoria c ON ec.id_c = c.id
       WHERE e.voto IS NOT NULL
       GROUP BY e.id`
    );

    const esami = results[0].rows.raw().map((row: any) => {
      const categorie = row.categorie
        ? row.categorie.split(',').map((catStr: string) => {
          const [id, nome, colore] = catStr.split(',');
          return { id, nome, colore };
        })
        : [];
      return {
        id: row.id.toString(),
        nome: row.nome,
        corsoDiStudi: row.corso_di_studi,
        CFU: row.cfu,
        data: row.data,
        ora: row.ora,
        luogo: row.luogo,
        tipologia: row.tipologia,
        docente: row.docente,
        voto: row.voto ? row.voto.toString() : null,
        categorie,
      };
    });

    return esami;
  } catch (error) {
    console.error('Failed to fetch esami from database:', error);
    throw error;
  }
};