import { View, Text } from "react-native"
import RettangoloTesto from "../components/RettangoloTesto"

export default function Statistica() {
    return( 
        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Statistica</Text>
            <RettangoloTesto></RettangoloTesto>
        </View>
    );
}


