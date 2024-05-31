import React from 'react';
import { Card } from 'react-native-paper';
import { CalendarList } from 'react-native-calendars';

interface CalendarComponentProps {
  onDayPress: (day: { dateString: string }) => void;
  markedDates: { [key: string]: any };
  calendarTheme: { [key: string]: any };
  onMonthChange: (month: { year: number; month: number }) => void;
  windowWidth: number;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDayPress,
  markedDates,
  calendarTheme,
  onMonthChange,
  windowWidth,
}) => {
  return (
    <Card style={{ marginTop: 10, marginHorizontal: 10, backgroundColor: '#fafafa'}}>
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
  );
};

export default CalendarComponent;
