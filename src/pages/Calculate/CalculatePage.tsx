import React, { useState } from "react"
import { processColor, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../AppInner';
import { PieChart, PieData, ChartDescription } from 'react-native-charts-wrapper';

const heightScale = heightData;

const data = {
    dataSets: [{
        values: [{ value: 70 }, { value: 30 }],
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

const data2 = [{ month: 12, data: 52 }, { month: 12, data: 126 }, { month: 1, data: 86 }, { month: 2, data: 69 }, { month: 3, data: 101 }]
// 백분율  4/1  * 5 

const data3: PieData = {
    dataSets: [{
        values: [{ value: 70, label: 'aa' }, { value: 20 }, { value: 10 }],
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

function CalculatePage() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();

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
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}
                                    onPress={() => navigation.navigate('TotalPublish')}
                                />
                            </View>
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
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Black Ticket: 60장</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Red Ticket: 5장</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 20 * heightScale }}>
                                <View style={{ flexDirection: 'row' }} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle.png')} />
                                    <Text style={styles.fontStyle4} >Prize 분배</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Black Ticket: 20장</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>Red Ticket: 5장</Text>
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
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}
                                    onPress={() => navigation.navigate('UserConsumption')}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }} >
                            <View style={styles.rodBox} >
                                {data2.map((val, key) =>
                                    <View key={key} >
                                        <View style={[styles.rod, { height: val.data * heightScale }]} ></View>
                                        <Text style={[styles.fontStyle3, { marginTop: 10 * heightScale }]} >{val.month}월</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.containerBox3}>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 15 * heightScale, paddingHorizontal: 20 * heightScale }} >
                            <View style={{ flex: 1 }} >
                                <View style={styles.textBox} >
                                    <Text style={styles.fontStyle2} >3월 유통량</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 3 * heightScale }} >
                                <Text style={styles.fontStyle3} >자세히 보기</Text>
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 14}
                                    color="white"
                                    style={styles.detailIcon}
                                    onPress={() => navigation.navigate('MonthCirculation')}
                                />
                            </View>
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
                                <Text style={[styles.fontStyle5, { marginHorizontal: 10 * heightScale }]} >합계: ₩ 1,000,000</Text>
                                <Image style={styles.rectangleStyle2} source={require('../../assets/Rectangle4.png')} />
                            </View>
                            <View style={{ marginTop: 40 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle5.png')} />
                                    <Text style={styles.fontStyle4}>Black: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle6.png')} />
                                    <Text style={styles.fontStyle4}>Red: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../assets/Rectangle.png')} />
                                    <Text style={styles.fontStyle4}>Yellow: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
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
        marginRight: 20 * heightScale
    },
    rodBox: {
        width: 280 * heightScale,
        alignItems: 'flex-end',
        flexDirection: 'row',
        // paddingHorizontal: 20 * heightScale,
        paddingBottom: 40 * heightScale,
        // backgroundColor:'red'
    }

});

export default CalculatePage
