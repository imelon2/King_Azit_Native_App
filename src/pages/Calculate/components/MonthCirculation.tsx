import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, ScrollView, processColor } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../../AppInner';
import { PieChart, PieData, ChartDescription } from 'react-native-charts-wrapper';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;


function MonthCirculation() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();

    const data = [{ month: 'Jan', ticket: 0 }, { month: 'Feb', ticket: 0 }, { month: 'Mar', ticket: 80 },
    { month: 'Apr', ticket: 20 }, { month: 'May', ticket: 30 }, { month: 'Jun', ticket: 35 },
    { month: 'Jul', ticket: 0 }, { month: 'Aug', ticket: 0 }, { month: 'Sep', ticket: 0 },
    { month: 'Oct', ticket: 0 }, { month: 'Nov', ticket: 0 }, { month: 'Dec', ticket: 0 },]

    let today = new Date();
    let month = today.getMonth();

    const data3: PieData = {
        dataSets: [{
            values: [{ value: 70 }, { value: 20 }, { value: 10 }],
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
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}></Text>
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
                <ScrollView horizontal style={{ flex: 1 }} >
                    <View style={styles.scrollView}>
                        {data.map((val, key) => (
                            <View key={key} style={styles.viewOne} >
                                {val.ticket == 0 ? (
                                    <View style={styles.circle} ></View>
                                ) : (
                                    <View style={[styles.lineOne, { height: val.ticket * 2 * heightScale }, month == key && { backgroundColor: '#FFF48D' }]} ></View>
                                )}
                                <Text style={{ color: 'white' }} >{val.month}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={{ alignItems:'center' }} >
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
                                <Image style={styles.rectangleStyle2} source={require('../../../assets/Rectangle4.png')} />
                                <Text style={[styles.fontStyle5, { marginHorizontal: 10 * heightScale }]} >합계: ₩ 1,000,000</Text>
                                <Image style={styles.rectangleStyle2} source={require('../../../assets/Rectangle4.png')} />
                            </View>
                            <View style={{ marginTop: 40 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../../assets/Rectangle5.png')} />
                                    <Text style={styles.fontStyle4}>Black: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../../assets/Rectangle6.png')} />
                                    <Text style={styles.fontStyle4}>Red: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
                                </View>
                            </View>

                            <View style={{ marginTop: 25 * heightScale }} >
                                <View style={[styles.marginLeft, { flexDirection: 'row' }]} >
                                    <Image style={styles.rectangleStyle} source={require('../../../assets/Rectangle.png')} />
                                    <Text style={styles.fontStyle4}>Yellow: 70%</Text>
                                </View>
                                <View style={styles.marginLeft} >
                                    <Text style={[styles.fontStyle3, styles.marginLeft]}>70장 →   ₩ 1,000,000</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingBottom: 50 * heightScale }} ></View>
            </ScrollView>
        </SafeAreaView>
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
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    scrollView: {
        height: 264 * heightScale,
        borderBottomColor: '#3D3D3D',
        borderBottomWidth: 5,
        paddingHorizontal: 20 * heightScale,
        flexDirection: 'row',
        paddingBottom: 20 * heightScale,
    },
    viewOne: {
        justifyContent: 'flex-end',
        marginRight: 28 * heightScale
    },
    circle: {
        width: 28 * heightScale,
        height: 28 * heightScale,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#CECED0',
        marginBottom: 10 * heightScale,
    },
    lineOne: {
        width: 28 * heightScale,
        borderRadius: 14 * heightScale,
        backgroundColor: '#C9C9C9'
    },
    rectangleStyle2: {
        // marginRight: 10 * heightScale,
        position: 'relative',
        top: 7 * heightScale,
    },
    fontStyle5: {
        color: 'white',
        fontSize: 22 * heightScale,
        fontWeight: '600',
    },
    marginLeft: {
        marginLeft: 26 * heightScale,
    },
    rectangleStyle: {
        marginRight: 10 * heightScale,
        position: 'relative',
        top: 4 * heightScale,
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
    fontStyle2: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16 * heightScale,
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
});

export default MonthCirculation
