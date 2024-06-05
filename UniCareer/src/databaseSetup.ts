import SQLite from 'react-native-sqlite-storage';
import { addColor, getRandomColor } from './utils/getColor';

SQLite.enablePromise(true);

export const dbPromise = SQLite.openDatabase({
  name: 'gruppo13.db',
  location: 'default',
});

export const prepareDB = async () => {
  const db = await dbPromise;

  /* Decommentare questa sezione in caso si vogliono droppare le tabelle
  const dropTables = async () => {
    await db.executeSql('DROP TABLE IF EXISTS esame_categoria;');
    await db.executeSql('DROP TABLE IF EXISTS categoria;');
    await db.executeSql('DROP TABLE IF EXISTS esame;');
  };

  await dropTables();*/

  const createTables = async () => {
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS esame (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(50) NOT NULL UNIQUE,
        corso_di_studi VARCHAR(50) NOT NULL,
        docente VARCHAR(50),
        luogo VARCHAR(50),
        tipologia VARCHAR(50),
        cfu INTEGER NOT NULL,
        data DATE NOT NULL,
        ora TIMESTAMP,
        voto INTEGER,
        lode BOOLEAN,
        diario VARCHAR(1500)
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS categoria (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome VARCHAR(50) NOT NULL UNIQUE,
        colore VARCHAR(7) NOT NULL
      );
    `);

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS esame_categoria (
        id_e INTEGER NOT NULL,
        id_c INTEGER NOT NULL,
        PRIMARY KEY (id_e, id_c),
        FOREIGN KEY (id_e) REFERENCES esame(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (id_c) REFERENCES categoria(id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  };

  await createTables();

/* Decommentare questa sezione in caso si voglia popolare il database


  const populateTables = async () => {
    // Popolare la tabella 'categoria' con colori dalla palette
    const categories = [
      'Matematica',
      'Fondamentali',
      'Fisica',
      'Informatica',
      'Chimica',
    ];

    for (const category of categories) {
      const color = getRandomColor();
      await db.executeSql(`
        INSERT OR IGNORE INTO categoria (nome, colore) VALUES 
        ('${category}', '${color}');
      `);
      addColor(color);
    }

    // Popolare la tabella 'esame' con date future e voti corretti
    await db.executeSql(`
      INSERT OR IGNORE INTO esame (nome, corso_di_studi, docente, luogo, tipologia, cfu, data, ora, voto, lode, diario) VALUES 
        ('Analisi Matematica I', 'Ingegneria Informatica', 'Prof. Rossi', 'Aula Magna', 'Scritto', 9, '2024-01-15', '09:00', 30, 1, ''),
        ('Fisica I', 'Ingegneria Informatica', 'Prof.ssa Bianchi', 'Aula 101', 'Orale', 6, '2025-02-20', '14:00', 28, 0, ''),
        ('Programmazione I', 'Ingegneria Informatica', 'Prof. Verdi', 'Laboratorio 3', 'Scritto', 12, '2025-03-10', '10:00', 30, 0, ''),
        ('Chimica', 'Ingegneria Informatica', 'Prof. Neri', 'Aula 202', 'Orale', 6, '2025-04-05', '11:00', 27, 0, ''),
        ('Algebra Lineare', 'Ingegneria Informatica', 'Prof.ssa Gialli', 'Aula 303', 'Scritto', 9, '2025-05-15', '08:00', 29, 0, ''),
        ('Statistica', 'Ingegneria Informatica', 'Prof. Viola', 'Aula 401', 'Scritto', 6, '2025-06-10', '10:00', 30, 1, ''),
        ('Economia', 'Ingegneria Gestionale', 'Prof. Rosa', 'Aula 102', 'Orale', 9, '2025-07-12', '11:00', 27, 0, ''),
        ('Inglese Tecnico', 'Ingegneria Informatica', 'Prof. Marrone', 'Aula 205', 'Scritto', 3, '2023-08-20', '09:00', null, 0, ''),
        ('Calcolo Numerico', 'Ingegneria Informatica', 'Prof. Verde', 'Laboratorio 2', 'Scritto', 6, '2025-09-05', '15:00', 28, 0, ''),
        ('Sistemi Operativi', 'Ingegneria Informatica', 'Prof. Nero', 'Aula 501', 'Scritto', 12, '2025-10-15', '13:00', 29, 0, ''),
        ('Reti di Calcolatori', 'Ingegneria Informatica', 'Prof. Blu', 'Aula 602', 'Scritto', 6, '2024-06-15', '10:00', null, 0, ''),
        ('Algoritmi', 'Ingegneria Informatica', 'Prof.ssa Viola', 'Aula 702', 'Orale', 6, '2024-07-10', '11:00', null, 0, ''),
        ('Basi di Dati', 'Ingegneria Informatica', 'Prof. Bianco', 'Laboratorio 1', 'Scritto', 9, '2024-08-25', '09:00', null, 0, ''),
        ('Sicurezza Informatica', 'Ingegneria Informatica', 'Prof. Grigio', 'Aula 802', 'Orale', 6, '2024-09-15', '14:00', null, 0, '');
    `);

    // Popolare la tabella 'esame_categoria'
    await db.executeSql(`
      INSERT OR IGNORE INTO esame_categoria (id_e, id_c) VALUES 
        ((SELECT id FROM esame WHERE nome='Analisi Matematica I'), (SELECT id FROM categoria WHERE nome='Matematica')),
        ((SELECT id FROM esame WHERE nome='Analisi Matematica I'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Fisica I'), (SELECT id FROM categoria WHERE nome='Fisica')),
        ((SELECT id FROM esame WHERE nome='Fisica I'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Programmazione I'), (SELECT id FROM categoria WHERE nome='Informatica')),
        ((SELECT id FROM esame WHERE nome='Programmazione I'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Chimica'), (SELECT id FROM categoria WHERE nome='Chimica')),
        ((SELECT id FROM esame WHERE nome='Chimica'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Algebra Lineare'), (SELECT id FROM categoria WHERE nome='Matematica')),
        ((SELECT id FROM esame WHERE nome='Algebra Lineare'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Statistica'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Economia'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Inglese Tecnico'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Calcolo Numerico'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Sistemi Operativi'), (SELECT id FROM categoria WHERE nome='Fondamentali')),
        ((SELECT id FROM esame WHERE nome='Reti di Calcolatori'), (SELECT id FROM categoria WHERE nome='Informatica')),
        ((SELECT id FROM esame WHERE nome='Algoritmi'), (SELECT id FROM categoria WHERE nome='Informatica')),
        ((SELECT id FROM esame WHERE nome='Sicurezza Informatica'), (SELECT id FROM categoria WHERE nome='Informatica'));
    `);
  };


  await populateTables();

 */
};
