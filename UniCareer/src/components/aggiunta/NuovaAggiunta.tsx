import styled from 'styled-components/native';
import { Platform, ScrollView, TextInput, View } from 'react-native';
import { Button, List, MD3Colors, Text } from 'react-native-paper';
import LabelInput from './LabelInput';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Categoria, Esame } from '../../types';
import NumericInput from './NumericInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';
import CategoriaPicker from './CategoriaPicker';
import ExamsContext from '../../EsamiContext';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

const NuovaAggiunta: React.FC<{ esame?: Esame }> = ({ esame }) => {
  const context = useContext(ExamsContext);
  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }
  const { categorie } = context;

  const [nome, setNome] = useState<string>('');
  const [corso_studi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [cfu, setCfu] = useState<number>(1);
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('');
  const [voto, setVoto] = useState<number>(18);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [lode, setLode] = useState<boolean>(false);
  const [infoAggExpanded, setInfoAggExpanded] = useState<boolean>(false);

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
        setNome('');
        setCorsoStudio('');
        setDocente('');
        setCfu(1);
        setLuogo('');
        setTipologia('');
        setVoto(18);
        setDate(new Date());
        setTime(new Date());
        setDiario('');
        setLode(false);
      };
    }, [])
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

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                flex: 1,
                fontSize: 24,
                paddingLeft: '5%',
                fontWeight: '600',
              }}
            >
              CFU:
            </Text>
            <NumericInput
              number={cfu}
              increment={incrementCfu}
              decrement={decrementCfu}
              min={1}
              max={12}
            />
          </View>
          <View>
            <Label>Seleziona fino a 3 categorie:</Label>

            <CategoriaPicker categorie={categorie} onSelect={handleSelect} />
          </View>
        </Container>
      </StyledListSection>
      <StyledListSection>
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
      </StyledListSection>

      <StyledListSection>
        {Platform.OS === 'android' ? (
          <View>
            <CustomButton mode="contained" onPress={() => showMode('date')}>
              <DateTimeText>Data selezionata: {formatDate(date)}</DateTimeText>
            </CustomButton>
            {isSuperato(date) && (
              <View>
                <Text>Congratulazioni Esame Superato</Text>
                <NumericInput
                  number={voto}
                  increment={incrementVoto}
                  decrement={decrementVoto}
                  min={18}
                  max={30}
                />
              </View>
            )}
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
          </View>
        ) : (
          <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
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
              <View>
                <Text>Congratulazioni Esame Superato</Text>
                <NumericInput
                  number={voto}
                  increment={incrementVoto}
                  decrement={decrementVoto}
                  min={18}
                  max={30}
                />
              </View>
            )}
          </View>
        )}
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

  padding: 16px;
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

const CustomButton = styled(Button)`
  margin-top: 20px;
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
