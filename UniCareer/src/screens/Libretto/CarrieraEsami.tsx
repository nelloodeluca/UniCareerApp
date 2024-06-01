import React, { useContext, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<CarrieraEsamiNavigationProp>();

  const [listKey, setListKey] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setListKey(prevKey => prevKey + 1);
      setLoading(false);
    }, 500); // Simula un piccolo ritardo per il caricamento
  }, [exams]);

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
    setLoading(true);
    deleteExam(id);
    closeModal();
  };

  const filteredExams = showVoto
    ? getExamsWithGrades(exams)
    : getExamsWithoutGrades(exams);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
