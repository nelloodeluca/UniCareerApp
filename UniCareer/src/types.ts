import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  Statistica: undefined;
  Libretto: undefined;
  Aggiunta: { screen: keyof AggiuntaNavParams; params?: any };
};

export type LibrettoNavParams = {
  CarrieraEsami: undefined;
};

export type AggiuntaNavParams = {
  FormEsame: { esame: Esame };
  FormCategorie: undefined;
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
  categorie: Categoria[];
  deleteExam: (id: string) => void;
  addCategory: (category: Categoria) => void;
  updateCategory: (category: Categoria) => void;
  getMaxGrade: () => any;
  getMinGrade: () => any;
  getArithmeticMean: () => any;
  getWeightedMean: () => any;
  getGraduationGrade: () => any;
  getExamsSummary: () => any;
  getGrades: () => any;
  insertOrReplaceExam: (exam: any) => void;
}

export interface DashboardProps {
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export interface CalendarDay {
  dateString: string;
}
