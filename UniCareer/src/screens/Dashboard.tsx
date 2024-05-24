import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { CalendarList } from 'react-native-calendars';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns';

// Interfaccia per gli esami
interface Exam {
  name: string;
}

// Interfaccia per mappare le date agli esami
interface ExamSchedule {
  [date: string]: Exam[];
}

// Interfaccia per l'oggetto del giorno selezionato da CalendarList
interface CalendarDay {
  dateString: string;
}

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
  const endOfLastWeek = endOfWeek(endOfMonth(firstDayOfMonth), {
    weekStartsOn: 1,
  });

  const weeks = [];
  let start = startOfFirstWeek;

  while (start <= endOfLastWeek) {
    const end = endOfWeek(start, { weekStartsOn: 1 });
    weeks.push({
      start: format(start, 'yyyy-MM-dd'),
      end: format(end, 'yyyy-MM-dd'),
    });
    start = new Date(start.setDate(start.getDate() + 7));
  }

  return weeks;
};

function Dashboard() {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth()
  );
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysAhead, setDaysAhead] = useState<string>('7');
  const windowWidth = Dimensions.get('window').width;
  const year = currentDate.getFullYear();
  const todayString = format(new Date(), 'yyyy-MM-dd');

  useEffect(() => {
    setSelectedMonth(currentDate.getMonth());
  }, [currentDate]);

  const weeks = getWeeksInMonth(selectedMonth, year);

  const exams: ExamSchedule = {
    '2024-05-23': [{ name: 'Matematica' }, { name: 'Chimica' }],
    '2024-05-24': [{ name: 'Fisica' }],
    '2024-05-25': [{ name: 'Storia' }, { name: 'Inglese' }],
  };

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

    // Highlight the selected day even if it has no exams
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
    const daysInInterval = eachDayOfInterval(interval).map((date) =>
      format(date, 'yyyy-MM-dd')
    );

    return daysInInterval.flatMap((date) =>
      (exams[date] || []).map((exam) => ({ ...exam, date }))
    );
  };

  const getImminentExams = () => {
    const targetDate = addDays(new Date(), parseInt(daysAhead) || 7);
    const imminentExams = Object.keys(exams)
      .filter(
        (date) => new Date(date) <= targetDate && new Date(date) >= new Date()
      )
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(0, 3)
      .flatMap((date) =>
        (exams[date] || []).map((exam) => ({ ...exam, date }))
      );
    return imminentExams;
  };

  const monthlyExams = getMonthlyExams();
  const weeklyExams = getWeeklyExams();
  const imminentExams = getImminentExams();

  const handleClearSelection = () => {
    setSelectedDay('');
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
      <CalendarContainer>
        <CalendarList
          onDayPress={onDayPress}
          markedDates={markedDates}
          markingType={'multi-dot'}
          theme={calendarTheme}
          horizontal={true}
          pagingEnabled={true}
          pastScrollRange={24}
          futureScrollRange={24}
          calendarWidth={windowWidth - 20}
          onVisibleMonthsChange={(months) => {
            const month = months[0];
            onMonthChange({ year: month.year, month: month.month });
          }}
        />
      </CalendarContainer>
      <ButtonsContainer>
        <Button
          active={viewMode === 'monthly'}
          onPress={() => {
            setViewMode('monthly');
            handleClearSelection();
          }}
        >
          <ButtonText>Visualizzazione Mensile</ButtonText>
        </Button>
        <Button
          active={viewMode === 'weekly'}
          onPress={() => {
            setViewMode('weekly');
            handleClearSelection();
          }}
        >
          <ButtonText>Visualizzazione Settimanale</ButtonText>
        </Button>
      </ButtonsContainer>
      <PickerContainer>
        <Picker
          selectedValue={selectedMonth}
          onValueChange={(itemValue: number) => setSelectedMonth(itemValue)}
        >
          {months.map((month, index) => (
            <Picker.Item key={index} label={month} value={index} />
          ))}
        </Picker>
      </PickerContainer>
      {selectedDay ? (
        <ExamsContainer>
          <ExamsTitle>Esami del giorno {selectedDay}:</ExamsTitle>
          {exams[selectedDay]?.map((exam, index) => (
            <ExamText key={index}>{exam.name}</ExamText>
          )) || <Text>Nessun esame per questo giorno</Text>}
        </ExamsContainer>
      ) : viewMode === 'monthly' ? (
        <ExamsContainer>
          <ExamsTitle>Questo mese hai questi esami:</ExamsTitle>
          {monthlyExams.map(({ date, exams }) => (
            <View key={date}>
              <ExamDate>
                {date.split('-')[2]}/{date.split('-')[1]}
              </ExamDate>
              {exams.map((exam, index) => (
                <ExamText key={index}>{exam.name}</ExamText>
              ))}
            </View>
          ))}
        </ExamsContainer>
      ) : (
        <ExamsContainer>
          <ExamsTitle>Nella settimana selezionata hai questi esami:</ExamsTitle>
          <Picker
            selectedValue={selectedWeekIndex}
            onValueChange={(itemValue: number) =>
              setSelectedWeekIndex(itemValue)
            }
          >
            {weeks.map((week, index) => (
              <Picker.Item
                key={index}
                label={`Settimana ${index + 1}: ${week.start.split('-')[2]}/${
                  week.start.split('-')[1]
                } - ${week.end.split('-')[2]}/${week.end.split('-')[1]}`}
                value={index}
              />
            ))}
          </Picker>
          {weeklyExams.length > 0 ? (
            weeklyExams.map((exam, index) => (
              <ExamText key={index}>{`${exam.date.split('-')[2]}/${
                exam.date.split('-')[1]
              }: ${exam.name}`}</ExamText>
            ))
          ) : (
            <Text>Nessun esame per questa settimana</Text>
          )}
        </ExamsContainer>
      )}
      <ImminentExamsContainer>
        <DaysAheadContainer>
          <Text>Esami imminenti entro giorni:</Text>
          <DaysAheadInput
            keyboardType="numeric"
            value={daysAhead}
            onChangeText={(text) => setDaysAhead(text)}
          />
        </DaysAheadContainer>
        <ExamsContainer>
          <ExamsTitle>Prossimi 3 esami imminenti:</ExamsTitle>
          {imminentExams.length > 0 ? (
            imminentExams.map((exam, index) => (
              <ExamText key={index}>{`${exam.date.split('-')[2]}/${
                exam.date.split('-')[1]
              }: ${exam.name}`}</ExamText>
            ))
          ) : (
            <Text>Nessun esame imminente</Text>
          )}
        </ExamsContainer>
      </ImminentExamsContainer>
      {exams[todayString] && exams[todayString].length > 0 && (
        <TodayExamsContainer>
          <TodayExamsTitle>Esami di oggi:</TodayExamsTitle>
          {exams[todayString].map((exam, index) => (
            <TodayExamText key={index}>{exam.name}</TodayExamText>
          ))}
          <EncouragementText>
            Buona fortuna per i tuoi esami di oggi!
          </EncouragementText>
          <InspirationalQuoteContainer>
            <InspirationalQuote>
              "Il successo non è la chiave della felicità. La felicità è la
              chiave del successo. Se ami ciò che fai, avrai successo."
            </InspirationalQuote>
          </InspirationalQuoteContainer>
        </TodayExamsContainer>
      )}
    </ScrollView>
  );
}

