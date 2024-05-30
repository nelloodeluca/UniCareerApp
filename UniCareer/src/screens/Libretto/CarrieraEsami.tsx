import React, { useContext, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EsameCard from '../../components/EsameCard';
import DettagliEsame from './DettagliEsame';
import { RootStackParamList, Esame } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import ExamsContext from '../../EsamiContext';
import {
  getExamsWithGrades,
  getExamsWithoutGrades,
} from '../../utils/carriera';

type CarrieraEsamiNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Libretto'
>;

type CarrieraEsamiProps = {
  showVoto: boolean;
};

const CarrieraEsami: React.FC<CarrieraEsamiProps> = ({ showVoto }) => {
  const context = useContext(ExamsContext);

  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }

  const { exams, deleteExam } = context;
  const [selectedEsame, setSelectedEsame] = useState<Esame | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<CarrieraEsamiNavigationProp>();

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
    navigation.navigate('Aggiunta', {
      screen: 'FormEsame',
      params: { esame },
    });
    closeModal();
  };

  const handleDelete = async (id: string) => {
    await deleteExam(id);
    closeModal();
    setListKey(listKey + 1); // Forza il ri-rendering della FlatList
  };

  const filteredExams = showVoto
    ? getExamsWithGrades(exams)
    : getExamsWithoutGrades(exams);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={listKey}
        data={filteredExams} // Usa gli esami filtrati
        extraData={filteredExams}
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

export default CarrieraEsami;
