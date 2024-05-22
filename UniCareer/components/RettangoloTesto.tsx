
import React from 'react';
import {View, Text} from 'react-native';

function RettangoloTesto(){
  return (
    <View
      style={{
        flexDirection: 'row',
        
        padding: 20,
      }}> 
      <View style={{backgroundColor: 'grey', flex: 0.5}}> 
        <Text> $text1 </Text><Text> $text2</Text>
      </View>
    </View>
  );
};

export default RettangoloTesto;