const CalendarContainer = styled.View`
  margin-top: 10px;
  border-width: 10px;
  border-color: grey;
  border-radius: 20px;
  overflow: hidden;
  background-color: white;
  align-self: center;
  width: ${Dimensions.get('window').width - 20}px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 20px;
`;

const Button = styled.TouchableOpacity<{ active: boolean }>`
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 10px;
  background-color: ${({ active }) => (active ? 'orange' : 'lightgrey')};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: black;
`;

const PickerContainer = styled.View`
  margin-horizontal: 10px;
`;

const ExamsContainer = styled.View`
  padding: 20px;
  background-color: lightgrey;
  border-radius: 20px;
  margin-horizontal: 10px;
  margin-top: 20px;
`;

const ExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ExamDate = styled.Text`
  font-weight: bold;
  margin-top: 10px;
`;

const ExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const ImminentExamsContainer = styled.View`
  padding: 20px;
  margin-horizontal: 10px;
  margin-top: 20px;
`;

const DaysAheadContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const DaysAheadInput = styled.TextInput`
  height: 40px;
  border-color: gray;
  border-width: 1px;
  margin-left: 10px;
  padding-horizontal: 10px;
  flex: 1;
`;

const TodayExamsContainer = styled.View`
  padding: 20px;
  background-color: #dff0d8;
  border-radius: 20px;
  margin-horizontal: 10px;
  margin-top: 20px;
  align-items: center;
`;

const TodayExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const TodayExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #34495e;
`;

const EncouragementText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: #27ae60;
`;

const InspirationalQuoteContainer = styled.View`
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const InspirationalQuote = styled.Text`
  font-size: 16px;
  font-style: italic;
  text-align: center;
  color: #7f8c8d;
`;

export default Dashboard;
