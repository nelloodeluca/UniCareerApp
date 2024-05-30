import styled from 'styled-components/native';
import { Dimensions, Platform, ScrollView, TextInput } from 'react-native';
import { Button, List, Snackbar, Text } from 'react-native-paper';
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

type FormEsameRouteProp = RouteProp<AggiuntaNavParams, 'FormEsame'>;

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const NuovaAggiunta = () => {
  const context = useContext(ExamsContext);
  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }
  const { categorie, insertOrReplaceExam } = context;

  const route = useRoute<FormEsameRouteProp>();
  const esame: Esame = route.params?.esame;

  const [id, setId] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [corsoDiStudi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [CFU, setCfu] = useState<number>(1);
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('Orale');
  const [voto, setVoto] = useState<number>(24);
  const [tipoEsame, setTipoEsame] = useState<string>('Prossimo');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [lode, setLode] = useState<boolean>(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [infoAggExpanded, setInfoAggExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [selectedCategorie, setSelectedCategorie] = useState<Categoria[]>([]);

  useEffect(() => {
    if (esame) {
      const newTime = new Date();
      if (esame && esame.ora) {
        const [hours, minutes] = esame.ora.split(':');
        newTime.setHours(Number(hours), Number(minutes));
      }

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
      console.log(esame.ora);
      setDiario(esame.diario || '');
      setLode(esame.lode || false);
    }

  }, [esame]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        console.log(route);

        setId('');
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
        setSelectedCategorie([]);
      };
    }, [route])
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTime = (time: Date) => {
    const hours = String(time.getHours()).padStart(2, '0');
    const minutes = String(time.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
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
    
    const temp: Esame = {
      id,
      nome,
      corsoDiStudi,
      CFU,
      data: formatDate(date),
      ora: formatTime(time),
      luogo,
      tipologia,
      voto,
      lode,
      diario,
      categorie: selectedCategorie,
    };
    console.log(esame);
    insertOrReplaceExam(temp);
    setSnackbarVisible(true);
  };

  const isFormValid = nome && corsoDiStudi && CFU;

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
            value={corsoDiStudi}
            onChangeText={setCorsoStudio}
          />
          <TipoPicker option1={'Orale'} option2={'Scritto'} selectedOption={tipologia} handleOptionChange={setTipologia}/>
          <StyledListAccordion
            title="Altre Informazioni"
            left={(props) => <List.Icon {...props} icon="animation" />}
          >
            <LabelInput
              label="Docente"
              placeholder="Aggiungi il docente dell'esame"
              value={docente}
              onChangeText={setDocente}
            />
            <LabelInput
              label="Luogo"
              placeholder="Aggiungi il luogo dell'esame"
              value={luogo}
              onChangeText={setLuogo}
            />
          </StyledListAccordion>
        </Container>
      </StyledListSection>

      <StyledListSection>
        <TipoPicker option1={'Superato'} option2={'Prossimo'} selectedOption={tipoEsame} handleOptionChange={setTipoEsame}/>
        <Container>
          <Label>Seleziona fino a 3 categorie:</Label>
          <CategoriaPicker categorie={categorie} onSelect={handleSelect} />
        </Container>
      </StyledListSection>

      <StyledListSection>
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
        <Label>Diario Esame:</Label>
        <DiaryInput
          placeholder="Scrivi le note riguardanti il tuo esame"
          value={diario}
          onChangeText={setDiario}
          multiline
          numberOfLines={15}
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
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          <Label style={{color:'#fafafa'}}>
            Esame {isEditing ? 'modificato' : 'inserito'} correttamente
          </Label>
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
  border-radius: 20px;
  padding: 8px 16px;
  margin: 4px 4px; 
  //background-color: #fafafa;
  //border: 1px solid #afafaf;
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

const InlineContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const StyledDateTimePicker = styled(DateTimePicker)`
  padding: 2px 8px;
  margin: 4px auto;
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

const SubmitButton = styled(Button)<{ disabled: boolean }>`
  margin: 4px 0;
  background-color: ${({ disabled }) => (disabled ? '#cccccc70' : '#6854a4')};
  border-radius: 10px;
  padding: 10px;
`;

export default NuovaAggiunta;
