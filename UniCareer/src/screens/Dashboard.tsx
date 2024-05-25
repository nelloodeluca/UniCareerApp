import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, addDays } from 'date-fns';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Esame, CalendarDay, DashboardProps } from '../types';
import CalendarComponent from '../components/dashboard/CalendarComponent';
import ViewModeButtons from '../components/dashboard/ViewModeButtons';
import MonthPicker from '../components/dashboard/MonthPicker';
import ExamsList from '../components/dashboard/ExamsList';
import ImminentExams from '../components/dashboard/ImminentExams';
import TodayExams from '../components/dashboard/TodayExams';
import { getEsami } from '../utils/operazioni_db/fetch_Esami';

const months = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

const getWeeksInMonth = (month: number, year: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endOfLastWeek = endOfWeek(endOfMonth(firstDayOfMonth), { weekStartsOn: 1 });

  const weeks = [];
  let start = startOfFirstWeek;

  while (start <= endOfLastWeek) {
    const end = endOfWeek(start, { weekStartsOn: 1 });
    weeks.push({
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });
    start = addDays(start, 7);
  }

  return weeks;
};

function Dashboard({ route, navigation }: DashboardProps) {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysAhead, setDaysAhead] = useState<string>('7');
  const [exams, setExams] = useState<{ [key: string]: Esame[] }>({});
  const windowWidth = Dimensions.get('window').width;
  const year = currentDate.getFullYear();
  const todayString = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  const weeks = getWeeksInMonth(selectedMonth, year);

  useEffect(() => {
    const fetchEsami = async () => {
      try {
        const fetchedExams = await getEsami();
        const examsByDate = fetchedExams.reduce((acc: { [key: string]: Esame[] }, exam: Esame) => {
          const examDate = format(new Date(exam.data), 'yyyy-MM-dd');
          if (!acc[examDate]) acc[examDate] = [];
          acc[examDate].push(exam);
          return acc;
        }, {});
        setExams(examsByDate);
      } catch (error) {
        console.error('Failed to fetch esami from database:', error);
      }
    };

    fetchEsami();
  }, []);

  const markedDates = useMemo(() => {
    const marks: {
      [date: string]: {
        dots: Array<{ color: string }>;
        selected: boolean;
        selectedColor: string;
      };
    } = {};

    Object.keys(exams).forEach((date) => {
      marks[date] = {
        dots: exams[date].map(() => ({ color: 'blue' })),
        selected: date === selectedDay,
        selectedColor: date === selectedDay ? 'lightblue' : 'white',
      };
    });

    if (selectedDay && !marks[selectedDay]) {
      marks[selectedDay] = {
        dots: [],
        selected: true,
        selectedColor: 'lightblue',
      };
    } else if (selectedDay && marks[selectedDay]) {
      marks[selectedDay].selected = true;
      marks[selectedDay].selectedColor = 'lightblue';
    }

    return marks;
  }, [exams, selectedDay]);

  const onDayPress = (day: CalendarDay) => {
    setSelectedDay(day.dateString);
  };

  const onMonthChange = (month: { year: number; month: number }) => {
    setCurrentDate(new Date(month.year, month.month - 1, 1));
    setSelectedMonth(month.month - 1);
    handleClearSelection(); // Clear the selected day when the month changes
  };

  const getMonthlyExams = () => {
    const monthString = `${year}-${String(selectedMonth + 1).padStart(2, '0')}`;
    return Object.keys(exams)
      .filter((date) => date.startsWith(monthString))
      .map((date) => ({ date, exams: exams[date] }));
  };

  const getWeeklyExams = () => {
    const week = weeks[selectedWeekIndex];
    const startOfTargetWeek = new Date(`${week.start}T00:00:00`);
    const endOfTargetWeek = new Date(`${week.end}T23:59:59`);

    const interval = { start: startOfTargetWeek, end: endOfTargetWeek };
    const daysInInterval = eachDayOfInterval(interval).map((date) => format(date, 'yyyy-MM-dd'));

    return daysInInterval.flatMap((date) => (exams[date] || []).map((exam) => ({ ...exam, date })));
  };

  const getImminentExams = () => {
    const targetDate = addDays(new Date(), parseInt(daysAhead) || 7);
    return Object.keys(exams)
      .filter((date) => new Date(date) <= targetDate && new Date(date) >= new Date())
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(0, 3)
      .flatMap((date) => (exams[date] || []).map((exam) => ({ ...exam, date })));
  };

  const monthlyExams = getMonthlyExams();
  const weeklyExams = getWeeklyExams();
  const imminentExams = getImminentExams();

  const handleClearSelection = () => {
    setSelectedDay('');
  };

  const handleViewModeChange = (mode: 'monthly' | 'weekly') => {
    setViewMode(mode);
    handleClearSelection();
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setCurrentDate(new Date(year, month, 1));
    handleClearSelection(); // Clear the selected day when the month changes
  };

  const calendarTheme = {
    selectedDayBackgroundColor: 'orange',
    selectedDayTextColor: 'white',
    todayTextColor: 'red',
    dayTextColor: 'black',
    textDisabledColor: 'grey',
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <CalendarComponent
        onDayPress={onDayPress}
        markedDates={markedDates}
        calendarTheme={calendarTheme}
        onMonthChange={onMonthChange}
        windowWidth={windowWidth}
      />
      <ViewModeButtons viewMode={viewMode} handleViewModeChange={handleViewModeChange} />
      <MonthPicker months={months} selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      {selectedDay ? (
        <ExamsList title={`Esami del ${selectedDay}:`} exams={exams[selectedDay] || []} />
      ) : viewMode === 'monthly' ? (
        <ExamsList title="Esami di questo mese:" exams={monthlyExams.flatMap(({ exams }) => exams)} />
      ) : (
        <ExamsList title="Esami di questa settimana:" exams={weeklyExams} selectedWeekIndex={selectedWeekIndex} weeks={weeks} setSelectedWeekIndex={setSelectedWeekIndex} />
      )}
      <ImminentExams daysAhead={daysAhead} setDaysAhead={setDaysAhead} imminentExams={imminentExams} />
      {exams[todayString] && exams[todayString].length > 0 && (
        <TodayExams todayExams={exams[todayString]} />
      )}
    </ScrollView>
  );
}

export default Dashboard;
