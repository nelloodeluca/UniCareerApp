import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import EsameCard from '../../components/EsameCard';
import DettagliEsame from './DettagliEsame';
import { Esame } from '../../types';

const esamiDati: Esame[] = [
  {
    id: '1',
    nome: 'Analisi Matematica I',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 9,
    data: '2023-01-15',
    ora: '09:00',
    luogo: 'Aula Magna',
    tipologia: 'Scritto',
    docente: 'Prof. Rossi',
    voto: '30L',
    categorie: [
      { id: '1', nome: 'Matematica', colore: '#ff9999' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
    ],
  },
  {
    id: '2',
    nome: 'Fisica I',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 6,
    data: '2023-02-20',
    ora: '14:00',
    luogo: 'Aula 101',
    tipologia: 'Orale',
    docente: 'Prof.ssa Bianchi',
    voto: '28',
    categorie: [
      { id: '3', nome: 'Fisica', colore: '#9999ff' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
    ],
  },
  {
    id: '3',
    nome: 'Programmazione I',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 12,
    data: '2023-03-10',
    ora: '10:00',
    luogo: 'Laboratorio 3',
    tipologia: 'Scritto',
    docente: 'Prof. Verdi',
    voto: '30',
    categorie: [
      { id: '4', nome: 'Informatica', colore: '#ffcc99' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
      { id: '4', nome: 'Informatica', colore: '#ffcc99' },
    ],
  },
  {
    id: '4',
    nome: 'Chimica',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 6,
    data: '2023-04-05',
    ora: '11:00',
    luogo: 'Aula 202',
    tipologia: 'Orale',
    docente: 'Prof. Neri',
    voto: '27',
    categorie: [
      { id: '5', nome: 'Chimica', colore: '#cc99ff' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
    ],
  },
  {
    id: '5',
    nome: 'Algebra Lineare',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 9,
    data: '2023-05-15',
    ora: '08:00',
    luogo: 'Aula 303',
    tipologia: 'Scritto',
    docente: 'Prof.ssa Gialli',
    voto: '29',
    categorie: [
      { id: '1', nome: 'Matematica', colore: '#ff9999' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
      { id: '3', nome: 'ABC', colore: '#911717' },
    ],
  },
  {
    id: '6',
    nome: 'Algebra Lineare',
    corsoDiStudi: 'Ingegneria Informatica',
    CFU: 9,
    data: '2023-05-15',
    ora: '08:00',
    luogo: 'Aula 303',
    tipologia: 'Scritto',
    docente: 'Prof.ssa Gialli',
    voto: '29',
    categorie: [
      { id: '1', nome: 'Matematica', colore: '#ff9999' },
      { id: '2', nome: 'Fondamentali', colore: '#99ff99' },
    ],
  },
];

const Libretto_EsamiDati: React.FC = () => {
  const [selectedEsame, setSelectedEsame] = useState<Esame | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (esame: Esame) => {
    setSelectedEsame(esame);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEsame(null);
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={esamiDati}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <EsameCard esame={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <DettagliEsame
        visible={modalVisible}
        onClose={closeModal}
        esame={selectedEsame}
      />
    </View>
  );
};

export default Libretto_EsamiDati;
