import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import { eachDayOfInterval, format, startOfMonth, endOfMonth, getDay } from 'date-fns';

// Sample data
// const data = [
//   { date: "2024-09-01", value: 5 },
//   { date: "2024-09-02", value: 2 },
//   { date: "2024-09-03", value: 0 },
//   // Add more date-value pairs here
// ];

// Function to get the shade of a square based on the value
const getColorForValue = (value) => {
  if (value === 0) return '#eee'; 
  if (value === 1) return '#cfe2f3';
  if (value === 2) return '#6fa8dc';
  if (value === 3) return '#3d85c6';
  if (value >= 4) return '#073763';
  return '#fff';
};

const HeatmapCalendar = (props) => {
  const currentDate = new Date(); // Get current date
  const startDate = startOfMonth(currentDate); // Start of the current month
  const endDate = endOfMonth(currentDate); // End of the current month
  
  // Get all days in the current month
  const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Get the day of the week the first day of the month falls on
  const firstDayOffset = getDay(startDate); // Sunday = 0, Monday = 1, ..., Saturday = 6

  // Convert array to a map for easier lookups
  const dataMap = new Map(props.values.map(item => [item.date, item.count]));

  return (
    <View style={styles.container}>
      <Svg height={300} width={320}>
        {daysInMonth.map((date, index) => {
          const dayString = format(date, 'yyyy-MM-dd'); // Format each date as YYYY-MM-DD
          const dayNumber = format(date, 'd'); // Get the day number
          const value = dataMap.get(dayString) || 0; // Look up the value in the map, default to 0 if not found
          const fillColor = getColorForValue(value);

          // Calculate the x and y positions, accounting for the first day offset
          const adjustedIndex = index + firstDayOffset;
          const x = (adjustedIndex % 7) * 40;
          const y = Math.floor(adjustedIndex / 7) * 40;

          return (
            <G key={dayString}>
              {/* Rounded rectangle */}
              <Rect
                x={x}
                y={y}
                width={35}
                height={35}
                rx={10} // Rounded corners (x-radius)
                ry={10} // Rounded corners (y-radius)
                fill={fillColor}
              />
              {/* Day number */}
              <SvgText
                x={x + 17.5} // Centering text horizontally
                y={y + 22}    // Centering text vertically
                fill="#000"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
              >
                {dayNumber}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default HeatmapCalendar;
