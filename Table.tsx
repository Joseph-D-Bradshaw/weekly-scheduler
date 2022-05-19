import React from "react"
import { StyleSheet, ScrollView, Text, View, Dimensions } from 'react-native'
import { CellProps, Day, TableProps, times, daysOfWeek } from "./types"

/**
 * Gets a block of three days that wraps around from the weekend to Monday/Tuesday
 * 
 * @param startDate 
 * @returns three days counting from startDate
 */
function getBlockOf3Days(startDate: Day): Day[] {
    const start = daysOfWeek.indexOf(startDate)
    const end = start + 3
    let threeDays = daysOfWeek.slice(start, end)

    const missing = end - daysOfWeek.length
    if (missing > 0) {
        threeDays = threeDays.concat(daysOfWeek.slice(0, missing))
    }

    return threeDays
}

function Cell({text, height, width, type}: CellProps): JSX.Element {
    type = type == null ? 'content' : type
    return (
        <View style={{
            ...styles.cell,
            height: height ? height : styles.cell.height,
            flexGrow: type === 'left-title' ? styles.cellTime.flexGrow : styles.cell.flexGrow,
            width: width ? width : 0,
        }}>
            <Text style={type === 'content' ? styles.cellContentText : styles.cellTitleText}>{text}</Text>
        </View>
    )
}

export default function Table({weeklyData, startDay, mode}: TableProps) {
    function renderHeader() {
        return (
            <View style={styles.cellRow}>
                <Cell text={'Time'} type="left-title" height={30}/>
                {
                    mode === 'threeDay' ? getBlockOf3Days(startDay).map(day => <Cell text={day} type="top-title" height={30} key={day}/>)
                                        : <Cell text={startDay} type="top-title" height={30}/>
                }
            </View>
        )
    }

    function renderRow(time: string) {
        return (
            <View key={time} style={styles.cellRow}>
                <Cell text={time} type="left-title"/>
                {
                    mode == 'threeDay' ? getBlockOf3Days(startDay).map(day => <Cell text={weeklyData[day][time]} key={`${day}-${time}`}/>)
                                       : <Cell text={startDay} type="content"/>
                }
            </View>
        )
    }

    return (
        <>
            <View style={styles.table}>
                {renderHeader()}
            </View>
            <ScrollView style={styles.table}>
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
        borderColor: '#898d94',
        height: 90,
        width: Dimensions.get('window').width / 4 // 4 because we have Time and 3 Days
    },
    cellTime: {
        flexGrow: 0.5
    },
    cellTitleText: {
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    cellContentText: {
        alignSelf: 'flex-start',
        padding: 5
    },
    table: {
        backgroundColor: '#fffbf6'
    }
  });
  