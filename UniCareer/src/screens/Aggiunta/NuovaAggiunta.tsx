import styled from 'styled-components/native';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { Button, Divider, List, Snackbar, Text } from 'react-native-paper';
import LabelInput from '../../components/aggiunta/LabelInput';
import React, { useContext, useEffect, useState } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { AggiuntaNavParams, Categoria, Esame } from '../../types';
import NumericInput from '../../components/aggiunta/NumericInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import CategoriaPicker from '../../components/aggiunta/CategoriaPicker';
import ExamsContext from '../../EsamiContext';
import LodeSwitch from '../../components/aggiunta/LodeSwitch';
import TipoPicker from '../../components/TipoPicker';
import { formatTime, formatDate, getCurrentDate } from '../../utils/aggiunta';

type FormEsameRouteProp = RouteProp<AggiuntaNavParams, 'FormEsame'>;
const h = Dimensions.get('window').height;

const NuovaAggiunta = () => {
  const context = useContext(ExamsContext);
  if (!context) {
    return <Text>Il contesto non è disponibile</Text>;
  }
  const { categorie, aggiornaEsame, aggiungiEsame } = context;

  const route = useRoute<FormEsameRouteProp>();
  const param = route.params?.esame;
  const [esame, setEsame] = useState<Esame | null>(null);

  const [id, setId] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [corsoDiStudi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [CFU, setCfu] = useState<number>(1);
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('Orale');
  const [tipoEsame, setTipoEsame] = useState<string>('Prossimo');
  const [voto, setVoto] = useState<number>(24);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [lode, setLode] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Categoria[]>([]);

  useEffect(() => {
    setEsame(param);
  }, [route]);

  useEffect(() => {
    if (esame) {
      const newTime = new Date();
      if (esame && esame.ora) {
        const [hours, minutes] = esame.ora.split(':');
        newTime.setHours(Number(hours), Number(minutes));
      }
      setIsEditing(true);
      setId(esame.id || '');
      setNome(esame.nome || '');
      setCorsoStudio(esame.corsoDiStudi || '');
      setDocente(esame.docente || '');
      setCfu(esame.CFU || 1);
      setLuogo(esame.luogo || '');
      setTipologia(esame.tipologia || '');
      setVoto(esame.voto || 18);
      setDate(new Date(esame.data));
      setTime(new Date(newTime));
      setDiario(esame.diario || '');
      setLode(esame.lode || false);
      if (esame.voto === null) {
        setTipoEsame('Prossimo');
      } else {
        setTipoEsame('Superato');
      }
      setSelectedCategorie(esame.categorie || []);
    }
  }, [esame]);

  useEffect(() => {
    if (tipoEsame == 'Prossimo') {
      setVoto(0);
      setLode(false);
    } else {
      setVoto(24);
      setLode(false);
    }
  }, [tipoEsame, route]);

  useEffect(() => {
    const today = getCurrentDate();
    const selected = date;
    selected.setHours(0, 0, 0, 0); // Ignorare ore, minuti, secondi e millisecondi
    if (selected.getTime() < today.getTime() && tipoEsame == 'Prossimo') {
      Alert.alert('Attenzione', 'Esame prossimo in una data passata!');
    }
  }, [tipoEsame === 'Prossimo' && date]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setId('');
        setNome('');
        setCorsoStudio('');
        setDocente('');
        setCfu(1);
        setLuogo('');
        setTipologia('Orale');
        setTipoEsame('Prossimo');
        setVoto(18);
        setDate(new Date());
        setTime(new Date());
        setLode(false);
        setDiario('');
        setSelectedCategorie([]);
        setEsame(null);
        setIsEditing(false);
        setSelectedCategorie([]);
      };
    }, [])
  );

  const handleSelect = (selectedCategories: Categoria[]) => {
    setSelectedCategorie(selectedCategories);
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShow(Platform.OS === 'ios');
    if (selectedDate) {
      const currentDate = new Date(selectedDate);
      currentDate.setHours(date.getHours());
      currentDate.setMinutes(date.getMinutes());
      setDate(currentDate);
    }
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    setShow(Platform.OS === 'ios');
    if (selectedTime) {
      const currentTime = new Date(time);
      currentTime.setHours(selectedTime.getHours());
      currentTime.setMinutes(selectedTime.getMinutes());
      setTime(currentTime);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
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
    const temp: Esame = {
      id,
      nome,
      corsoDiStudi,
      CFU,
      data: formatDate(date),
      ora: formatTime(time),
      docente,
      luogo,
      tipologia,
      voto,
      lode,
      diario,
      categorie: selectedCategorie,
    };
    console.log('Diario Esame:',temp.diario);
    console.log('Luogo Esame:',temp.luogo);
    console.log('Docente Esame:',temp.docente);
    if(temp.voto === 0 || tipoEsame === "Prossimo") {
      temp.voto = null;
    }

    if(isEditing) {
      aggiornaEsame(temp);
    } else{
      aggiungiEsame(temp);
    }
    setSnackbarVisible(true);
  };

  const isFormValid = nome && corsoDiStudi && CFU && date;

  return (
    <>
      <ScrollContainer>
        <StyledListSection>
          <Container>
            <LabelInput
              label="Nome"
              placeholder="Aggiungi il nome esame"
              value={nome}
              onChangeText={setNome}
            />
            <LabelInput
              label="Corso di Studi"
              placeholder="Aggiungi il Corso di Studi dell'esame"
              value={corsoDiStudi}
              onChangeText={setCorsoStudio}
            />
            <LabelInput
              label="Docente*"
              placeholder="Aggiungi il docente dell'esame"
              value={docente}
              onChangeText={setDocente}
            />
            <LabelInput
              label="Luogo*"
              placeholder="Aggiungi il luogo dell'esame"
              value={luogo}
              onChangeText={setLuogo}
            />
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
                <>
                  {mode === 'date' && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeDate}
                      style={{ backgroundColor: '#fff' }}
                    />
                  )}
                  {mode === 'time' && (
                    <DateTimePicker
                      testID="timePicker"
                      value={time}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={onChangeTime}
                      style={{ backgroundColor: '#fff' }}
                    />
                  )}
                </>
              )}
            </Container>
          ) : (
            <Container>
              <InlineContainer>
                <Label>Data dell'Esame:</Label>
                <StyledDateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeDate}
                />
              </InlineContainer>
              <InlineContainer>
                <Label>Ora dell'Esame:</Label>
                <StyledDateTimePicker
                  testID="timePicker"
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTime}
                />
              </InlineContainer>
            </Container>
          )}
          <TipoPicker
            option1={'Orale'}
            option2={'Scritto'}
            selectedOption={tipologia}
            handleOptionChange={setTipologia}
          />
          <Divider bold/>
          <Container>
            <Label>Seleziona fino a 3 categorie:</Label>
            <CategoriaPicker
              categorie={categorie}
              onSelect={handleSelect}
              initialSelected={selectedCategorie}
            />
          </Container>
        </StyledListSection>

        <StyledListSection>
          <TipoPicker
            option1={'Superato'}
            option2={'Prossimo'}
            selectedOption={tipoEsame}
            handleOptionChange={setTipoEsame}
          />
          <Divider bold/>
          <NumericContainer>
            <NumericText>CFU:</NumericText>
            <NumericInput
              number={CFU}
              increment={incrementCfu}
              decrement={decrementCfu}
              min={1}
              max={12}
            />
          </NumericContainer>
          {tipoEsame == 'Superato' && (
            <>
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
            </>
          )}

        </StyledListSection>

        <StyledListSection>
          <Label>Diario Esame:</Label>
          <DiaryInput
            placeholder="Scrivi le note riguardanti il tuo esame"
            value={diario}
            onChangeText={setDiario}
            multiline
            numberOfLines={15}
            style={{ textAlignVertical: 'top' }}
          />
        </StyledListSection>

        <StyledListSection>
          <SubmitButton
            mode="contained"
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            {isEditing ? 'Modifica Esame' : 'Inserisci Esame'}
          </SubmitButton>
        </StyledListSection>
      </ScrollContainer>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ position: 'absolute', bottom: 0, width: '90%', alignSelf: 'center'}}
      >
        <Label style={{ color: '#fafafa' }}>
          Esame {isEditing ? 'modificato' : 'inserito'} correttamente
        </Label>
      </Snackbar>
    </>
  );
};

