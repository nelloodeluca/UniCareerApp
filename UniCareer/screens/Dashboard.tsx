import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { CalendarList } from 'react-native-calendars';

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

function Dashboard() {
    const [selectedDay, setSelectedDay] = useState<string>('');
    const windowWidth = Dimensions.get('window').width; 

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

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{
                marginTop: 10,
                borderWidth: 10,
                borderColor: 'grey',
                borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: 'white',
                width: windowWidth - 20, // Larghezza un po' meno della larghezza dello schermo
                alignSelf: 'center', // Centra la View all'interno del suo contenitore
            }}>
                <CalendarList
                    horizontal={true}
                    pagingEnabled={true}
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    markingType={'multi-dot'}
                    calendarWidth={windowWidth - 20} // Imposta la larghezza del calendario
                    theme={{
                        selectedDayBackgroundColor: 'orange',
                        selectedDayTextColor: 'white',
                        todayTextColor: 'red',
                        dayTextColor: 'black',
                        textDisabledColor: 'grey',
                    }}
                    style={{
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 10,
                        width: windowWidth - 20 // Assicura che la larghezza del calendario corrisponda alla larghezza della View
                    }}
                    firstDay={1} // Inizia la settimana dal lunedì
                    scrollEnabled={true}
                    showScrollIndicator={false}
                />
            </View>
            <View style={{ padding: 20, backgroundColor: 'lightgrey', borderRadius: 20, marginHorizontal: 10, marginTop: 20 }}>
                {exams[selectedDay] ? (
                    exams[selectedDay].map((exam: Exam, index: number) => (
                        <Text key={index} style={{ fontSize: 16, marginTop: 5 }}>{exam.name}</Text>
                    ))
                ) : (
                    <Text>Nessun impegno per questo giorno</Text>
                )}
            </View>
        </ScrollView>
    );
}

export default Dashboard;
