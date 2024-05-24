import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormAggiunta: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [corso_studi, setCorsoStudio] = useState<string>('');
  const [docente, setDocente] = useState<string>('');
  const [cfu, setCfu] = useState<string>('');
  const [luogo, setLuogo] = useState<string>('');
  const [tipologia, setTipologia] = useState<string>('');
  const [voto, setVoto] = useState<string>('');
  const [lode, setLode] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [diario, setDiario] = useState<string>('');

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
    return date.toLocaleDateString('en-GB'); // Formatta la data come DD/MM/YYYY
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }); // Formatta l'ora come HH:MM
  };

  return (
    <View className="p-5">
      <Text className="text-lg my-2">Nome:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi il nome esame"
        value={nome}
        onChangeText={setNome}
      />

      <Text className="text-lg my-2">Corso di Studi:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi il Corso di Studi dell'esame"
        value={corso_studi}
        onChangeText={setCorsoStudio}
      />

      <Text className="text-lg my-2">Docente:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi il Docente dell'esame"
        value={docente}
        onChangeText={setDocente}
      />

      <Text className="text-lg my-2">CFU Esame:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi il quantitativo di CFU"
        value={cfu}
        keyboardType="numeric"
        onChangeText={cfuNumeric}
      />

      <Text className="text-lg my-2">Luogo D'Esame:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi un Luogo"
        value={luogo}
        onChangeText={setLuogo}
      />

      <Text className="text-lg my-2">Tipologia:</Text>
      <TextInput
        className="h-10 border border-gray-400 mb-4 px-2"
        placeholder="Aggiungi una Tipologia"
        value={tipologia}
        onChangeText={setTipologia}
      />

      <Text className="text-lg my-2">Voto D'Esame:</Text>
      <Picker
        selectedValue={voto}
        className="h-12 w-full mb-4"
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

      <Text className="text-lg my-2">Lode:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#8192ff' }}
        thumbColor={lode ? '#514bf5' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={setLode}
        value={lode}
      />

      <View>
        <Button onPress={() => showMode('date')} title="Mostra DatePicker" />
      </View>
      <View className="mt-5">
        <Button onPress={() => showMode('time')} title="Mostra TimePicker" />
      </View>
      <Text className="mt-5">Data selezionata: {formatDate(date)}</Text>
      <Text>Ora selezionata: {formatTime(date)}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Text className="text-lg my-2">Diario:</Text>
      <TextInput
        className="h-40 border border-gray-400 mb-4 px-2"
        placeholder="Scrivi un Diario"
        value={diario}
        onChangeText={setDiario}
        multiline
        numberOfLines={15}
        textAlignVertical="top" // ensures the text starts at the top
      />
    </View>
  );
};

export default FormAggiunta;
