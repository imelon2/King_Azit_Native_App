import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;
import { Calendar } from 'react-native-calendars';
import IconAntDesign2 from 'react-native-vector-icons/Entypo';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../../AppInner';
import TicketHistoryViewDetail from '../../Admin/Components/TicketHistoryViewDetail'


function TotalPublish() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [dayString, setDayString] = useState(0);

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        let date = new Date(day.dateString);
        setDayString(date.getDay());
    };

    const day: any = { 0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일' };

    const ContentsList = [
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },
        {
            date: '02.14.2023 06:35 PM',
            id: 'KING123',
            count: 20,
        },

    ]

    const LISTS = [...Array(ContentsList.length).keys()].map((_, i) => {
        return {
            key: i,
            data: ContentsList[i],
        };
    });

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
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView>
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
                        {selectedDate == null ? (
                            <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >2023년 4월</Text>
                        ) : (
                            <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >{selectedDate.substr(0, 4)}년 {selectedDate.substr(5, 2)}월 {selectedDate.substr(8, 2)}일 ({day[dayString]}) </Text>
                        )}

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

                {selectedDate !== null && (
                    <View>
                        <View style={{ marginTop: 40 * heightScale, flexDirection: 'row' }} >
                            <Text style={[styles.fontStyle2, { marginLeft: 30 * heightScale }]} >전체 내역</Text>
                            <TouchableOpacity style={styles.FadersBox} >
                                <Image
                                    source={require('../../../assets/FadersHorizontal.png')}
                                    style={styles.Faders}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.line} >
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Text style={{ color: 'white' }} >총 발행  ₩ 4,100,000 </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                                <Text style={{ color: 'white' }}>최신순 전체</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 30 * heightScale }} >
                            {ContentsList.map((val, key) =>
                                <TicketHistoryViewDetail key={key} data={val} />
                            )}
                        </View>

                    </View>
                )}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
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
    Faders: {
        width: heightScale * 32,
        height: heightScale * 32,
    },
    FadersBox: {
        position: 'absolute',
        right: 0,
        marginRight: heightScale * 30,
    },
    line: {
        backgroundColor: '#232323',
        height: 46 * heightScale,
        width: width,
        marginTop: 30 * heightScale,
        paddingHorizontal: 30 * heightScale,
        flexDirection: 'row',
        marginBottom: 30 * heightScale,
    }
});

export default TotalPublish