import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Libretto_EsamiDati: undefined;
  Libretto_EsamiNonDati: undefined;
  EsameDettagli: { esame: Esame };
};

export interface Esame {
  id: string;
  nome: string;
  cfu: number;
  data: string;
  categoria: string;
}

export interface DettagliEsameProps {
  route: RouteProp<RootStackParamList, 'EsameDettagli'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
