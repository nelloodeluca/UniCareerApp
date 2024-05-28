import { Categoria, Esame } from '../../types';

export const mapRowToEsame = (row: any): Esame => {
  const categorie = row.categorie
    ? row.categorie.split(';').map((catStr: string) => {
        const [id, nome, colore] = catStr.split('|');
        return { id, nome, colore };
      })
    : [];

  return {
    id: row.id,
    nome: row.nome,
    corsoDiStudi: row.corso_di_studi,
    CFU: row.cfu,
    data: row.data,
    ora: row.ora,
    luogo: row.luogo,
    tipologia: row.tipologia,
    docente: row.docente,
    voto: row.voto,
    lode: row.lode,
    categorie,
  };
};

export const mapRowToCategoria = (row: any): Categoria => {
  return {
    id: row.id.toString(),
    nome: row.nome,
    colore: row.colore,
  };
};