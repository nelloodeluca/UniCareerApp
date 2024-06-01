import { dbPromise } from '../../databaseSetup';
import { Categoria } from '../../types';
import { mapRowToCategoria } from './parseEsami';

/**
 * Ottiene tutte le categorie dal database.
 * @returns {Promise<Categoria[]>} - Una promessa che viene risolta con un array di categorie.
 */
export const getCategorie = async (): Promise<Categoria[]> => {
  const db = await dbPromise;
  const result = await db.executeSql('SELECT * FROM categoria');
  return result[0].rows.raw().map(mapRowToCategoria);
};

/**
 * Inserisce una nuova categoria nel database.
 * @param {string} nome - Il nome della categoria.
 * @param {string} colore - Il colore della categoria.
 * @returns {Promise<void>} - Una promessa che viene risolta quando l'inserimento è completato.
 */
export const insertCategoria = async (
  nome: string,
  colore: string
): Promise<void> => {
  const db = await dbPromise;
  const query = 'INSERT INTO categoria (nome, colore) VALUES (?, ?)';
  await db.executeSql(query, [nome, colore]);
};

/**
 * Elimina una categoria dal database.
 * @param {string} id - L'ID della categoria da eliminare.
 * @returns {Promise<void>} - Una promessa che viene risolta quando l'eliminazione è completata.
 */
export const deleteCategoria = async (id: string): Promise<void> => {
  const db = await dbPromise;
  const query = 'DELETE FROM categoria WHERE id = ?';
  await db.executeSql(query, [Number(id)]);
};

/**
 * Modifica una categoria esistente nel database.
 * @param {string} id - L'ID della categoria da modificare.
 * @param {string} nome - Il nuovo nome della categoria.
 * @param {string} colore - Il nuovo colore della categoria.
 * @returns {Promise<void>} - Una promessa che viene risolta quando la modifica è completata.
 */
export const modifyCategoria = async (
  id: string,
  nome: string,
  colore: string
): Promise<void> => {
  const db = await dbPromise;
  const query = 'UPDATE categoria SET nome = ?, colore = ? WHERE id = ?';
  await db.executeSql(query, [nome, colore, Number(id)]);
};

export const insert_Esame_Categorie = async (id: string, categoria_id: string) => {
  const db = await dbPromise;
  await db.executeSql(`INSERT INTO esame_categoria (id_e,id_c) VALUES (?,?)`, [Number(id),Number(categoria_id)]);

}


export const deleteAll_Esami_Categoria = async (id: string) => {
  const db = await dbPromise;
  const query = 'DELETE FROM esame_categoria WHERE id_e = ?';
  await db.executeSql(query, [Number(id)]);
}
