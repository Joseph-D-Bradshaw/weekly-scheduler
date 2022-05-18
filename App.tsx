import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Button, GestureResponderEvent} from 'react-native';
import Table from './Table';
import { Day, daysOfWeek, Mode, TimeRow, times, WeeklySchedule } from './types';

const weeklyData = daysOfWeek.reduce((daysDict: WeeklySchedule, day) => {
  daysDict[day] = times.reduce((timesDict: TimeRow, time) => {
      timesDict[time] = day
      return timesDict
  }, {})
  return daysDict
}, {})

export default function App() {
  const [currentDay, setCurrentDay] = useState<Day>('MON')
  const [mode, setMode] = useState<Mode>('threeDay')

  function nextDay(e: GestureResponderEvent) {
    const currentIndex = daysOfWeek.indexOf(currentDay)
    const chosenDay = currentIndex + 1 > daysOfWeek.length - 1 ? daysOfWeek[0] : daysOfWeek[currentIndex + 1]
    setCurrentDay(chosenDay)
  }

  function prevDay(e: GestureResponderEvent) {
    const currentIndex = daysOfWeek.indexOf(currentDay)
    const chosenDay = currentIndex - 1 < 0 ? daysOfWeek[daysOfWeek.length - 1] : daysOfWeek[currentIndex - 1]
    setCurrentDay(chosenDay)
  }

  function switchMode() {
    mode === 'threeDay' ? setMode('oneDay') : setMode('threeDay')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Weekly Schedule</Text>
      <View style={styles.buttonContainer}>
        <View>
          <Button title={mode} onPress={switchMode}></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='<--' onPress={prevDay}/>
          <Button title='-->' onPress={nextDay}/>
        </View>
      </View>
      <Table weeklyData={weeklyData} startDay={currentDay} mode={mode}></Table>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: '100%'
  },
  titleText: {
    alignSelf: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
