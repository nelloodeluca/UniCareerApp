
import React from 'react';
import {View, Text} from 'react-native';

type props = {
  a: String
  b: string;
  c: string;
}

function RettangoloTesto(props: props){
  return (
      <View  style={{
        width: '45%' ,
        height: '20%' ,
        backgroundColor: 'grey', 
        padding: 30,
        margin: 10,
        alignItems: 'center', 
        justifyContent:'center',
      }}> 

        <Text> {props.a} </Text>
        <Text> {props.b}/{props.c} </Text>
    </View>
  );
};

export default RettangoloTesto;
