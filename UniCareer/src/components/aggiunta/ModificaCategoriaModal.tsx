import React, { useState } from 'react';
import { Modal, Button, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Categoria } from '../../types';
import { IconButton } from 'react-native-paper';
import { getRandomColor } from '../../utils/getColor';

interface ModificaCategoriaModalProps {
  visible: boolean;
  category: Categoria;
  onClose: () => void;
  onSave: (updatedCategory: Categoria) => void;
}

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000050;
`;

const ModalContent = styled.View`
  width: 80%;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ModalInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Circle = styled.View<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const ColorPickerButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const ModificaCategoriaModal: React.FC<ModificaCategoriaModalProps> = ({
  visible,
  category,
  onClose,
  onSave,
}) => {
  const [nome, setNome] = useState(category.nome);
  const [colore, setColore] = useState(category.colore);

  const handleSave = () => {
    onSave({ ...category, nome, colore });
    onClose();
  };

  const handleShuffleColor = () => {
    setColore(getRandomColor());
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Modifica Categoria</ModalTitle>
          <ModalInput value={nome} onChangeText={setNome} placeholder="Nome" />
          <ColorPickerButton onPress={handleShuffleColor}>
            <Circle color={colore} />
            <Text>Scegli colore casuale</Text>
            <IconButton icon="shuffle" size={20} onPress={handleShuffleColor} />
          </ColorPickerButton>
          <ButtonContainer>
            <Button title="Annulla" onPress={onClose} />
            <Button title="Salva" onPress={handleSave} />
          </ButtonContainer>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

export default ModificaCategoriaModal;
