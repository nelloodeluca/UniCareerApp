import { dbPromise } from '../../databaseSetup';
import { Categoria } from '../../types';
import { mapRowToCategoria } from './parseEsami';


export const getCategorie = async (): Promise<Categoria[]> => {
  const db = await dbPromise;
  const result = await db.executeSql('SELECT * FROM categoria');
  return result[0].rows.raw().map(mapRowToCategoria);
};


export const insertCategoria = async (
  nome: string,
  colore: string
): Promise<void> => {
  const db = await dbPromise;
  const query = 'INSERT INTO categoria (nome, colore) VALUES (?, ?)';
  await db.executeSql(query, [nome, colore]);
};


export const deleteCategoria = async (id: string): Promise<void> => {
  const db = await dbPromise;
  const query = 'DELETE FROM categoria WHERE id = ?';
  await db.executeSql(query, [Number(id)]);
};


export const modifyCategoria = async (
  id: string,
  nome: string,
  colore: string
): Promise<void> => {
  const db = await dbPromise;
  const query = 'UPDATE categoria SET nome = ?, colore = ? WHERE id = ?';
  await db.executeSql(query, [nome, colore, Number(id)]);
};


export const insert_Esame_Categorie = async (
  id: string,
  categoria_id: string
) => {
  const db = await dbPromise;
  await db.executeSql(`INSERT INTO esame_categoria (id_e,id_c) VALUES (?,?)`, [
    Number(id),
    Number(categoria_id),
  ]);
};


export const deleteAll_Esami_Categoria = async (id: string) => {
  const db = await dbPromise;
  const query = 'DELETE FROM esame_categoria WHERE id_e = ?';
  await db.executeSql(query, [Number(id)]);
};
