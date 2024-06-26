import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  Statistica: undefined;
  Libretto: { screen: keyof LibrettoNavParams; params?: any };
  Aggiunta: { screen: keyof AggiuntaNavParams; params?: any };
};

export type LibrettoNavParams = {
  EsamiDati: undefined;
  EsamiNonDati: undefined;
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
  voto?: number | null;
  lode?: boolean;
  diario?: string;
  categorie: Categoria[];
};

export interface ExamsContextType {
  exams: Esame[];
  categorie: Categoria[];
  fetchEsami: () => void;
  aggiungiEsame: (esame: Esame) => void;
  aggiornaEsame: (esame: Esame) => void;
  deleteExam: (id: string) => void;
  aggiungiCategoria: (category: Categoria) => void;
  aggiornaCategoria: (exCat: Categoria, category: Categoria) => void;
  eliminaCategoria: (id: string, colore: string) => void;
  getMaxGrade: () => any;
  getMinGrade: () => any;
  getArithmeticMean: () => any;
  getWeightedMean: () => any;
  getGraduationGrade: () => any;
  getExamsSummary: () => any;
  getGrades: () => any;
}

export interface DashboardProps {
  route: RouteProp<RootStackParamList, 'Dashboard'>;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export interface CalendarDay {
  dateString: string;
}
