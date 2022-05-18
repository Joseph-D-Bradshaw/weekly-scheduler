import React from "react"
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { CellProps, Day, TableProps, times, daysOfWeek } from "./types"



function getBlockOf3Days(startDate: Day): string[] {
    const start = daysOfWeek.indexOf(startDate)
    const end = start + 3
    const threeDays = daysOfWeek.slice(start, end)
    return threeDays
}

function Cell({text, height, type}: CellProps): JSX.Element {
    type = type == null ? 'content' : type
    return (
        <View style={{...styles.cell, height: height ? height : styles.cell.height}}>
            <Text style={type === 'content' ? styles.cellContentText : styles.cellTitleText}>{text}</Text>
        </View>
    )
}

export default function Table({weeklyData, startDay, mode}: TableProps) {
    function renderHeader() {
        return (
            <View style={styles.cellRow}>
                <Cell text={'Time'} type="title" height={30}/>
                {
                    mode === 'threeDay' ? getBlockOf3Days(startDay).map(day => <Cell text={day} type="title" height={30} key={day}/>)
                                        : <Cell text={startDay} type="title" height={30}/>
                }
            </View>
        )
    }

    function renderRow(time: string) {
        return (
            <View key={time} style={styles.cellRow}>
                <Cell text={time}/>
                {
                    mode == 'threeDay' ? getBlockOf3Days(startDay).map(day => <Cell text={weeklyData[day][time]} key={`${day}-${time}`}/>)
                                       : <Cell text={startDay} type="content"/>
                }
            </View>
        )
    }

    return (
        <>
            <View>
                {renderHeader()}
            </View>
            <ScrollView>
                {
                    times.map(t => renderRow(t))
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    cellRow: {
        flexDirection: 'row'
    },
    cell: {
        flexGrow: 1,
        borderWidth: 1,
        height: 90,
        width: Dimensions.get('window').width / 4 // 4 because we have Time and 3 Days
    },
    cellTitleText: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    cellContentText: {
        alignSelf: 'flex-start',
        padding: 5
    }
  });
  