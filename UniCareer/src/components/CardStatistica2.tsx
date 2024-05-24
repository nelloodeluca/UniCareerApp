import * as React from 'react';
import { Card, Text, ProgressBar, MD3Colors} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const CardStatistica2 = () => (
  <Card style={styles.card2}>

    <Card.Content>
      <Text variant="titleLarge"> Voto Medio</Text>
      <Text variant="titleLarge"> 180/220</Text>
    </Card.Content>

  </Card>
);

const styles = StyleSheet.create({
    card2: {
        width: '45%',
        height: '20%',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 'auto',
        alignItems:'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
  });

export default CardStatistica2;