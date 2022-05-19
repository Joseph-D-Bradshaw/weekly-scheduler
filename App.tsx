import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Button, GestureResponderEvent, PanResponderGestureState} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

import Table from './Table';
import { Day, daysOfWeek, Mode, SwipeDirection, TimeRow, times, WeeklySchedule } from './types';

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

  function nextDay() {
    const currentIndex = daysOfWeek.indexOf(currentDay)
    const chosenDay = currentIndex + 1 > daysOfWeek.length - 1 ? daysOfWeek[0] : daysOfWeek[currentIndex + 1]
    setCurrentDay(chosenDay)
  }

  function prevDay() {
    const currentIndex = daysOfWeek.indexOf(currentDay)
    const chosenDay = currentIndex - 1 < 0 ? daysOfWeek[daysOfWeek.length - 1] : daysOfWeek[currentIndex - 1]
    setCurrentDay(chosenDay)
  }

  function switchMode() {
    mode === 'threeDay' ? setMode('oneDay') : setMode('threeDay')
  }

  function onSwipe(direction: SwipeDirection, e: PanResponderGestureState) {
    switch (direction) {
      case 'SWIPE_LEFT':
        nextDay()
        break;
      case 'SWIPE_RIGHT':
        prevDay()
        break;
      default:
        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Weekly Schedule</Text>
      <View style={styles.buttonContainer}>
        <View>
          <Button title={mode} onPress={switchMode}></Button>
        </View>
      </View>
      {/* TODO: Consider replacing GestureRecognizer with well supported https://github.com/software-mansion/react-native-gesture-handler */}
      <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state)}>
        <Table weeklyData={weeklyData} startDay={currentDay} mode={mode}></Table>
      </GestureRecognizer>
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
