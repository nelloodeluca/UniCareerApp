import styled from 'styled-components/native';
import { Platform, ScrollView, TextInput, View } from 'react-native';
import { Button, List, Snackbar, Text } from 'react-native-paper';
import LabelInput from '../../components/aggiunta/LabelInput';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { Categoria, Esame } from '../../types';
import NumericInput from '../../components/aggiunta/NumericInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';
import CategoriaPicker from '../../components/aggiunta/CategoriaPicker';
import ExamsContext from '../../EsamiContext';
import SQLite from 'react-native-sqlite-storage';
import { aggiungiEsame } from '../../../database';
import LodeSwitch from '../../components/aggiunta/LodeSwitch';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const NuovaAggiunta: React.FC<{ esame?: Esame }> = ({ esame }) => {
  const context = useContext(ExamsContext);
  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }
  const { categorie } = context;
  const route = useRoute();

  const [nome, setNome] = useState<string>('');
  const [corso_studi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [cfu, setCfu] = useState<number>(1);
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('');
  const [voto, setVoto] = useState<number>(24);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [lode, setLode] = useState<boolean>(false);
  const [isLodeOn, setIsLodeOn] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [infoAggExpanded, setInfoAggExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  useEffect(() => {
    if (esame) {
      setNome(esame.nome || '');
      setCorsoStudio(esame.corsoDiStudi || '');
      setDocente(esame.docente || '');
      setCfu(esame.CFU || 1);
      setLuogo(esame.luogo || '');
      setTipologia(esame.tipologia || '');
      setVoto(esame.voto || 18);
      setDate(new Date(esame.data));
      setTime(new Date(esame.data + ' ' + esame.ora));
      setDiario(esame.diario || '');
      setLode(esame.lode || false);
    }
  }, [esame]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log(route);
        if (route.name !== 'FormCategorie') {
          setNome('');
          setCorsoStudio('');
          setDocente('');
          setCfu(1);
          setLuogo('');
          setTipologia('');
          setVoto(18);
          setDate(new Date());
          setTime(new Date());
          setLode(false);
          setDiario('');
        }
      };
    }, [route.name])
  );

  const handleSelect = (selectedCategories: Categoria[]) => {
    console.log('Selected Categories:', selectedCategories);
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };
  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isSuperato = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
  };
  const incrementCfu = () => {
    setCfu((prevCfu) => (prevCfu < 12 ? prevCfu + 1 : prevCfu));
  };

  const decrementCfu = () => {
    setCfu((prevCfu) => (prevCfu > 1 ? prevCfu - 1 : prevCfu));
  };

  const incrementVoto = () => {
    setVoto((prevVoto) => (prevVoto < 30 ? prevVoto + 1 : prevVoto));
  };

  const decrementVoto = () => {
    setVoto((prevVoto) => (prevVoto > 18 ? prevVoto - 1 : prevVoto));
  };

  const handleSubmit = () => {
    SQLite.enablePromise(true);
    const dbPromise = SQLite.openDatabase({
      name: 'gruppo13.db',
      location: 'default',
    });
    aggiungiEsame(
      dbPromise,
      nome,
      corso_studi,
      docente,
      luogo,
      tipologia,
      Number(cfu),
      formatDate(date),
      formatTime(time),
      Number(voto),
      lode,
      diario
    );
    setSnackbarVisible(true);
  };

  return (
    <ScrollContainer>
      <StyledListSection>
        <Container>
          <LabelInput
            label="Nome:"
            placeholder="Aggiungi il nome esame"
            value={nome}
            onChangeText={setNome}
          />
          <LabelInput
            label="Corso di Studi:"
            placeholder="Aggiungi il Corso di Studi dell'esame"
            value={corso_studi}
            onChangeText={setCorsoStudio}
          />
          <NumericContainer>
            <NumericText>CFU:</NumericText>
            <NumericInput
              number={cfu}
              increment={incrementCfu}
              decrement={decrementCfu}
              min={1}
              max={12}
            />
          </NumericContainer>
          <StyledListAccordion
            title="Altre Informazioni"
            left={(props) => <List.Icon {...props} icon="animation" />}
          >
            <LabelInput
              label="Tipologia"
              placeholder="Aggiungi la tipologia dell'esame"
              value={tipologia}
              onChangeText={setTipologia}
            />
            <LabelInput
              label="Docente"
              placeholder="Aggiungi il docente dell'esame"
              value={docente}
              onChangeText={setDocente}
            />
            <LabelInput
              label="Luogo"
              placeholder="Aggiungi il docente dell'esame"
              value={luogo}
              onChangeText={setLuogo}
            />
          </StyledListAccordion>
        </Container>
      </StyledListSection>

      <StyledListSection>
        <Container>
          <Label>Seleziona fino a 3 categorie:</Label>
          <CategoriaPicker categorie={categorie} onSelect={handleSelect} />
        </Container>
      </StyledListSection>

      <StyledListSection>
        {Platform.OS === 'android' ? (
          <Container>
            <CustomButton mode="contained" onPress={() => showMode('date')}>
              <DateTimeText>Data selezionata: {formatDate(date)}</DateTimeText>
            </CustomButton>
            <CustomButton mode="contained" onPress={() => showMode('time')}>
              <DateTimeText>Ora selezionata: {formatTime(time)}</DateTimeText>
            </CustomButton>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={mode === 'date' ? date : time}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={{ backgroundColor: '#fff' }}
              />
            )}
            {isSuperato(date) && (
              <Container>
                <NumericContainer>
                  <NumericText>VOTO:</NumericText>
                  <NumericInput
                    number={voto}
                    increment={incrementVoto}
                    decrement={decrementVoto}
                    min={18}
                    max={30}
                  />
                </NumericContainer>
                <LodeSwitch voto={voto} lode={lode} setLode={setLode} />
              </Container>
            )}
          </Container>
        ) : (
          <Container style={{ backgroundColor: '#fff', borderRadius: 5 }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ backgroundColor: '#fff' }}
            />
            <DateTimePicker
              testID="timePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ backgroundColor: '#fff' }}
            />
            {isSuperato(date) && (
              <Container>
                <NumericContainer>
                  <NumericText>VOTO:</NumericText>
                  <NumericInput
                    number={voto}
                    increment={incrementVoto}
                    decrement={decrementVoto}
                    min={18}
                    max={30}
                  />
                </NumericContainer>
                <LodeSwitch voto={voto} lode={lode} setLode={setLode} />
              </Container>
            )}
          </Container>
        )}
      </StyledListSection>

      <StyledListSection>
        <CustomButton mode="contained" onPress={handleSubmit}>
          {isEditing ? 'Modifica Esame' : 'Inserisci Esame'}
        </CustomButton>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          <Text>
            Esame {isEditing ? 'modificato' : 'inserito'} correttamente
          </Text>
        </Snackbar>
      </StyledListSection>
    </ScrollContainer>
  );
};

const ScrollContainer = styled(ScrollView)`
  background-color: #f5f5f5;
  overflow: hidden;
  height: ${h}px;
`;

const Label = styled(Text)`
  font-size: 18px;
  margin: 4px 0;
  color: #333;
`;

const StyledListSection = styled(List.Section)`
  background-color: #fafafa;
  border-radius: 20px;

  padding: 8px 16px;
  margin: 4px 4px;
  border: 1px solid #afafaf;
`;

const StyledListAccordion = styled(List.Accordion)`
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #afafaf;
  padding: 8px;
  margin: 0 0 8px 0;
`;

const Container = styled.View`
  margin: 0 0 0 0;
`;

const NumericContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const NumericText = styled.Text`
  flex: 1;
  font-size: 20px;
  padding-left: 3%;
  font-weight: 500;
`;

const CustomButton = styled(Button)`
  margin: 4px 0;
  background-color: #6854a4;
  border-radius: 10px;
  padding: 10px;
`;

const DateTimeText = styled(Text)`
  margin-top: 20px;
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

const DiaryInput = styled(TextInput)`
  height: 150px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  text-align-vertical: top;
`;

export default NuovaAggiunta;
