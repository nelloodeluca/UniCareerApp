import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Categoria, Esame, ExamsContextType } from './types';
import {
  getEsami,
  deleteEsami,
  updateInsert
} from './utils/operazioni_db/fetch_Esami';
import { prepareDB } from './databaseSetup';
import { getCategorie, deleteCategoria, insertCategoria, modifyCategoria} from './utils/operazioni_db/op_Categoria';

const ExamsContext = createContext<ExamsContextType | undefined>(undefined);

interface ExamsProviderProps {
  children: ReactNode;
}

export const ExamsProvider: React.FC<ExamsProviderProps> = ({ children }) => {
  const [exams, setExams] = useState<Esame[]>([]);
  const [categorie, setCategorie] = useState<Categoria[]>([]);

  const fetchEsami = useCallback(async () => {
    try {
      const esami = await getEsami();
      console.log('Fetched exams:', esami); // Log per debugging
      setExams(esami);
    } catch (error) {
      console.error('Failed to fetch esami from database:', error);
    }
  }, []);

  const fetchCategorie = useCallback(async () => {
    try {
      const categories = await getCategorie();
      console.log('Categorie:', categories);
      setCategorie(categories);
    } catch (error) {
      console.error('Failed to fetch categorie from database:', error);
    }
  }, []);

  useEffect(() => {
    const initializeDatabaseAndFetchExams = async () => {
      try {
        await prepareDB(); // Inizializza il database
        await fetchEsami(); // Esegui la fetch degli esami
        await fetchCategorie();
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
      await fetchEsami();
    } catch (error) {
      console.error('Failed to delete exam from database:', error);
    }
  };


  const aggiungiCategoria = async (categoria: Categoria) => {
    try {
      await insertCategoria(categoria.nome,categoria.colore);
      await fetchCategorie();
      await fetchEsami();
    } catch (error) {
      console.error(
        'Errore nell\'aggiunta della Categoria',
        error
      );
    }
  };

  const aggiornaCategoria = async (categoria: Categoria) => {
    try {
      await modifyCategoria(categoria.id, categoria.nome, categoria.colore);
      await fetchCategorie();
      await fetchEsami();
    } catch (error) {
      console.error(
        'Errore nella modifica di Categoria',
        error
      );
    }
  };

  const eliminaCategoria = async (id: string) => {
    try {
      await deleteCategoria(id);
      await fetchCategorie();
      await fetchEsami();
    } catch (error) {
      console.error(
        'Errore nell\'aggiunta della Categoria',
        error
      );
    }
  };

  const insertOrReplaceExam = async (esame: Esame) => {
    try {
      await updateInsert(esame); // Insert or replace the exam in the database
      await fetchEsami();
    } catch (error) {
      console.error('Failed to insert or replace exam in database:', error);
    }
  };

  const getMaxGrade = () => {
    let maxGrade = 0;
    exams.forEach((exam) => {
      if (exam.voto) {
        const grade = exam.voto;
        if (grade > maxGrade) {
          maxGrade = grade;
        }
      }
    });

    return maxGrade;
  };

  const getMinGrade = () => {
    let minGrade = Number.MAX_VALUE;
    exams.forEach((exam) => {
      if (exam.voto) {
        const grade = exam.voto; // Consider lode as 31 for min calculation
        if (grade < minGrade) {
          minGrade = grade;
        }
      }
    });

    return minGrade === Number.MAX_VALUE ? 0 : minGrade; // Return 0 if no grades are found
  };

  const getArithmeticMean = () => {
    const totalGrades = exams.reduce((sum, exam) => {
      if (exam.voto) {
        return sum + exam.voto;
      }
      return sum;
    }, 0);
    const count = exams.reduce(
      (count, exam) => (exam.voto ? count + 1 : count),
      0
    );
    const mean = count === 0 ? 0 : totalGrades / count;
    return parseFloat(mean.toFixed(2)); // Ensure 2 decimal places
  };

  const getWeightedMean = () => {
    let totalWeightedGrades = 0;
    let totalCredits = 0;
    exams.forEach((exam) => {
      if (exam.voto && exam.CFU) {
        const grade = exam.voto; // Consider lode as 30 for weighted mean calculation
        totalWeightedGrades += grade * exam.CFU;
        totalCredits += exam.CFU;
      }
    });
    const mean = totalCredits === 0 ? 0 : totalWeightedGrades / totalCredits;
    return parseFloat(mean.toFixed(2)); // Ensure 2 decimal places
  };

  const getGraduationGrade = () => {
    const weightedMean = getWeightedMean();
    const graduationGrade = weightedMean * 4.1 - 7.8; // Adjust factor as needed
    return Math.round(graduationGrade);
  };

  const getExamsSummary = () => {
    let examsTaken = 0;
    let totalExams = exams.length;
    let obtainedCredits = 0;
    let totalCredits = 0;

    exams.forEach((exam) => {
      if (exam.CFU) {
        totalCredits += exam.CFU;
        if (exam.voto) {
          examsTaken += 1;
          obtainedCredits += exam.CFU;
        }
      }
    });

    return {
      examsTaken,
      totalExams,
      obtainedCredits,
      totalCredits,
    };
  };

  const getGrades = () => {
    return exams
      .filter((exam) => exam.voto !== undefined && exam.voto > 0)
      .map((exam) => exam.voto);
  };

  return (
    <ExamsContext.Provider
      value={{
        exams,
        categorie,
        deleteExam,
        aggiungiCategoria,
        aggiornaCategoria,
        eliminaCategoria,
        insertOrReplaceExam,
        getMaxGrade,
        getMinGrade,
        getArithmeticMean,
        getWeightedMean,
        getGraduationGrade,
        getExamsSummary,
        getGrades,
      }}
    >
      {children}
    </ExamsContext.Provider>
  );
};

export default ExamsContext;
