import { Categoria, Esame } from '../../types';
import { mapRowToCategoria, mapRowToEsame } from './parseEsami';
import { dbPromise } from '../../databaseSetup';

// Funzione per ottenere tutti gli esami con categorie annesse
export const getEsami = async (): Promise<Esame[]> => {
  try {
    const db = await dbPromise;
    const results = await db.executeSql(
      `SELECT e.*, 
                      group_concat(c.id || '|' || c.nome || '|' || c.colore, ';') as categorie
                 FROM esame e
                 LEFT JOIN esame_categoria ec ON e.id = ec.id_e
                 LEFT JOIN categoria c ON ec.id_c = c.id
                 GROUP BY e.id`
    );

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

export const updateInsert = async (esame: Esame): Promise<void> => {
  try {
    const db = await dbPromise;
    let temp;
    if(esame.voto === 0) {
      temp = null;
    } else {
      temp = esame.voto;
    }
    if (esame.id !== '') {

      // Update the existing record

      await db.executeSql(
        `
        UPDATE esame
        SET nome = ?, corso_di_studi = ?, docente = ?, luogo = ?, tipologia = ?, cfu = ?, data = ?, ora = ?, voto = ?, lode = ?, diario = ?
        WHERE id = ?
      `,
        [
          esame.nome,
          esame.corsoDiStudi,
          esame.docente,
          esame.luogo,
          esame.tipologia,
          esame.CFU,
          esame.data,
          esame.ora,
          temp,
          esame.lode,
          esame.diario,
          esame.id,
        ]
      );
    } else {
      // Insert a new record
      await db.executeSql(
        `
        INSERT INTO esame (nome, corso_di_studi, docente, luogo, tipologia, cfu, data, ora, voto, lode, diario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
        [
          esame.nome,
          esame.corsoDiStudi,
          esame.docente,
          esame.luogo,
          esame.tipologia,
          esame.CFU,
          esame.data,
          esame.ora,
          temp,
          esame.lode,
          esame.diario,
        ]
      );
    }
  } catch (error) {
    console.error('Failed to insert or replace esame in database:', error);
    throw error;
  }
};
