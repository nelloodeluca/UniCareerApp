import { Esame } from '../types';

export const getExamsWithGrades = (exams: Esame[]): Esame[] => {
  return exams.filter((exam) => exam.voto !== null);
};

export const getExamsWithoutGrades = (exams: Esame[]): Esame[] => {
  return exams.filter((exam) => exam.voto === null);
};
