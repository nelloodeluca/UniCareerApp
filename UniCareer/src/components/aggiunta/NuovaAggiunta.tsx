import styled from 'styled-components/native';
import { ScrollView, TextInput, View } from 'react-native';
import { Button, List, Text } from 'react-native-paper';
import LabelInput from './LabelInput';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Esame } from '../../types';
import NumericInput from './NumericInput';
import DateTimePicker from '@react-native-community/datetimepicker';

const NuovaAggiunta: React.FC<{ esame?: Esame }> = ({ esame }) => {
  const [nome, setNome] = useState<string>('');
  const [corso_studi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [cfu, setCfu] = useState<string>('');
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('');
  const [voto, setVoto] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [lode, setLode] = useState<boolean>(false);

  useEffect(() => {
    if (esame) {
      setNome(esame.nome || '');
      setCorsoStudio(esame.corsoDiStudi || '');
      setDocente(esame.docente || '');
      setCfu(esame.CFU?.toString() || '');
      setLuogo(esame.luogo || '');
      setTipologia(esame.tipologia || '');
      setVoto(esame.voto || '');
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
        setCfu('');
        setLuogo('');
        setTipologia('');
        setVoto('');
        setDate(new Date());
        setTime(new Date());
        setDiario('');
        setLode(false);
      };
    }, [])
  );

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    if (mode === 'date') {
      setDate(currentDate);
    } else {
      setTime(currentDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  return(
    <Container>
      <List.Section>

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

      <List.Accordion title={'Altre Informazioni'}>
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
      </List.Accordion>

        <CustomButton mode="contained" onPress={() => showMode('date')}>
          Mostra DatePicker
        </CustomButton>
        <CustomButton mode="contained" onPress={() => showMode('time')}>
          Mostra TimePicker
        </CustomButton>
        <DateTimeText>Data selezionata: {formatDate(date)}</DateTimeText>
        <DateTimeText>Ora selezionata: {formatTime(time)}</DateTimeText>
        {show && (
          <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
            <DateTimePicker
              testID="dateTimePicker"
              value={mode === 'date' ? date : time}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={{ backgroundColor: '#fff' }}
            />
          </View>
        )}


      </List.Section>
    </Container>
  );
}

const Container = styled(ScrollView)`
  padding: 20px;
  background-color: #f5f5f5;
`;

const Label = styled(Text)`
  font-size: 18px;
  margin: 5px 0;
  color: #6854a4;
`;

const PickerWrapper = styled.View`
  min-width: 150px;
  height: 50px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
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
  color: #333;
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