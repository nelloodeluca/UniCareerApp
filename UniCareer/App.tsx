import * as React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import SQLite from "react-native-sqlite-storage";
import AppNav from "./components/nav/AppNav";
import { aggiungiEsame, readUser } from "./database";

SQLite.enablePromise(true);
const dbPromise = SQLite.openDatabase({
  name: "gruppo13.db",
  location: "default",
});
export default function App() {
  React.useEffect(() => {
    async function prepareDB() {
      const db = await dbPromise;
      /*await db.executeSql('DROP TABLE IF EXISTS esame_categoria;');
            await db.executeSql('DROP TABLE IF EXISTS categoria;');
            await db.executeSql('DROP TABLE IF EXISTS esame;'); Servono per droppare le colonne*/
      await db.executeSql(
        "CREATE TABLE IF NOT EXISTS esame (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,nome VARCHAR(50) NOT NULL UNIQUE,corso_di_studi VARCHAR(50) NOT NULL ,docente VARCHAR(50),luogo VARCHAR(50),tipologia VARCHAR(50),cfu INTEGER NOT NULL,data DATE NOT NULL,ora TIMESTAMP,voto INTEGER,lode BOOLEAN, diario VARCHAR(1500));"
      );
      await db.executeSql(
        "CREATE TABLE IF NOT EXISTS categoria (nome VARCHAR(50) PRIMARY KEY NOT NULL);"
      );
      await db.executeSql(
        "CREATE TABLE IF NOT EXISTS esame_categoria (id INTEGER NOT NULL,nome VARCHAR(50) NOT NULL, PRIMARY KEY (id,nome), FOREIGN KEY (id) REFERENCES esame(id), FOREIGN KEY (nome) REFERENCES categoria(nome));"
      );
    }
    prepareDB();
  }, []);
  return (
    <NavigationContainer>
      <AppNav></AppNav>
    </NavigationContainer>
  );
}
