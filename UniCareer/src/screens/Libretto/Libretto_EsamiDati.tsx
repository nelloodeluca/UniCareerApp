import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EsameCard from '../../components/EsameCard';
import DettagliEsame from './DettagliEsame';
import { RootStackParamList, Esame } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import ExamsContext from '../../EsamiContext';

type LibrettoScreenProp = StackNavigationProp<RootStackParamList, 'Libretto'>;

// Funzione per prendere tutti quelli con voto
export const getExamsWithGrades = (exams: Esame[]): Esame[] => {
  return exams.filter((exam) => exam.voto !== null);
};

const Libretto_EsamiDati: React.FC = () => {
  const context = useContext(ExamsContext);

  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }

  const { exams, deleteExam } = context;
  const [selectedEsame, setSelectedEsame] = useState<Esame | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<LibrettoScreenProp>();

  const [listKey, setListKey] = useState(0);

  const openModal = (esame: Esame) => {
    setSelectedEsame(esame);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEsame(null);
    setModalVisible(false);
  };

  const handleEdit = (esame: Esame) => {
    navigation.navigate('Aggiunta', { esame });
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteExam(id);
    closeModal();
    setListKey(listKey + 1); // Forza il ri-rendering della FlatList
  };

  const examsWithGrades = getExamsWithGrades(exams); // Filtra gli esami con voto

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={listKey}
        data={examsWithGrades} // Usa gli esami filtrati
        extraData={examsWithGrades}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <EsameCard esame={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} // Aggiungi il metodo toString se id è un numero
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
      {selectedEsame && (
        <DettagliEsame
          visible={modalVisible}
          onClose={closeModal}
          esame={selectedEsame}
          onDelete={() => handleDelete(selectedEsame.id)}
          onEdit={handleEdit}
        />
      )}
    </View>
  );
};

export default Libretto_EsamiDati;
