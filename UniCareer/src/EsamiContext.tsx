import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Esame, ExamsContextType } from './types';
import { getEsami, deleteEsami } from './utils/operazioni_db/fetch_Esami';
import { prepareDB } from './databaseSetup';

const ExamsContext = createContext<ExamsContextType | undefined>(undefined);

interface ExamsProviderProps {
  children: ReactNode;
}

export const ExamsProvider: React.FC<ExamsProviderProps> = ({ children }) => {
  const [exams, setExams] = useState<Esame[]>([]);

  const fetchEsami = useCallback(async () => {
    try {
      const esami = await getEsami();
      console.log('Fetched exams:', esami); // Log per debugging
      setExams(esami);
    } catch (error) {
      console.error('Failed to fetch esami from database:', error);
    }
  }, []);

  useEffect(() => {
    const initializeDatabaseAndFetchExams = async () => {
      try {
        await prepareDB(); // Inizializza il database
        await fetchEsami(); // Esegui la fetch degli esami
      } catch (error) {
        console.error(
          'Error during database initialization or fetching exams:',
          error
        );
      }
    };

    // Funzione auto-esecutiva per gestire la promise
    (async () => {
      await initializeDatabaseAndFetchExams();
    })();
  }, [fetchEsami]);

  const deleteExam = async (id: string) => {
    try {
      await deleteEsami(id); // Assicurati di avere questa funzione che elimina l'esame dal database
      setExams((prevExams) => {
        const newExams = prevExams.filter((exam) => exam.id !== id);
        console.log('Updated exams after deletion:', newExams); // Log per debugging
        return newExams;
      });
    } catch (error) {
      console.error('Failed to delete exam from database:', error);
    }
  };

  return (
    <ExamsContext.Provider value={{ exams, deleteExam }}>
      {children}
    </ExamsContext.Provider>
  );
};

export default ExamsContext;
