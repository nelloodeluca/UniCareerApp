import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  Statistica: undefined;
  Libretto: undefined;
  Aggiunta: { esame?: Esame };
  DettagliEsame: { esame: Esame };
};

export type Categoria = {
  id: string;
  nome: string;
  colore: string;
};

export type Esame = {
  id: string;
  nome: string;
  corsoDiStudi: string;
  CFU: number;
  data: string;
  ora: string;
  luogo: string;
  tipologia: string;
  docente: string;
  voto?: string;
  categorie: Categoria[];
};

export interface DettagliEsameProps {
  route: RouteProp<RootStackParamList, 'DettagliEsame'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}
