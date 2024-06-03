import React from 'react';
import { Modal, ScrollView, Text } from 'react-native';
import { Esame } from '../../types';
import styled from 'styled-components/native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Appbar,
  Chip,
} from 'react-native-paper';

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
    padding: 20px;
`;

const ModalCard = styled(Card)`
    width: 100%;
    max-width: 600px;
    height: 90%;
    border-radius: 20px;
    overflow: hidden;
    justify-content: space-between;
    elevation: 5;
`;

const StyledHeader = styled(Appbar.Header)`
    background-color: #6854a4;
    align-items: center;
    justify-content: space-between;
`;

const ScrollContainer = styled(ScrollView)`
    max-height: 80%; /* Aumenta l'altezza massima del contenuto scrollabile */
`;

const ModalContent = styled(Card.Content)`
    padding: 20px;
`;

const ModalAction = styled(Card.Actions)`
    justify-content: flex-end;
    padding: 10px 20px;
`;

const StyledParagraph = styled(Paragraph)`
    margin-bottom: 10px;
    font-size: 16px;
`;

const ChipContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
`;

const Label = styled(Paragraph)`
    font-weight: bold;
    margin-top: 10px;
    font-size: 16px;
`;

const BoldText = styled(Text)`
    font-weight: bold;
    font-size: 16px;
`;

const DiaryContainer = styled.View`
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
`;

const DettagliEsame: React.FC<EsameModalProps> = ({
                                                    visible,
                                                    onClose,
                                                    esame,
                                                    onDelete,
                                                    onEdit,
                                                  }) => {
  if (!esame) return null;

  const isSuperato = new Date(esame.data) < new Date();
  console.log('Docente:', esame.docente);
  console.log('Luogo:', esame.luogo);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalCard>
          <StyledHeader>
            <Appbar.Content
              title="Dettagli Esame"
              titleStyle={{ color: '#fafafa', fontSize: 24 }}
            />
            <Appbar.Action
              icon="pencil"
              iconColor="#fafafa"
              onPress={() => onEdit(esame)}
            />
            <Appbar.Action
              icon="delete"
              iconColor="#fafafa"
              onPress={() => onDelete(esame.id)}
            />
          </StyledHeader>
          <ScrollContainer>
            <ModalContent>
              <Title style={{ fontWeight: 'bold', fontSize: 24 }}>
                {esame.nome}
              </Title>
              <StyledParagraph>
                <BoldText>Corso di Studi:</BoldText> {esame.corsoDiStudi}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>CFU:</BoldText> {esame.CFU}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>Data:</BoldText> {esame.data}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>Ora:</BoldText> {esame.ora != null ? esame.ora : 'Info Non Disponibile'}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>Luogo:</BoldText> {esame.luogo != ''  ? esame.luogo : 'Info Non Disponibile'}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>Tipologia:</BoldText> {esame.tipologia}
              </StyledParagraph>
              <StyledParagraph>
                <BoldText>Docente:</BoldText> {esame.docente != null ? esame.docente : 'Info Non Disponibile'}
              </StyledParagraph>
              {esame.voto !== null ? (
                <StyledParagraph>
                  <BoldText>Voto:</BoldText> {esame.voto}
                </StyledParagraph>
              ) : (
                isSuperato ? (
                  <StyledParagraph>
                    <BoldText>Voto:</BoldText> Aggiungi voto!
                  </StyledParagraph>
                ) : (
                  <StyledParagraph>
                    <BoldText>Voto:</BoldText> In bocca al lupo!
                  </StyledParagraph>
                )
              )}
              <Label>Categorie Assegnate:</Label>
              <ChipContainer>
                {esame.categorie.length > 0 ? (
                  esame.categorie.map((categoria) => (
                    <Chip
                      key={categoria.id}
                      style={{
                        backgroundColor: categoria.colore,
                        marginRight: 4,
                        marginBottom: 4,
                      }}
                    >
                      {categoria.nome}
                    </Chip>
                  ))
                ) : (
                  <Chip style={{ backgroundColor: '#cccccc60' }}>
                    Nessuna Categoria Assegnata
                  </Chip>
                )}
              </ChipContainer>
              <Label>Diario:</Label>
              <DiaryContainer>
                <StyledParagraph>
                  {esame.diario ? esame.diario : 'Diario non presente...'}
                </StyledParagraph>
              </DiaryContainer>
            </ModalContent>
          </ScrollContainer>
          <ModalAction>
            <Button mode="contained" onPress={onClose}>
              Chiudi
            </Button>
          </ModalAction>
        </ModalCard>
      </ModalContainer>
    </Modal>
  );
};

export default DettagliEsame;
