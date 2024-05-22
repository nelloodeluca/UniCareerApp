// Database.ts
import SQLite from 'react-native-sqlite-storage';

export  const aggiungiEsame = async (dbPromise:  Promise<SQLite.SQLiteDatabase>,nome: string,corso_di_studi: string,docente: string,luogo: string,tipologia: string,cfu: bigint,data: string,ora: string,voto: bigint,lode: boolean,diario: string) => {
    try {
        const db = await dbPromise;
        const matricola = 0;
        await db.executeSql("INSERT INTO esame (nome, corso_di_studi, docente, luogo, tipologia, cfu, data, ora, voto, lode,diario)VALUES (?,?,?,?,?,?,?,?,?,?);)",[nome,corso_di_studi,docente,luogo,tipologia,cfu,data,ora,voto,lode,diario]);
    } catch (error) {
        console.log(error);
    }
};

export const readUser = async (dbPromise:  Promise<SQLite.SQLiteDatabase>) => {
    try {
        const db = await dbPromise;
        var results = await db.executeSql('SELECT * FROM esame ');
        console.log(results[0].rows.raw());
    } catch (error) {
        console.log(error);
    }

};