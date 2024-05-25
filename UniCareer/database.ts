// Database.ts
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

export const aggiungiEsame = async (
  dbPromise: Promise<SQLiteDatabase>,
  nome: string,
  corso_di_studi: string,
  docente: string,
  luogo: string,
  tipologia: string,
  cfu: number,
  data: string,
  ora: string,
  voto: number,
  lode: boolean,
  diario: string
) => {
  try {
    const db = await dbPromise;
    const matricola = 0;
    await db.executeSql(
      `
    INSERT OR REPLACE INTO esame (id, nome, corso_di_studi, docente, luogo, tipologia, cfu, data, ora, voto, lode, diario)
    VALUES (
      COALESCE((SELECT id FROM esame WHERE nome = ?), NULL), 
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    );
  `,
      [
        nome,
        corso_di_studi,
        docente,
        luogo,
        tipologia,
        cfu,
        data,
        ora,
        voto,
        lode,
        diario,
      ]
    );
  } catch (error) {
    console.log(error);
  }
};

export const readUser = async (dbPromise: Promise<SQLite.SQLiteDatabase>) => {
  try {
    const db = await dbPromise;
    const results = await db.executeSql('SELECT * FROM esame ');
    console.log(results[0].rows.raw());
  } catch (error) {
    console.log(error);
  }
};
