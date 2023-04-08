import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const heightScale = heightData;
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../../AppInner';



function UserConsumption() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [month, setMonth] = useState<any>(0);

    const data = [{ month: 'Jan', ticket: 0 }, { month: 'Feb', ticket: 0 }, { month: 'Mar', ticket: 80 },
    { month: 'Apr', ticket: 20 }, { month: 'May', ticket: 30 }, { month: 'Jun', ticket: 35 },
    { month: 'Jul', ticket: 0 }, { month: 'Aug', ticket: 0 }, { month: 'Sep', ticket: 0 },
    { month: 'Oct', ticket: 0 }, { month: 'Nov', ticket: 0 }, { month: 'Dec', ticket: 0 },]

    const data2 = [{ name: 'Black Ticket', data: 60, len: 70 }, { name: 'Red Ticket', data: 60, len: 70 },
    { name: 'Gold  Ticket', data: 60, len: 70 }]


    const onClickLine = (month: any) => {
        setMonth(month);
    }

    useEffect(() => {
        let today = new Date();
        let month = today.getMonth();
        setMonth(month);
    }, [])


    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>유저 소모</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={styles.beforeIcon}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <ScrollView horizontal style={{ flex: 1 }} >
                <View style={styles.scrollView}>
                    {data.map((val, key) => (
                        <TouchableOpacity onPress={() => onClickLine(key)} activeOpacity={1} key={key} style={styles.viewOne} >
                            {val.ticket == 0 ? (
                                <View style={styles.circle} ></View>
                            ) : (
                                <View style={[styles.lineOne, { height: val.ticket * 2 * heightScale }, month == key && { backgroundColor: '#FFF48D' }]} ></View>
                            )}
                            <Text style={[{ color: 'white' }, month == key && { color: '#FFF48D' }]} >{val.month}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <View style={{ flex: 1.73 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10 * heightScale }} >
                    <Text style={styles.fontStyle2} >자세히 보기</Text>
                    <IconAntDesign
                        name="right"
                        size={heightScale * 14}
                        color="white"
                        style={styles.detailIcon}
                        onPress={() => navigation.navigate('UserConsumptionDetail')}
                    />
                </View>

                <View style={{ marginTop: 40 * heightScale, alignItems: 'center' }} >
                    {data2.map((val, key) => (
                        <View key={key} style={styles.ticketBox} >
                            <View style={{ flex: 1 }} >
                                <Image source={require('../../../assets/black_ticket.png')} />
                            </View>
                            <View style={{ flex: 2.5 }} >
                                <Text style={[styles.fontStyle2, { marginTop: 7 * heightScale }]} >{val.name}</Text>
                                <View style={[styles.lineOne2, { width: val.len * 2.3 * heightScale }]} ></View>
                            </View>
                            <View style={{ flex: 2.5, alignItems: 'flex-end' }} >
                                <Text style={[styles.fontStyle2, { marginTop: 6 * heightScale, fontWeight: '600', marginRight: 20 * heightScale }]} >{val.data}장</Text>
                                <Text style={[styles.fontStyle2, { marginTop: 17 * heightScale, marginRight: 20 * heightScale }]}>{val.len}%</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </View>
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
    fontStyle2: {
        color: 'white',
        fontSize: 16 * heightScale,
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    detailIcon: {
        marginRight: 10 * heightScale,
        position: 'relative',
        top: 4 * heightScale,
        marginLeft: 8 * heightScale,
    },
    scrollView: {
        height: 264 * heightScale,
        borderBottomColor: '#3D3D3D',
        borderBottomWidth: 5,
        paddingHorizontal: 20 * heightScale,
        flexDirection: 'row',
        paddingBottom: 20 * heightScale,
    },
    circle: {
        width: 28 * heightScale,
        height: 28 * heightScale,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: '#CECED0',
        marginBottom: 10 * heightScale,
    },
    viewOne: {
        justifyContent: 'flex-end',
        marginRight: 28 * heightScale
    },
    lineOne: {
        width: 28 * heightScale,
        borderRadius: 14 * heightScale,
        backgroundColor: '#C9C9C9'
    },
    ticketBox: {
        // flex:1,
        width: 390 * heightScale,
        height: 100 * heightScale,
        borderBottomColor: '#3D3D3D',
        borderBottomWidth: 1,
        paddingTop: 15 * heightScale,
        flexDirection: 'row',
    },
    lineOne2: {
        height: 9 * heightScale,
        backgroundColor: '#FFF48D',
        borderRadius: 14 * heightScale,
        marginTop: 26 * heightScale,
    },
});

export default UserConsumption
