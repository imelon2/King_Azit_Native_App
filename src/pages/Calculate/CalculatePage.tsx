import React, { useState, useEffect } from "react"
import { processColor, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../AppInner';
import { PieChart, PieData, ChartDescription } from 'react-native-charts-wrapper';
import Config from 'react-native-config';
import axios from 'axios';

const heightScale = heightData;



const data2 = [{ month: 12, data: 52 }, { month: 12, data: 126 }, { month: 1, data: 86 }, { month: 2, data: 69 }, { month: 3, data: 101 }]
// 백분율  4/1  * 5 

function CalculatePage() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [selectIndex, setSelectIndex] = useState(-1);
    const [totalData, setTotalData] = useState<any>({
        "prize": [{ "amount": 4, "type": "black" }, { "amount": 3, "type": "red" }, { "amount": 5, "type": "gold" }], "userBuy": [{ "amount": 214, "type": "black" },
        { "amount": 120, "type": "red" }, { "amount": 113, "type": "gold" }]
    });
    const [chartData, setChartData] = useState<any>({ 'prize': 0, 'userBuy': 0 });
    const [monthData, setMonthData] = useState<any>({ 'black': 0, 'red': 0, 'gold': 0 });
    const [chartData2, setChartData2] = useState([{ month: 1, data: 0, amount: 0 }]);
    const [chartData3, setChartData3] = useState<any>({ 'black': 0, 'red': 0, 'gold': 0 });
    const [month, setMonth] = useState(0);
    // const [chartTotal , setChartTotal] = useState<any>(0);

    const onClickLine = (key: any) => {
        setSelectIndex(key);
    }

    useEffect(() => {
        const getTotalAccount = async () => {
            try {
                const TotalAccount = await axios.get(`${Config.API_URL}/account/issued`);
                setTotalData(TotalAccount.data);
                // console.log(TotalAccount.data);
                let prize = 0;
                let userBuy = 0;
                for (let i = 0; i < 3; i++) {
                    prize += TotalAccount.data['prize'][i]['amount'];
                    userBuy += TotalAccount.data['userBuy'][i]['amount'];
                }
                let total = prize + userBuy;
                let result = { 'prize': prize / total * 100, 'userBuy': userBuy / total * 100 }
                setChartData(result);
            } catch (error) {
                console.error(error);
            }
        };

        const userAccount = async () => {

            try {
                const monthAccount = await axios.get(`${Config.API_URL}/account/consumption`);
                // console.log(monthAccount.data);
                let data = monthAccount.data;

                let result = []
                let total = 0;
                let now = new Date();
                let month = [now.getMonth() + 1, new Date(now.setMonth(now.getMonth() - 1)).getMonth() + 1,
                new Date(now.setMonth(now.getMonth() - 1)).getMonth() + 1, new Date(now.setMonth(now.getMonth() - 1)).getMonth() + 1,
                new Date(now.setMonth(now.getMonth() - 1)).getMonth() + 1]
                month.reverse()

                for (let i = 0; i < month.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (month[i] == data[j]['month']) {
                            let one = data[j];
                            let num = Math.abs(one['amount']);
                            let map = { month: one['month'], amount: num, data: 0 };
                            total += num;
                            result.push(map);
                        }
                    }
                }

                for (let j = 0; j < result.length; j++) {
                    result[j]['data'] = Math.floor((result[j]['amount'] / total) * 100 * 1.25);
                }
                setChartData2(result);

                // setChartData2(result);
                // setChartTotal(total);

            } catch (error) {
                console.error(error);
            }
        };


        const monthAccount = async () => {

            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let date = today.getDate();
            let day = year + '-' + month + '-' + date;
            setMonth(month);

            try {
                const monthAccount = await axios.get(`${Config.API_URL}/account/issued/details/monthly?date=${day}'`);
                let monthdata = {};

                let total = monthAccount.data[0]['amount'] + monthAccount.data[1]['amount'] + monthAccount.data[2]['amount'];
                let blackarr = monthAccount.data.filter((one: any) => {
                    return one['type'] == 'black';
                });
                let black = blackarr[0]['amount'] / total * 100;

                let redarr = monthAccount.data.filter((one: any) => {
                    return one['type'] == 'gold';
                });
                let red = redarr[0]['amount'] / total * 100;

                let goldarr = monthAccount.data.filter((one: any) => {
                    return one['type'] == 'gold';
                });
                let gold = goldarr[0]['amount'] / total * 100;

                let result = { 'black': black, 'red': red, 'gold': gold };
                setChartData3(result);

                monthdata = { 'black': blackarr[0]['amount'], red: redarr[0]['amount'], gold: goldarr[0]['amount'] }
                setMonthData(monthdata);

            } catch (error) {
                console.error(error);
            }
        };


        // date=${day}

        getTotalAccount();
        userAccount();
        monthAccount();
    }, [])


    const data = {
        dataSets: [{
            values: [{ value: chartData['userBuy'] }, { value: chartData['prize'] }],
            label: '',
            config: {
                colors: [processColor('#8CB2EA'), processColor('#E4F799')],
                valueTextSize: 14,
                valueTextColor: processColor('black'),
                // sliceSpace: 10,
                selectionShift: 13,
                valueFormatter: "#.#'%'",
            }
        }],
    }

    const data3: PieData = {
        dataSets: [{
            values: [{ value: chartData3['black'] }, { value: chartData3['red'] }, { value: chartData3['gold'] }],
            label: '',
            config: {
                colors: [processColor('#101010'), processColor('#FF5252'), processColor('#FFF173')],
                valueTextSize: 14,
                valueTextColor: processColor('#888'),
                // sliceSpace: 10,
                selectionShift: 13,
                valueFormatter: "#.#'%'",
            }
        }],
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>티켓 관리</Text>
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
                <View style={{ alignItems: 'center' }} >
                    <View style={styles.containerBox} >
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15 * heightScale, paddingHorizontal: 20 * heightScale }} >
                            <View style={{ flex: 1 }} >
                                <View style={styles.textBox} >
                                    <Text style={styles.fontStyle2} >총 발행</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('TotalPublish')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 5, alignItems: 'center' }} >
                            <PieChart
                                style={styles.chart}
                                data={data}
                                holeRadius={30}
                                transparentCircleRadius={0} // 투명반지름
                                holeColor={3}
                                chartDescription={{ text: '' }}
                                legend={{ enabled: false }}
                            />
                        </View>
                        <View style={{ flex: 2.3, flexDirection: 'row' }} >
                            <View style={{ flex: 1, paddingLeft: 25 * heightScale }}>
                                <View style={{ flexDirection: 'row' }} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle3.png')} />
                                    <Text style={styles.fontStyle4} >유저 충전</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Black Ticket: {totalData['prize'][0]['amount']}장</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Red Ticket: {totalData['prize'][1]['amount']}장</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 20 * heightScale }}>
                                <View style={{ flexDirection: 'row' }} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle.png')} />
                                    <Text style={styles.fontStyle4} >Prize 분배</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Black Ticket: {totalData['userBuy'][0]['amount']}장</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Red Ticket: {totalData['userBuy'][1]['amount']}장</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBox2}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15 * heightScale, paddingHorizontal: 20 * heightScale }} >
                            <View style={{ flex: 1 }} >
                                <View style={styles.textBox} >
                                    <Text style={styles.fontStyle2} >유저 소모</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('UserConsumption')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <View style={styles.rodBox} >
                                {chartData2.map((val, key) =>
                                    <TouchableOpacity key={key} onPress={() => onClickLine(key)} activeOpacity={1} style={{ marginRight: 20 * heightScale, alignItems: 'center' }} >
                                        {key == selectIndex && <Text style={{ color: '#FFF48D' }} >{val.amount}</Text>}
                                        <View style={[styles.rod, { height: val.data * heightScale }]} ></View>
                                        <Text style={[styles.fontStyle3, { marginTop: 10 * heightScale }]} >{val.month}월</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBox3}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15 * heightScale, paddingHorizontal: 20 * heightScale }} >
                            <View style={{ flex: 1 }} >
                                <View style={styles.textBox} >
                                    <Text style={styles.fontStyle2} >{month}월 유통량</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('MonthCirculation')} style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}

                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 5, alignItems: 'center' }} >
                            <PieChart
                                style={styles.chart}
                                data={data3}
                                holeRadius={30}
                                transparentCircleRadius={0} // 투명반지름
                                holeColor={3}
                                chartDescription={{ text: '' }}
                                legend={{ enabled: false }}
                            // drawEntryLabels={true}
                            />
                        </View>
                        <View style={{ flex: 7 }} >
                            <View style={{ justifyContent: 'center', flexDirection: 'row' }} >
                                <Image style={styles.rectangleStyle2} source={require('../../assets/Rectangle4.png')} />
                                <Text style={[styles.fontStyle5, { marginHorizontal: 10 * heightScale }]} >합계: ₩ {(monthData['black'] * 50000 + monthData['red'] * 10000 + monthData['gold'] * 300000).toLocaleString()}</Text>
                                <Image style={styles.rectangleStyle2} source={require('../../assets/Rectangle4.png')} />
                            </View>
                            <View style={{ marginTop: 40 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle5.png')} />
                                    <Text style={styles.fontStyle4}>Black: {chartData3['black'].toFixed(2)}%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>{monthData['black']}장 →   ₩ {(monthData['black'] * 50000).toLocaleString()}</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle6.png')} />
                                    <Text style={styles.fontStyle4}>Red: {chartData3['red'].toFixed(2)}%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>{monthData['red']}장 →   ₩ {(monthData['red'] * 10000).toLocaleString()}</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle.png')} />
                                    <Text style={styles.fontStyle4}>Gold: {chartData3['gold'].toFixed(2)}%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>{monthData['gold']}장 →   ₩ {(monthData['gold'] * 300000).toLocaleString()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 50 * heightScale }}></View>
                </View>
            </ScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
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
        color: 'black',
        fontWeight: '600',
        fontSize: 16 * heightScale,
    },
    fontStyle3: {
        color: 'white',
        fontSize: 16 * heightScale,
    },
    fontStyle4: {
        color: 'white',
        fontSize: 18 * heightScale,
        fontWeight: '600',
        marginBottom: 8 * heightScale,
    },
    fontStyle5: {
        color: 'white',
        fontSize: 22 * heightScale,
        fontWeight: '600',
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    containerBox: {
        width: 389 * heightScale,
        height: 417 * heightScale,
        borderRadius: 12 * heightScale,
        backgroundColor: '#2B2D36',
        marginTop: 35 * heightScale,
        flex: 1,
    },
    containerBox2: {
        width: 389 * heightScale,
        height: 291 * heightScale,
        borderRadius: 12 * heightScale,
        backgroundColor: '#2B2D36',
        marginTop: 35 * heightScale,
    },
    containerBox3: {
        width: 389 * heightScale,
        height: 630 * heightScale,
        borderRadius: 12 * heightScale,
        backgroundColor: '#2B2D36',
        marginTop: 35 * heightScale,
    },
    textBox: {
        width: 92 * heightScale,
        height: 29 * heightScale,
        borderRadius: 15 * heightScale,
        backgroundColor: '#7CD3AA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailIcon: {
        marginLeft: 6 * heightScale,
        marginRight: 6 * heightScale,
        marginTop: 4 * heightScale,
    },
    chart: {
        width: 205 * heightScale,
        height: 205 * heightScale,
    },
    rectangleStyle: {
        marginRight: 10 * heightScale,
        position: 'relative',
        top: 4 * heightScale,
    },
    rectangleStyle2: {
        // marginRight: 10 * heightScale,
        position: 'relative',
        top: 7 * heightScale,
    },
    marginLeft: {
        marginLeft: 26 * heightScale,
    },
    rod: {
        width: 40 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 23 * heightScale,
        marginTop: 10 * heightScale,
        // marginRight: 20 * heightScale
    },
    rodBox: {
        width: 280 * heightScale,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row',
        // paddingHorizontal: 20 * heightScale,
        paddingBottom: 40 * heightScale,
        // backgroundColor:'red'
    }

});

export default CalculatePage
