import * as React from 'react';
import { Card, Text, ProgressBar, MD3Colors} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const CardStatistica = () => (
  <Card style={styles.card}>

    <Card.Content>
      <Text variant="titleLarge"> Completate 180/220 attivitá</Text>
      <Text> completamento </Text>
    </Card.Content>

    <ProgressBar progress={0.8} color={MD3Colors.error50} />

  </Card>
);

const styles = StyleSheet.create({
    card: {
        width: '95%',
        height: '20%',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 'auto',
        alignItems:'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    
    bar: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });

export default CardStatistica;
