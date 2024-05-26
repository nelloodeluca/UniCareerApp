import React, { useState, useEffect } from 'react';
import { View, TextInput, Switch, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text, Snackbar, List } from 'react-native-paper';
import { aggiungiEsame } from '../../database';
import SQLite from 'react-native-sqlite-storage';
import { Esame } from '../types';
import LabelInput from './aggiunta/LabelInput';
import styled from 'styled-components/native';
import { useFocusEffect } from '@react-navigation/native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 1,
  },
  subheader: {
    fontSize: 26,
    textAlign: 'center',
    paddingTop: '8%',
    color: '#6854a4',
  },
  accordion: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
  },
  iconButton: {
    backgroundColor: '#6854a4',
    marginRight: 10,
  },
});

const FormAggiunta: React.FC<{ esame?: Esame }> = ({ esame }) => {
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
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [infoAggExpanded, setInfoAggExpanded] = useState<boolean>(false);
  const [votoExpanded, setVotoExpanded] = useState<boolean>(false);
  const [dataExpanded, setDataExpanded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
      setIsEditing(true);
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
        setIsEditing(false);
      };
    }, [])
  );

  const onToggleSwitch = () => setLode(!lode);

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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-GB', {
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
    <Container>
      <List.Section>
        <List.Subheader style={styles.subheader}>Aggiungi un Esame!</List.Subheader>

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

        <View style={styles.row}>
          <Label>CFU:</Label>
          <PickerWrapper>
            <Picker
              selectedValue={cfu}
              onValueChange={(itemValue) => setCfu(itemValue)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
                <Picker.Item
                  key={value}
                  label={value.toString()}
                  value={value.toString()}
                />
              ))}
            </Picker>
          </PickerWrapper>
        </View>

        <List.Accordion
          title="Informazioni Aggiuntive"
          expanded={infoAggExpanded}
          onPress={() => setInfoAggExpanded(!infoAggExpanded)}
          style={styles.accordion}
        >
          <LabelInput
            label="Docente:"
            placeholder="Aggiungi il Docente dell'esame"
            value={docente}
            onChangeText={setDocente}
          />
          <LabelInput
            label="Luogo D'Esame:"
            placeholder="Aggiungi un Luogo"
            value={luogo}
            onChangeText={setLuogo}
          />
          <LabelInput
            label="Tipologia:"
            placeholder="Aggiungi una Tipologia"
            value={tipologia}
            onChangeText={setTipologia}
          />
        </List.Accordion>

        <List.Accordion
          title="Voto"
          expanded={votoExpanded}
          onPress={() => setVotoExpanded(!votoExpanded)}
          style={styles.accordion}
        >
          <View style={styles.row}>
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
          </View>

          <Label>Lode:</Label>
          <Switch value={lode} onValueChange={onToggleSwitch} />
        </List.Accordion>

        <List.Accordion
          title="Data"
          expanded={dataExpanded}
          onPress={() => setDataExpanded(!dataExpanded)}
          style={styles.accordion}
        >
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
        </List.Accordion>

        <List.Subheader style={styles.subheader}>Diario</List.Subheader>
        <DiaryInput
          placeholder="Scrivi un Diario"
          value={diario}
          onChangeText={setDiario}
          multiline
          numberOfLines={15}
        />
      </List.Section>

      <CustomButton mode="contained" onPress={handleSubmit}>
        {isEditing ? 'Modifica Esame' : 'Inserisci Esame'}
      </CustomButton>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        Esame {isEditing ? 'modificato' : 'inserito'} correttamente
      </Snackbar>
    </Container>
  );
};

export default FormAggiunta;
