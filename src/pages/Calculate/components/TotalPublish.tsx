import React, { useEffect, useState, useCallback } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity, ScrollView, TextInput, } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;
import { Calendar } from 'react-native-calendars';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../../AppInner';
import TicketHistoryViewDetail from '../../Admin/Components/TicketHistoryViewDetail'
import Config from 'react-native-config';
import axios from 'axios';
import TimeFormat from '../../../modules/TimeFormat';
import Modal from 'react-native-modal';
import { DatePicker } from 'react-native-wheel-pick';


function TotalPublish() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [dayString, setDayString] = useState(0);
    const [totalData, setTotalData] = useState({ 'black': 0, 'red': 0, 'gold': 0 });
    const [ContentsList, setContentsList] = useState<any>([]);
    const [modalStatus, setModalStatus] = useState(false);
    const [leftModalStatus, setLeftModalStatus] = useState(false);
    const [rightModalStatus, setRightModalStatus] = useState(false);
    const [dateStatus, setDateStatus] = useState(false);

    const [sort, setSort] = useState('recent');
    const [ticket, setTicket] = useState('');

    const [nickName, setNickName] = useState('');
    const [dateLeft, setDateLeft] = useState('');
    const [dateRight, setDateRight] = useState('');
    const [LeftdayString, setLeftDayString] = useState(0);
    const [RightdayString, setRightDayString] = useState(0);

    const onChangeDate = (date: any) => {
        let day = date.toISOString().substr(0, 10);
        setLeftDayString(date.getDay());
        setDateLeft(day);
    }

    const onChangeDateRight = (date: any) => {
        let day = date.toISOString().substr(0, 10);
        setRightDayString(date.getDay());
        setDateRight(day);
    }

    const onChangeNickName = useCallback((text: string) => {
        setNickName(text.trim());
    }, []);


    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        onedayData(day.dateString);
        getTicketList(day.dateString);
        let date = new Date(day.dateString);
        setDayString(date.getDay());
        setDateStatus(false);
    };

    const onedayData = async (day: any) => {
        try {
            const monthAccount = await axios.get(`${Config.API_URL}/account/issued/details/daily?date=${day}'`);
            setData(monthAccount);
        } catch (error) {
            console.error(error);
        }
    }

    const getTicketList = async (day: any) => {
        try {
            const monthAccount = await axios.get(`${Config.API_URL}/account/issued/details/daily/list?date=${day}'`);
            setTicketList(monthAccount);
        } catch (error) {
            console.error(error);
        }
    }

    const setTicketList = (List : any) => {
        let result = [];
        for (let i = 0; i < List.data.length; i++) {
            let one = List.data[i];
            let map = { date: '', count: 0, id: '', type: '' };
            map['date'] = TimeFormat(one['date']);
            map['count'] = one['amount'];
            map['id'] = one['summary'];
            map['type'] = one['type'];
            result.push(map);
        }
        setContentsList(result);
    }

    const day: any = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 0: '일' };

    useEffect(() => {
        const monthAccount = async () => {

            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            let day = year + '-' + month + '-' + date;

            try {
                const monthAccount = await axios.get(`${Config.API_URL}/account/issued/details/monthly?date=${day}'`);
                setData(monthAccount);
            } catch (error) {
                console.error(error);
            }
        };

        monthAccount();
    }, [])

    const setData = (ticket: any) => {
        let blackarr = ticket.data.filter((one: any) => {
            return one['type'] == 'black';
        });

        let redarr = ticket.data.filter((one: any) => {
            return one['type'] == 'red';
        });

        let goldarr = ticket.data.filter((one: any) => {
            return one['type'] == 'gold';
        });

        let result = { 'black': blackarr[0] ? blackarr[0]['amount'] : 0, red: redarr[0] ? redarr[0]['amount'] : 0, gold: goldarr[0] ? goldarr[0]['amount'] : 0 }

        setTotalData(result);
    }


    const onPressResult = async () => {
        setModalStatus(false)

        if (dateLeft && dateRight) {
            try {
                const ticketData = await axios.get(`${Config.API_URL}/account/issued/details/custom?startDate=${dateLeft}'&endDate=${dateRight}`);
                setData(ticketData);
                setDateStatus(true);
                const ticketDataList = await axios.get(`${Config.API_URL}/account/issued/details/custom/list?startDate=${dateLeft}'&endDate=${dateRight}`);
                setTicketList(ticketDataList);
            } catch (error) {
                console.error(error);
            }
        }

    }


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
                            arrowColor: '#fff',
                            dayTextColor: '#fff',
                            todayTextColor: '#fff',
                            textDisabledColor: '#5C5C5C',
                            textDayFontSize: 14,
                        }}

                        hideExtraDays
                    />

                </View>
                <View style={{ alignItems: 'center', marginTop: 20 * heightScale }}  >
                    <View style={styles.container2} >

                        {!dateStatus ? (
                            <>
                                {selectedDate == null ? (
                                    <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >2023년 4월</Text>
                                ) : (
                                    <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >{selectedDate.substr(0, 4)}년 {selectedDate.substr(5, 2)}월 {selectedDate.substr(8, 2)}일 ({day[dayString]}) </Text>
                                )}
                            </>
                        ) : (
                            <>
                                <Text style={[styles.fontStyle5, { marginBottom: 10 * heightScale }]} >{dateLeft.substr(0, 4)}년 {dateLeft.substr(5, 2)}월 {dateLeft.substr(8, 2)}일 ({day[LeftdayString]})  ~  {dateRight.substr(0, 4)}년 {dateRight.substr(5, 2)}월 {dateRight.substr(8, 2)}일 ({day[RightdayString]}) </Text>
                                {/* <View style={{ alignItems: 'flex-end' }} >
                                    <Text style={[styles.fontStyle5, { marginBottom: 10 * heightScale }]}> </Text>
                                </View> */}
                            </>
                        )}

                        <View style={{ flexDirection: 'row', marginTop: 5 * heightScale }} >
                            <Text style={styles.fontStyle3}>총발행</Text>
                            <Image style={styles.IconStyle} source={require('../../../assets/Rectangle5.png')} />
                            <Text style={styles.fontStyle4} >   Black:{totalData['black']}장</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 48 * heightScale }}>
                            <Image style={styles.IconStyle} source={require('../../../assets/Rectangle6.png')} />
                            <Text style={styles.fontStyle4}>   Red:{totalData['red']}장</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingLeft: 48 * heightScale }}>
                            <Image style={styles.IconStyle} source={require('../../../assets/Rectangle.png')} />
                            <Text style={styles.fontStyle4}>   Gold:{totalData['gold']}장</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', marginRight: 10 * heightScale }} >
                            <Text style={styles.fontStyle3}> = ₩ {(totalData['black'] * 50000 + totalData['red'] * 10000 + totalData['gold'] * 300000).toLocaleString()}</Text>
                        </View>
                    </View>
                </View>

                {selectedDate !== null && (
                    <View>
                        <View style={{ marginTop: 40 * heightScale, flexDirection: 'row' }} >
                            <Text style={[styles.fontStyle2, { marginLeft: 30 * heightScale }]} >전체 내역</Text>
                            <TouchableOpacity onPress={() => setModalStatus(true)} style={styles.FadersBox} >
                                <Image
                                    source={require('../../../assets/FadersHorizontal.png')}
                                    style={styles.Faders}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={styles.line} >
                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                <Text style={{ color: 'white' }} >총 발행  ₩ {(('black'.includes(ticket) ? (totalData['black'] * 50000) : 0) +
                                    ('red'.includes(ticket) ? totalData['red'] * 10000 : 0) + ('gold'.includes(ticket) ? totalData['gold'] * 300000 : 0)).toLocaleString()}
                                </Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                                <Text style={{ color: 'white', fontSize: 11 * heightScale }}>
                                    {sort == 'recent' && '최신순ㆍ'}
                                    {sort == 'past' && '과거순ㆍ'}
                                    {sort == 'custom' && '직접설정ㆍ'}

                                    {ticket == '' && '전체'}
                                    {ticket == 'black' && '블랙'}
                                    {ticket == 'red' && '레드'}
                                    {ticket == 'gold' && '골드'}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: 30 * heightScale }} >
                            {ContentsList.filter((one: any) => one.type.includes(ticket)).sort(function (a: any, b: any) {
                                return sort == 'past' ? (+new Date(a.date) - +new Date(b.date)) : (+new Date(b.date) - +new Date(a.date))
                            }).map((val: any, key: React.Key | null | undefined) =>
                                <TicketHistoryViewDetail key={key} data={val} />
                            )}
                        </View>

                    </View>
                )}
            </ScrollView>


            <Modal isVisible={modalStatus}>
                <View style={[styles.modalBox, sort == 'custom' && styles.modalBox2]}>
                    <View style={{ flex: 1 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.modalText} >티켓 충전 내역 정렬</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity activeOpacity={1} onPress={() => setSort('recent')} style={[styles.slectBox, styles.slectBoxLeft, sort == 'recent' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, sort == 'recent' && styles.slectBoxOnText]} >최근순</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => setSort('past')} style={[styles.slectBox, styles.slectCenter, sort == 'past' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, sort == 'past' && styles.slectBoxOnText]}>과거순</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => setSort('custom')} style={[styles.slectBox, styles.slectBoxRight, sort == 'custom' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, sort == 'custom' && styles.slectBoxOnText]}>직접설정</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {sort == 'custom' && (
                        <View style={{ flex: 1 }} >
                            <View style={styles.dayBox} >
                                <TouchableOpacity activeOpacity={1} onPress={() => setLeftModalStatus(true)} style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {dateLeft != '' && <Text style={{ color: 'white' }} > {dateLeft} </Text>}
                                </TouchableOpacity>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', justifyContent: 'center', alignItems: 'center' }} >-</Text>
                                </View>
                                <TouchableOpacity activeOpacity={1} onPress={() => setRightModalStatus(true)} style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    {dateRight != '' && <Text style={{ color: 'white' }} > {dateRight} </Text>}
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}


                    <View style={{ flex: 1 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.modalText} >어드민으로 찾기</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }} >
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                onChangeText={onChangeNickName}
                                placeholderTextColor={'#929292'}
                                style={styles.textInput}
                                placeholder="닉네임 검색"
                                value={nickName}
                            />
                        </View>

                    </View>

                    <View style={{ flex: 1 }} >
                        <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                            <Text style={styles.modalText} >티켓 유형</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity activeOpacity={1} onPress={() => setTicket('')} style={[styles.slectBox, styles.slectBoxLeft, ticket == '' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, ticket == '' && styles.slectBoxOnText]} >전체</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => setTicket('black')} style={[styles.slectBox, styles.slectCenter, ticket == 'black' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, ticket == 'black' && styles.slectBoxOnText]}>블랙</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => setTicket('red')} style={[styles.slectBox, styles.slectCenter2, ticket == 'red' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, ticket == 'red' && styles.slectBoxOnText]}>레드</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={() => setTicket('gold')} style={[styles.slectBox, styles.slectBoxRight, ticket == 'gold' && styles.slectBoxOn]} >
                                <Text style={[styles.slectBoxText, ticket == 'gold' && styles.slectBoxOnText]}>골드</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flex: 1 }} >
                        <TouchableOpacity style={styles.modalButton} onPress={() => onPressResult()}  >
                            <Text style={styles.modalButtonText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={leftModalStatus}>
                <View style={styles.container3} >
                    <DatePicker
                        style={styles.piker}
                        minimumDate={new Date('2020-01-01')}
                        maximumDate={new Date('2030-12-31')}
                        onDateChange={date => { onChangeDate(date) }}
                        textColor='#000'
                        // order='M-Y'
                        textSize={16}
                        selectLineColor='#aaa'
                        selectLineSize={3}
                    />

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity style={styles.yesButton} onPress={() => setLeftModalStatus(false)}>
                            <Text style={styles.textStyle}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={rightModalStatus}>
                <View style={styles.container3} >
                    <DatePicker
                        style={styles.piker}
                        minimumDate={new Date(dateLeft)}
                        maximumDate={new Date('2030-12-31')}
                        onDateChange={date => { onChangeDateRight(date) }}
                        textColor='#000'
                        // order='M-Y'
                        textSize={16}
                        selectLineColor='#aaa'
                        selectLineSize={3}
                    />

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity style={styles.yesButton} onPress={() => setRightModalStatus(false)} >
                            <Text style={styles.textStyle}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

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
    fontStyle5: {
        fontSize: 17 * heightScale,
        fontWeight: '600',
        color: 'white',
        // marginBottom: 5 * heightScale,
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
    },
    modalBox: {
        width: width,
        height: 449 * heightScale,
        position: 'absolute',
        left: -20,
        bottom: -20,
        borderTopRadius: 20,
        backgroundColor: '#353535',
        paddingHorizontal: 20 * heightScale,
        paddingVertical: 20 * heightScale,
        borderTopRightRadius: 36 * heightScale,
        borderTopLeftRadius: 36 * heightScale,
    },
    modalBox2: {
        height: 513 * heightScale,
    },
    modalText: {
        color: '#fff',
        fontSize: 16 * heightScale,
        marginTop: 10 * heightScale,
    },
    slectBox: {
        flex: 1,
        backgroundColor: '#595959',
        height: 44 * heightScale,
        marginTop: 20 * heightScale,
        alignItems: 'center',
        justifyContent: 'center',
    },
    slectBoxOn: {
        backgroundColor: '#F5FF82',
    },
    slectBoxOnText: {
        color: 'black'
    },
    slectBoxLeft: {
        borderColor: '#F5FF82',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    slectBoxRight: {
        borderColor: '#F5FF82',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    slectCenter: {
        borderColor: '#F5FF82',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    slectCenter2: {
        borderColor: '#F5FF82',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
    },
    slectBoxText: {
        fontSize: 16 * heightScale,
        color: 'white',
    },
    slectBoxText2: {
        color: 'black',
    },
    modalButton: {
        backgroundColor: '#F5FF82',
        height: 64 * heightScale,
        marginTop: 30 * heightScale,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 20 * heightScale,
        color: '#000',
    },
    textInput: {
        width: 390 * heightScale,
        height: 44 * heightScale,
        borderRadius: 4,
        borderColor: '#F5FF82',
        borderWidth: 1,
        paddingLeft: 15 * heightScale,
        marginTop: 15 * heightScale,
    },
    dayBox: {
        flexDirection: 'row',
        width: 390 * heightScale,
        height: 44 * heightScale,
        borderRadius: 4,
        borderColor: '#F5FF82',
        borderWidth: 1,
        marginTop: 25 * heightScale,
    },
    piker: {
        height: 240 * heightScale,
        width: 350 * heightScale,
        backgroundColor: '#fff',
        marginTop: 30 * heightScale,
    },
    container3: {
        width: width,
        height: 380 * heightScale,
        position: 'absolute',
        left: -20,
        bottom: -20,
        borderRadius: 20,
        backgroundColor: '#373737',
        paddingHorizontal: 20 * heightScale,
        alignItems: 'center'
    },
    yesButton: {
        height: 50 * heightScale,
        width: 234 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 6,
        marginLeft: 10 * heightScale,
        marginTop: 20 * heightScale,
    },
    textStyle: {
        textAlign: 'center',
        lineHeight: 50 * heightScale,
        fontWeight: '600',
        fontSize: 18 * heightScale,
        color: '#000'
    },
});

export default TotalPublish
