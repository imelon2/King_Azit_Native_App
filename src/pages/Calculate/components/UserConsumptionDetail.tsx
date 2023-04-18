import React, { useState, useEffect, useCallback } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../../AppInner';
import TicketHistoryViewDetail from '../../Admin/Components/TicketHistoryViewDetail'
import Config from 'react-native-config';
import axios from 'axios';
import TimeFormat from '../../../modules/TimeFormat';
import Modal from 'react-native-modal';


function UserConsumptionDetail({ route }: any) {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const { month } = route.params;

    const [ContentsList, setContentsList] = useState<any>([]);
    const [totalData, setTotalData] = useState({ 'black': 0, 'red': 0, 'gold': 0 });

    const [sort, setSort] = useState('recent');
    const [ticket, setTicket] = useState('');
    const [nickName, setNickName] = useState('');
    const [modalStatus, setModalStatus] = useState(false);

    const onChangeNickName = useCallback((text: string) => {
        setNickName(text.trim());
    }, []);




    const setTicketList = (List: any) => {
        let result = [];
        for (let i = 0; i < List.data.length; i++) {
            let one = List.data[i];
            let map = { date: '', count: 0, id: '', type: '' };
            map['date'] = TimeFormat(one['date']);
            map['count'] = Math.abs(one['amount']);
            map['id'] = one['summary'];
            map['type'] = one['type'];
            result.push(map);
        }
        setContentsList(result);
    }

    const setMonthData = (ticket: any) => {
        let blackarr = ticket.data.filter((one: any) => {
            return one['type'] == 'black';
        });

        let redarr = ticket.data.filter((one: any) => {
            return one['type'] == 'red';
        });

        let goldarr = ticket.data.filter((one: any) => {
            return one['type'] == 'gold';
        });

        let result = { 'black': blackarr[0] ? Math.abs(blackarr[0]['amount']) : 0, red: redarr[0] ? Math.abs(redarr[0]['amount']) : 0, gold: goldarr[0] ? Math.abs(goldarr[0]['amount']) : 0 }

        setTotalData(result);
    }

    const onPressResult = async () => {
        setModalStatus(false)

        // if (dateLeft && dateRight) {
        //     try {
        //         const ticketData = await axios.get(`${Config.API_URL}/account/issued/details/custom?startDate=${dateLeft}'&endDate=${dateRight}`);
        //         setData(ticketData);
        //         setDateStatus(true);
        //         const ticketDataList = await axios.get(`${Config.API_URL}/account/issued/details/custom/list?startDate=${dateLeft}'&endDate=${dateRight}`);
        //         setTicketList(ticketDataList);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }

    }


    useEffect(() => {
        const getMonthDataDetail = async () => {

            let today = new Date();
            let year = today.getFullYear();
            let day = year + '-' + month + '-' + '01';

            try {
                const MonthDetail = await axios.get(`${Config.API_URL}/account/consumption/details/list?date=${day}'`);
                setTicketList(MonthDetail);

            } catch (error) {
                console.error(error);
            }
        };

        const getMonthData = async () => {


            let today = new Date();
            let year = today.getFullYear();
            let day = year + '-' + month + '-' + '01';

            try {
                const MonthDetail = await axios.get(`${Config.API_URL}/account/consumption/details?date=${day}'`);
                setMonthData(MonthDetail);
            } catch (error) {
                console.error(error);
            }


        }

        getMonthDataDetail();
        getMonthData();
    }, [])



    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>{month}월 전체</Text>
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
                <View style={{ alignItems: 'center', marginTop: 20 * heightScale }}  >
                    <View style={styles.container2} >
                        <Text style={[styles.fontStyle2, { marginBottom: 10 * heightScale }]} >2023년 {month}월</Text>


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

                            {/* {sort == 'custom' && (
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
                            )} */}


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

                </View>

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
    textInput: {
        width: 390 * heightScale,
        height: 44 * heightScale,
        borderRadius: 4,
        borderColor: '#F5FF82',
        borderWidth: 1,
        paddingLeft: 15 * heightScale,
        marginTop: 15 * heightScale,
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
});

export default UserConsumptionDetail
