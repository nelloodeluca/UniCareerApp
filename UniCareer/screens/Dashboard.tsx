import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CalendarList } from 'react-native-calendars';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, addDays } from 'date-fns';

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
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
];

const getWeeksInMonth = (month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const startOfFirstWeek = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endOfMonth(firstDayOfMonth), { weekStartsOn: 1 });

    const weeks = [];
    let start = startOfFirstWeek;

    while (start <= endOfLastWeek) {
        const end = endOfWeek(start, { weekStartsOn: 1 });
        weeks.push({ start: format(start, 'yyyy-MM-dd'), end: format(end, 'yyyy-MM-dd') });
        start = new Date(start.setDate(start.getDate() + 7));
    }

    return weeks;
};

function Dashboard() {
    const [selectedDay, setSelectedDay] = useState<string>('');
    const [viewMode, setViewMode] = useState<'monthly' | 'weekly'>('monthly');
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
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
        '2024-05-25': [{ name: 'Storia' }, { name: 'Inglese' }]
    };

    const markedDates = useMemo(() => {
        const marks: { [date: string]: { dots: Array<{ color: string }>, selected: boolean, selectedColor: string } } = {};
        Object.keys(exams).forEach(date => {
            marks[date] = {
                dots: exams[date].map(() => ({ color: 'blue' })),
                selected: date === selectedDay,
                selectedColor: date === selectedDay ? 'lightblue' : 'white'
            };
        });

        // Highlight the selected day even if it has no exams
        if (selectedDay && !marks[selectedDay]) {
            marks[selectedDay] = {
                dots: [],
                selected: true,
                selectedColor: 'lightblue'
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

    const onMonthChange = (month: { year: number, month: number }) => {
        setCurrentDate(new Date(month.year, month.month - 1, 1));
    };

    const getMonthlyExams = () => {
        const monthString = `${year}-${String(selectedMonth + 1).padStart(2, '0')}`;
        return Object.keys(exams)
            .filter(date => date.startsWith(monthString))
            .map(date => ({ date, exams: exams[date] }));
    };

    const getWeeklyExams = () => {
        const week = weeks[selectedWeekIndex];
        const startOfTargetWeek = new Date(`${week.start}T00:00:00`);
        const endOfTargetWeek = new Date(`${week.end}T23:59:59`);

        const interval = { start: startOfTargetWeek, end: endOfTargetWeek };
        const daysInInterval = eachDayOfInterval(interval).map(date => format(date, 'yyyy-MM-dd'));

        return daysInInterval.flatMap(date => (exams[date] || []).map(exam => ({ ...exam, date })));
    };

    const getImminentExams = () => {
        const targetDate = addDays(new Date(), parseInt(daysAhead) || 7);
        const imminentExams = Object.keys(exams)
            .filter(date => new Date(date) <= targetDate && new Date(date) >= new Date())
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .slice(0, 3)
            .flatMap(date => (exams[date] || []).map(exam => ({ ...exam, date })));
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
            <View style={styles.calendarContainer}>
                <CalendarList
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    theme={calendarTheme}
                    style={styles.calendarStyle}
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
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.button, viewMode === 'monthly' && styles.buttonActive]}
                    onPress={() => { setViewMode('monthly'); handleClearSelection(); }}
                >
                    <Text style={styles.buttonText}>Visualizzazione Mensile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, viewMode === 'weekly' && styles.buttonActive]}
                    onPress={() => { setViewMode('weekly'); handleClearSelection(); }}
                >
                    <Text style={styles.buttonText}>Visualizzazione Settimanale</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue: number) => setSelectedMonth(itemValue)}
                    style={styles.picker}
                >
                    {months.map((month, index) => (
                        <Picker.Item key={index} label={month} value={index} />
                    ))}
                </Picker>
            </View>
            {selectedDay ? (
                <View style={styles.examsContainer}>
                    <Text style={styles.examsTitle}>Esami del giorno {selectedDay}:</Text>
                    {exams[selectedDay]?.map((exam, index) => (
                        <Text key={index} style={styles.examText}>{exam.name}</Text>
                    )) || <Text>Nessun esame per questo giorno</Text>}
                </View>
            ) : viewMode === 'monthly' ? (
                <View style={styles.examsContainer}>
                    <Text style={styles.examsTitle}>Questo mese hai questi esami:</Text>
                    {monthlyExams.map(({ date, exams }) => (
                        <View key={date}>
                            <Text style={styles.examDate}>{date.split('-')[2]}/{date.split('-')[1]}</Text>
                            {exams.map((exam, index) => (
                                <Text key={index} style={styles.examText}>{exam.name}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.examsContainer}>
                    <Text style={styles.examsTitle}>Nella settimana selezionata hai questi esami:</Text>
                    <Picker
                        selectedValue={selectedWeekIndex}
                        onValueChange={(itemValue: number) => setSelectedWeekIndex(itemValue)}
                        style={styles.picker}
                    >
                        {weeks.map((week, index) => (
                            <Picker.Item key={index} label={`Settimana ${index + 1}: ${week.start.split('-')[2]}/${week.start.split('-')[1]} - ${week.end.split('-')[2]}/${week.end.split('-')[1]}`} value={index} />
                        ))}
                    </Picker>
                    {weeklyExams.length > 0 ? (
                        weeklyExams.map((exam, index) => (
                            <Text key={index} style={styles.examText}>{`${exam.date.split('-')[2]}/${exam.date.split('-')[1]}: ${exam.name}`}</Text>
                        ))
                    ) : (
                        <Text>Nessun esame per questa settimana</Text>
                    )}
                </View>
            )}
            <View style={styles.imminentExamsContainer}>
                <View style={styles.daysAheadContainer}>
                    <Text>Esami imminenti entro giorni:</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={daysAhead}
                        onChangeText={(text) => setDaysAhead(text)}
                    />
                </View>
                <View style={styles.examsContainer}>
                    <Text style={styles.examsTitle}>Prossimi 3 esami imminenti:</Text>
                    {imminentExams.length > 0 ? (
                        imminentExams.map((exam, index) => (
                            <Text key={index} style={styles.examText}>{`${exam.date.split('-')[2]}/${exam.date.split('-')[1]}: ${exam.name}`}</Text>
                        ))
                    ) : (
                        <Text>Nessun esame imminente</Text>
                    )}
                </View>
            </View>
            {exams[todayString] && exams[todayString].length > 0 && (
                <View style={styles.todayExamsContainer}>
                    <Text style={styles.todayExamsTitle}>Esami di oggi:</Text>
                    {exams[todayString].map((exam, index) => (
                        <Text key={index} style={styles.todayExamText}>{exam.name}</Text>
                    ))}
                    <Text style={styles.encouragementText}>Buona fortuna per i tuoi esami di oggi!</Text>
                    <View style={styles.inspirationalQuoteContainer}>
                        <Text style={styles.inspirationalQuote}>
                            "Il successo non è la chiave della felicità. La felicità è la chiave del successo. Se ami ciò che fai, avrai successo."
                        </Text>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        marginTop: 10,
        borderWidth: 10,
        borderColor: 'grey',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
        alignSelf: 'center',
        width: Dimensions.get('window').width - 20,
    },
    calendarStyle: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        width: Dimensions.get('window').width - 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'lightgrey',
    },
    buttonActive: {
        backgroundColor: 'orange',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
    },
    pickerContainer: {
        marginHorizontal: 10,
    },
    examsContainer: {
        padding: 20,
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
    },
    examsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    examDate: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    examText: {
        fontSize: 16,
        marginTop: 5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    imminentExamsContainer: {
        padding: 20,
        marginHorizontal: 10,
        marginTop: 20,
    },
    daysAheadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    todayExamsContainer: {
        padding: 20,
        backgroundColor: '#dff0d8',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    todayExamsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2c3e50',
    },
    todayExamText: {
        fontSize: 16,
        marginTop: 5,
        color: '#34495e',
    },
    encouragementText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#27ae60',
    },
    inspirationalQuoteContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    inspirationalQuote: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        color: '#7f8c8d',
    },
});

export default Dashboard;
