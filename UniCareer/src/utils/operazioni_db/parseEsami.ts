import { ResultSet } from 'react-native-sqlite-storage';


// esameMapper.ts
import { Esame } from '../../types';

export const mapRowToEsame = (row: any): Esame => {
  const categorie = row.categorie
    ? row.categorie.split(',').map((catStr: string) => {
      const [id, nome, colore] = catStr.split(',');
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
    voto: row.voto ,
    categorie,
  };
};


