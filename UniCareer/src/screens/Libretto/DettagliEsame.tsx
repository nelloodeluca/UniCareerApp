import React from 'react';
import { Modal, View } from 'react-native';
import { Esame } from '../../types';
import styled from 'styled-components/native';
import { Card, Title, Paragraph, Button, Appbar } from 'react-native-paper';

type EsameModalProps = {
  visible: boolean;
  onClose: () => void;
  esame: Esame | null;
  onDelete: (id: string) => void;
  onEdit: (esame: Esame) => void;
};

const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalCard = styled(Card)`
    width: 90%;
    padding: 20px;
    border-radius: 10px;
    elevation: 5;
`;

const ModalContent = styled(Card.Content)`
    margin-bottom: 20px;
`;

const DettagliEsame: React.FC<EsameModalProps> = ({ visible, onClose, esame, onDelete, onEdit }) => {
  if (!esame) return null;

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalCard>
          <Appbar.Header>
            <Appbar.Content title="Dettagli Esame" />
            <Appbar.Action icon="delete" onPress={() => onDelete(esame.id)} />
            <Appbar.Action icon="pencil" onPress={() => onEdit(esame)} />
          </Appbar.Header>
          <ModalContent>
            <Title>{esame.nome}</Title>
            <Paragraph>Corso di Studi: {esame.corsoDiStudi}</Paragraph>
            <Paragraph>CFU: {esame.CFU}</Paragraph>
            <Paragraph>Data: {esame.data}</Paragraph>
            <Paragraph>Ora: {esame.ora}</Paragraph>
            <Paragraph>Luogo: {esame.luogo}</Paragraph>
            <Paragraph>Tipologia: {esame.tipologia}</Paragraph>
            <Paragraph>Docente: {esame.docente}</Paragraph>
            <Paragraph>Voto: {esame.voto}</Paragraph>
          </ModalContent>
          <Card.Actions>
            <Button mode="contained" onPress={onClose}>Chiudi</Button>
          </Card.Actions>
        </ModalCard>
      </ModalContainer>
    </Modal>
  );
};

export default DettagliEsame;
