import React, { useState, useMemo, useEffect } from 'react';
import { ScrollView, Dimensions, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { CalendarList } from 'react-native-calendars';
import { Card, Button as PaperButton, TextInput } from 'react-native-paper';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns';

interface Exam {
  name: string;
}

interface ExamSchedule {
  [date: string]: Exam[];
}

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
    '2024-05-23': [{ name: 'Matematica 📚' }, { name: 'Chimica 🔬' }],
    '2024-05-24': [{ name: 'Fisica 🌌' }],
    '2024-05-25': [{ name: 'Storia 📜' }, { name: 'Inglese 🇬🇧' }],
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
    const daysInInterval = eachDayOfInterval(interval).map((date) =>
      format(date, 'yyyy-MM-dd')
    );

    return daysInInterval.flatMap((date) =>
      (exams[date] || []).map((exam) => ({ ...exam, date }))
    );
  };

  const getImminentExams = () => {
    const targetDate = addDays(new Date(), parseInt(daysAhead) || 7);
    return Object.keys(exams)
      .filter(
        (date) => new Date(date) <= targetDate && new Date(date) >= new Date()
      )
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(0, 3)
      .flatMap((date) =>
        (exams[date] || []).map((exam) => ({ ...exam, date }))
      );
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
      <View>
        <Card style={{ marginTop: 10, marginHorizontal: 10, borderRadius: 10 }}>
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
        </Card>
      </View>
      <View>
        <ButtonsContainer>
          <PaperButton
            mode={viewMode === 'monthly' ? 'contained' : 'outlined'}
            onPress={() => handleViewModeChange('monthly')}
            style={{ marginHorizontal: 5 }}
          >
            Mensile 📅
          </PaperButton>
          <PaperButton
            mode={viewMode === 'weekly' ? 'contained' : 'outlined'}
            onPress={() => handleViewModeChange('weekly')}
            style={{ marginHorizontal: 5 }}
          >
            Settimanale 📆
          </PaperButton>
        </ButtonsContainer>
        <PickerContainer>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <Picker.Item key={index} label={month} value={index} />
            ))}
          </Picker>
        </PickerContainer>
      </View>
      {selectedDay ? (
        <View>
          <Card style={{ margin: 10, padding: 10 }}>
            <ExamsTitle>Esami del {selectedDay}:</ExamsTitle>
            {exams[selectedDay]?.map((exam, index) => (
              <ExamText key={index}>{exam.name}</ExamText>
            )) || <Text>Nessun esame</Text>}
          </Card>
        </View>
      ) : viewMode === 'monthly' ? (
        <View>
          <Card style={{ margin: 10, padding: 10 }}>
            <ExamsTitle>Esami di questo mese:</ExamsTitle>
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
          </Card>
        </View>
      ) : (
        <View>
          <Card style={{ margin: 10, padding: 10 }}>
            <ExamsTitle>Esami di questa settimana:</ExamsTitle>
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
          </Card>
        </View>
      )}
      <View>
        <Card style={{ margin: 10, padding: 10 }}>
          <DaysAheadContainer>
            <Text>Esami imminenti:</Text>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={daysAhead}
              onChangeText={(text) => setDaysAhead(text)}
              style={{ marginLeft: 10, flex: 1 }}
            />
          </DaysAheadContainer>
          <ExamsTitle>Prossimi esami:</ExamsTitle>
          {imminentExams.length > 0 ? (
            imminentExams.map((exam, index) => (
              <ExamText key={index}>{`${exam.date.split('-')[2]}/${
                exam.date.split('-')[1]
              }: ${exam.name}`}</ExamText>
            ))
          ) : (
            <Text>Nessun esame imminente</Text>
          )}
        </Card>
      </View>
      {exams[todayString] && exams[todayString].length > 0 && (
        <View>
          <TodayExamsCard
            style={{ margin: 10, padding: 10, backgroundColor: '#dff0d8' }}
          >
            <TodayExamsTitle>Esami di oggi:</TodayExamsTitle>
            {exams[todayString].map((exam, index) => (
              <TodayExamText key={index}>{exam.name}</TodayExamText>
            ))}
            <EncouragementText>
              Buona fortuna per i tuoi esami di oggi! 🍀
            </EncouragementText>
            <InspirationalQuoteContainer>
              <InspirationalQuote>
                "Il successo non è la chiave della felicità. La felicità è la
                chiave del successo. Se ami ciò che fai, avrai successo. 🌟"
              </InspirationalQuote>
            </InspirationalQuoteContainer>
          </TodayExamsCard>
        </View>
      )}
    </ScrollView>
  );
}

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 15px;
`;

const PickerContainer = styled.View`
  margin-horizontal: 10px;
`;

const ExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ExamDate = styled.Text`
  font-weight: bold;
  margin-top: 5px;
`;

const ExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const DaysAheadContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const TodayExamsCard = styled(Card)`
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
  text-align: center;
`;

const EncouragementText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: #27ae60;
  text-align: center;
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
