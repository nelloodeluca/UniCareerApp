import React from 'react';
import { Modal, Text } from 'react-native';
import { Esame } from '../../types';
import styled from 'styled-components/native';
import { Card, Title, Paragraph, Button, Appbar, Chip } from 'react-native-paper';

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
    max-width: 500px;
    border-radius: 20px;
    overflow: hidden;
    elevation: 5;
`;

const StyledHeader = styled(Appbar.Header)`
    background-color: #6854a4;
    align-items: center;
    justify-content: space-between;
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
            <Appbar.Content title="Dettagli Esame" titleStyle={{ color: '#fafafa', fontSize: 24 }} />
            <Appbar.Action icon="pencil" iconColor="#fafafa" onPress={() => onEdit(esame)} />
            <Appbar.Action icon="delete" iconColor="#fafafa" onPress={() => onDelete(esame.id)} />
          </StyledHeader>
          <ModalContent>
            <Title style={{ fontWeight: 'bold', fontSize:24 }}>{esame.nome}</Title>
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
              <BoldText>Ora:</BoldText> {esame.ora}
            </StyledParagraph>
            <StyledParagraph>
              <BoldText>Luogo:</BoldText> {esame.luogo}
            </StyledParagraph>
            <StyledParagraph>
              <BoldText>Tipologia:</BoldText> {esame.tipologia}
            </StyledParagraph>
            <StyledParagraph>
              <BoldText>Docente:</BoldText> {esame.docente}
            </StyledParagraph>
            {esame.voto !== undefined && (
              <StyledParagraph>
                <BoldText>Voto:</BoldText> {esame.voto}
              </StyledParagraph>
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
                <StyledParagraph>Nessuna Categoria Assegnata</StyledParagraph>
              )}
            </ChipContainer>
            <Label>Diario:</Label>
            <DiaryContainer>
              <StyledParagraph>
                {esame.diario ? esame.diario : 'Aggiungi Note al tuo Diario...'}
              </StyledParagraph>
            </DiaryContainer>
          </ModalContent>
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