const ScrollContainer = styled(ScrollView)`
    background-color: #f5f5f5;
    overflow: hidden;
    height: ${h}px;
    padding: 8px;
`;

const Label = styled(Text)`
    font-size: 18px;
    margin: 4px 0;
    color: #333;
`;

const StyledListSection = styled(List.Section)`
    border-radius: 20px;
    padding: 8px 16px;
    margin: 8px 0;
    background-color: #fafafa;
    border: 1px solid #afafaf50;
`;

const Container = styled.View`
    margin: 8px 0;
`;

const InlineContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;
`;

const NumericContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin: 4px 0;
`;

const NumericText = styled.Text`
    flex: 1;
    font-size: 20px;
    padding-left: 3%;
    font-weight: 500;
`;

const StyledDateTimePicker = styled(DateTimePicker)`
    padding: 2px 8px;
    margin: 8px 0;
`;

const CustomButton = styled(Button)`
    margin: 8px 0;
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
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;
    margin: 8px 0 20px 0;
`;

const SubmitButton = styled(Button)<{ disabled: boolean }>`
    margin: 8px 0;
    background-color: ${({ disabled }) => (disabled ? '#cccccc70' : '#6854a4')};
    border-radius: 10px;
    padding: 10px;
`;

export default NuovaAggiunta;