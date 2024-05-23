import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Badge } from 'react-native-paper';

const esami = [
  { id: '1', nome: 'Matematica', cfu: 6, data: '2024-06-15', categoria: 'colorato' },
  { id: '2', nome: 'Fisica', cfu: 8, data: '2024-07-20', categoria: 'vuoto' },
  // Aggiungi altri esami qui
];

function Libretto_EsamiDati({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={esami}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('EsameDettagli', { esame: item })}>
            <Card style={styles.card}>
              <View style={styles.cardContent}>
                <View>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <Text>CFU: {item.cfu}</Text>
                  <Text>Data: {item.data}</Text>
                </View>
                <Badge style={item.categoria === 'colorato' ? styles.badgeColorato : styles.badgeVuoto} />
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  card: {
    marginBottom: 10,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  badgeColorato: {
    backgroundColor: 'blue',
  },
  badgeVuoto: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default Libretto_EsamiDati;