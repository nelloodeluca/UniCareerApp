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
  luogo?: string;
  tipologia?: string;
  docente?: string;
  voto?: number;
  lode?: boolean;
  diario?: string;
  categorie: Categoria[];
};

export interface ExamsContextType {
  exams: Esame[];
  deleteExam: (id: string) => void;
  getMaxGrade: () => any;
  getMinGrade: () => any;
  getArithmeticMean: () => any;
  getWeightedMean: () => any;
  getGraduationGrade: () => any;
  getExamsSummary: () => any;
  getGrades: () => any;
}

export interface DettagliEsameProps {
  route: RouteProp<RootStackParamList, 'DettagliEsame'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export interface DashboardProps {
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export interface CalendarDay {
  dateString: string;
}
