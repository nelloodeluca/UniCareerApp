import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EsameCard from '../../components/EsameCard';
import DettagliEsame from './DettagliEsame';
import { RootStackParamList, Esame} from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { deleteEsameById } from '../../utils/operazioni_db/databaseOperations';
import { getEsamiSenzaVoto } from '../../utils/operazioni_db/fetch_EsamiSenzaVoto';

type LibrettoScreenProp = StackNavigationProp<RootStackParamList, 'Libretto'>;

const Libretto_EsamiNonDati: React.FC = () => {
  const [esamiNonDati, setEsamiNonDati] = useState<Esame[]>([]);
  const [selectedEsame, setSelectedEsame] = useState<Esame | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<LibrettoScreenProp>();

  useEffect(() => {
    const fetchEsami = async () => {
      try {
        const esami = await getEsamiSenzaVoto();
        setEsamiNonDati(esami);
      } catch (error) {
        console.error('Failed to fetch esami from database:', error);
      }
    };

    fetchEsami();
  }, []);

  const openModal = (esame: Esame) => {
    setSelectedEsame(esame);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedEsame(null);
    setModalVisible(false);
  };

  const deleteEsame = async (id: string) => {
    try {
      await deleteEsameById(id);
      setEsamiNonDati((prevEsami) => prevEsami.filter((esame) => esame.id !== id));
      closeModal();
    } catch (error) {
      console.error('Failed to delete the esame:', error);
    }
  };

  const handleEdit = (esame: Esame) => {
    navigation.navigate('Aggiunta', { esame });
    closeModal();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={esamiNonDati}
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
      />
      <DettagliEsame
        visible={modalVisible}
        onClose={closeModal}
        esame={selectedEsame}
        onDelete={deleteEsame}
        onEdit={handleEdit}
      />
    </View>
  );
};

export default Libretto_EsamiNonDati;
