import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;
import { Calendar } from 'react-native-calendars';
import IconAntDesign2 from 'react-native-vector-icons/Entypo';

interface propsType {
    setModalStatus(id: boolean): void
}


function Total(props: propsType) {
    const [selectedDate, setSelectedDate] = useState<any>(null);

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
    };

    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>총발행</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={styles.beforeIcon}
                    onPress={() => props.setModalStatus(false)}
                />
            </View>
            <View >
                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={{
                        [selectedDate]: {
                            selected: true,
                            selectedColor: '#F5FF82',
                            selectedTextColor: 'black',
                            // selectedBackgroundColor: 'white',
                        },
                    }}
                    theme={{
                        calendarBackground: '#121212',
                        monthTextColor: '#fff',
                        textMonthFontSize: 16,
                        arrowColor: '#121212',
                        dayTextColor: '#fff',
                        todayTextColor: '#fff',
                        textDisabledColor: '#5C5C5C',
                        textDayFontSize: 14,
                    }}

                    hideExtraDays
                />

                <IconAntDesign2
                    name="calendar"
                    size={heightScale * 22}
                    color="white"
                    style={{ position: 'absolute', right: 15, top: 15 }}
                // onPress={() => setModalStatus(true)}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 * heightScale }}  >
                <View style={styles.container2} >
                    <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >2023년 4월</Text>

                    <View style={{ flexDirection: 'row' }} >
                        <Text style={styles.fontStyle3}>총발행</Text>
                        <Image style={styles.IconStyle} source={require('../../../assets/Rectangle5.png')} />
                        <Text style={styles.fontStyle4} >   Black: 40장</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 48 * heightScale }}>
                        <Image style={styles.IconStyle} source={require('../../../assets/Rectangle6.png')} />
                        <Text style={styles.fontStyle4}>   Red: 10장</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingLeft: 48 * heightScale }}>
                        <Image style={styles.IconStyle} source={require('../../../assets/Rectangle.png')} />
                        <Text style={styles.fontStyle4}>   Gold: 2장</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginRight: 10 * heightScale }} >
                        <Text style={styles.fontStyle3}> = ₩ 4,100,000</Text>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#121212',
        position: 'absolute',
        left: -20,
    },
    container2: {
        width: 390 * heightScale,
        height: 160 * heightScale,
        backgroundColor: '#232323',
        borderRadius: 12 * heightScale,
        padding: 15 * heightScale,
    },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#484848',
    },
    fontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: heightScale * 4.5,
    },
    fontStyle2: {
        fontSize: 20 * heightScale,
        fontWeight: '600',
        color: 'white',
    },
    fontStyle3: {
        fontSize: 18 * heightScale,
        color: 'white',
    },
    fontStyle4: {
        fontSize: 16 * heightScale,
        color: 'white',
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    IconStyle: {
        width: 14 * heightScale,
        height: 14 * heightScale,
        marginLeft: 20 * heightScale,
        position: 'relative',
        top: 4 * heightScale,
    },
});

export default Total
