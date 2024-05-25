import React, { useContext, useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EsameCard from '../../components/EsameCard';
import DettagliEsame from './DettagliEsame';
import { RootStackParamList, Esame } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import ExamsContext from '../../components/EsamiContext';

type LibrettoScreenProp = StackNavigationProp<RootStackParamList, 'Libretto'>;

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
    setListKey(listKey + 1);

  };


  return (
    <View style={{ flex: 1 }}>
      <FlatList
        key={listKey}
        data={exams}
        extraData={exams}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <EsameCard esame={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
         // Ensure FlatList re-renders when exams changes
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
