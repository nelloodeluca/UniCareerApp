import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { Categoria } from '../../types';
import { Card, IconButton, Button, Appbar, Paragraph, Snackbar } from 'react-native-paper';
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
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
`;

const ModalCard = styled(Card)`
    width: 100%;
    max-width: 500px;
    border-radius: 20px;
    overflow: hidden;
    elevation: 5;
`;

const StyledHeader = styled(Appbar.Header)`
    background-color: #6854a4;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled(Card.Content)`
    padding: 8px 20px 0 20px;
`;

const ModalAction = styled(Card.Actions)`
    justify-content: center;
    padding: 10px 20px;
`;

const ModalInputLabel = styled(Paragraph)`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
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
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: ${(props) => props.color};
    margin-right: 8px;
`;

const ColorPickerButton = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
`;

const ColorPickerText = styled(Text)`
    font-size: 16px;
    margin-right: 8px;
`;

const ModificaCategoriaModal: React.FC<ModificaCategoriaModalProps> = ({
                                                                         visible,
                                                                         category,
                                                                         onClose,
                                                                         onSave,
                                                                       }) => {
  const [nome, setNome] = useState(category.nome);
  const [colore, setColore] = useState(category.colore);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSave = () => {
    if (!nome.trim()) {
      setSnackbarVisible(true);
      return;
    }
    onSave({ ...category, nome, colore });
    onClose();
  };

  const handleShuffleColor = () => {
    setColore(getRandomColor());
  };

  return (
    <>
      <Modal transparent visible={visible} animationType="slide">
        <ModalContainer>
          <ModalCard>
            <StyledHeader>
              <Appbar.Content title="Modifica Categoria" titleStyle={{ color: '#fafafa', fontSize: 24 }} />
            </StyledHeader>
            <ModalContent>
              <ModalInputLabel>Nome Categoria:</ModalInputLabel>
              <ModalInput
                value={nome}
                onChangeText={(text) => {
                  if (text.length <= 50) {
                    setNome(text);
                  }
                }}
                placeholder="A che nome stai pensando?..."
                maxLength={50}
              />
              <ColorPickerButton onPress={handleShuffleColor}>
                <Circle color={colore} />
                <ColorPickerText>Scegli colore casuale</ColorPickerText>
                <IconButton icon="shuffle" size={24} onPress={handleShuffleColor} />
              </ColorPickerButton>
            </ModalContent>
            <ModalAction>
              <Button mode="contained" onPress={onClose} style={{ marginRight: 10 }}>
                Annulla
              </Button>
              <Button mode="contained" onPress={handleSave}>
                Salva
              </Button>
            </ModalAction>
          </ModalCard>
        </ModalContainer>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          Il nome della categoria non può essere vuoto.
        </Snackbar>
      </Modal>
    </>
  );
};

export default ModificaCategoriaModal;
