import React, { useState } from 'react';
import { View, TextInput, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import styled from 'styled-components/native';
import { Button, Text, Snackbar } from 'react-native-paper';
import { aggiungiEsame } from '../../database';
import SQLite from 'react-native-sqlite-storage';

const Container = styled.View`
  padding: 20px;
`;

const Label = styled(Text)`
  font-size: 18px;
  margin: 10px 0;
  color: #333;
`;

const Input = styled(TextInput)`
  height: 40px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 0 10px;
  border-radius: 5px;
  background-color: #fff;
`;

const PickerWrapper = styled.View`
  height: 50px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: #fff;
`;

const CustomButton = styled(Button)`
  margin-top: 20px;
  background-color: #514bf5;
`;

const DateTimeText = styled(Text)`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
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

const FormAggiunta: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [corso_studi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [cfu, setCfu] = useState<string>('');
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('');
  const [voto, setVoto] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');
  const [lode, setLode] = useState<boolean>(false);
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);

  const onToggleSwitch = () => setLode(!lode);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const cfuNumeric = (input: string) => {
    if (/^\d*$/.test(input)) {
      setCfu(input);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
      BigInt(cfu),
      formatDate(date),
      '',
      BigInt(voto),
      lode,
      diario
    );
    setSnackbarVisible(true);
  };

  return (
    <Container>
      <Label>Nome:</Label>
      <Input
        placeholder="Aggiungi il nome esame"
        value={nome}
        onChangeText={setNome}
      />

      <Label>Corso di Studi:</Label>
      <Input
        placeholder="Aggiungi il Corso di Studi dell'esame"
        value={corso_studi}
        onChangeText={setCorsoStudio}
      />

      <Label>Docente:</Label>
      <Input
        placeholder="Aggiungi il Docente dell'esame"
        value={docente}
        onChangeText={setDocente}
      />

      <Label>CFU Esame:</Label>
      <Input
        placeholder="Aggiungi il quantitativo di CFU"
        value={cfu}
        keyboardType="numeric"
        onChangeText={cfuNumeric}
      />

      <Label>Luogo D'Esame:</Label>
      <Input
        placeholder="Aggiungi un Luogo"
        value={luogo}
        onChangeText={setLuogo}
      />

      <Label>Tipologia:</Label>
      <Input
        placeholder="Aggiungi una Tipologia"
        value={tipologia}
        onChangeText={setTipologia}
      />

      <Label>Voto D'Esame:</Label>
      <PickerWrapper>
        <Picker
          selectedValue={voto}
          onValueChange={(itemValue) => setVoto(itemValue)}
        >
          {Array.from({ length: 13 }, (_, i) => i + 18).map((value) => (
            <Picker.Item
              key={value}
              label={value.toString()}
              value={value.toString()}
            />
          ))}
        </Picker>
      </PickerWrapper>

      <Label>Lode:</Label>
      <Switch value={lode} onValueChange={onToggleSwitch} />

      <CustomButton mode="contained" onPress={() => showMode('date')}>
        Mostra DatePicker
      </CustomButton>
      <CustomButton mode="contained" onPress={() => showMode('time')}>
        Mostra TimePicker
      </CustomButton>

      <DateTimeText>Data selezionata: {formatDate(date)}</DateTimeText>
      <DateTimeText>Ora selezionata: {formatTime(date)}</DateTimeText>

      {show && (
        <View style={{ backgroundColor: '#fff', borderRadius: 5 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            style={{ backgroundColor: '#fff' }}
          />
        </View>
      )}

      <Label>Diario:</Label>
      <DiaryInput
        placeholder="Scrivi un Diario"
        value={diario}
        onChangeText={setDiario}
        multiline
        numberOfLines={15}
      />

      <CustomButton mode="contained" onPress={handleSubmit}>
        Inserisci Esame
      </CustomButton>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Esame inserito correttamente
      </Snackbar>
    </Container>
  );
};

export default FormAggiunta;
