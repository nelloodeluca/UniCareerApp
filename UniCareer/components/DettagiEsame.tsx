import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function EsameDettagli({ route, navigation }) {
  const { esame } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{esame.nome}</Text>
      <Text>CFU: {esame.cfu}</Text>
      <Text>Data: {esame.data}</Text>
      <Text>Categoria: {esame.categoria === 'colorato' ? 'Colorato' : 'Vuoto'}</Text>
      <Button title="Torna indietro" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default EsameDettagli;
