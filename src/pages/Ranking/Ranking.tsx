import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightData } from '../../modules/globalStyles';
import { useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import Config from 'react-native-config';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
const heightScale = heightData;

function Ranking() {
    type DataType = {
        nickname: String,
        ranking: String,
        points: String
    };
    const Data = {
        nickname: '',
        ranking: '',
        points: ''
    };


    const [status, setStatus] = useState('month');
    const [myName, setNickName] = useState('');
    const [monthData, setMonthData] = useState<[DataType, DataType, DataType]>([Data, Data, Data]);
    const [weekData, setWeekData] = useState<[DataType, DataType, DataType]>([Data, Data, Data]);

    const access_token = useSelector((state: RootState) => state.user.access_token);

    // const { nickName } = useSelector((state: RootState) => state.user);
    // setNickName(nickName);

    useEffect(() => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth() + 1;
        let date = today.getDate();
        let day = year + '-' + month + '-' + date;
        getMonth(day);
        getWeek(day);

    }, []);

    const getMonth = (day: String) => {
        const getmon = async (day: String) => {
            try {
                const getTicketsResult = await axios.get(
                    `${Config.API_URL}/member/ranking/monthly?date=${day}`,
                    {
                        headers: {
                            authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                setMonthData(getTicketsResult.data);
            } catch (error) {
                console.error(error);
            }
        };
        getmon(day);
    }
    const getWeek = (day: String) => {
        const week = async (day: String) => {
            try {
                const getTicketsResult = await axios.get(
                    `${Config.API_URL}/member/ranking/weekly?date=${day}`,
                    {
                        headers: {
                            authorization: `Bearer ${access_token}`,
                        },
                    },
                );
                setWeekData(getTicketsResult.data);
            } catch (error) {
                console.error(error);
            }
        };
        week(day);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center' }} >
                <Image style={styles.bannerBoxPostion} source={require('../../assets/bannerImg.png')} />

                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={{ flex: 1 }} ></View>
                    <View style={{ flex: 1, marginTop: heightScale * 36, marginRight: heightScale * 28, }}>
                        <Text style={styles.bannerText} > 킹스리그 2월 예상 프라이즈 </Text>
                        <Text style={styles.bannerText2} > 월간 랭킹 | 블랙티켓 10장</Text>
                    </View>
                </View>

            </View>
            <View style={{ flex: 2.3, alignItems: 'center', paddingVertical: 10 * heightScale, flexDirection: 'row' }} >
                <Image style={{ position: 'absolute', width: '100%', height: '100%', resizeMode: 'stretch' }} source={require('../../assets/ranking_bg.png')} />
                <View style={{ flex: 1 }} >
                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }} >
                        <Image style={styles.playerCrown2} source={require('../../assets/2_crown.png')} />
                        <Image style={styles.playerRound2} source={require('../../assets/2_round.png')} />
                        <Image style={styles.playerImg2} source={require('../../assets/2_img.png')} />
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', paddingBottom: 38 * heightScale }} >
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >
                                {status == 'week' && weekData[1].nickname}{status == 'month' && monthData[1].nickname}
                            </Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>
                                {status == 'week' && weekData[1].points}{status == 'month' && monthData[1].points} pts
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }} >
                        <Image style={styles.playerCrown} source={require('../../assets/1_crown.png')} />
                        <Image style={styles.playerRound} source={require('../../assets/1_round.png')} />
                        <Image style={styles.playerImg} source={require('../../assets/1_img.png')} />
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', paddingBottom: 30 * heightScale }} >
                            <Image style={styles.nameWing1} source={require('../../assets/nameWing1.png')} />
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >
                                {status == 'week' && weekData[0].nickname}{status == 'month' && monthData[0].nickname}
                            </Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>
                                {status == 'week' && weekData[0].points}{status == 'month' && monthData[0].points} pts
                            </Text>
                            <Image style={styles.nameWing2} source={require('../../assets/nameWing2.png')} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row' }} >
                        <Image style={styles.playerCrown2} source={require('../../assets/3_crown.png')} />
                        <Image style={styles.playerRound2} source={require('../../assets/3_round.png')} />
                        <Image style={styles.playerImg2} source={require('../../assets/3_img.png')} />
                        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', paddingBottom: 38 * heightScale }} >
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >
                                {status == 'week' && weekData[2].nickname}{status == 'month' && monthData[2].nickname}
                            </Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>
                                {status == 'week' && weekData[2].points}{status == 'month' && monthData[2].points} pts
                            </Text>
                        </View>
                    </View>
                </View>

            </View>
            <View style={{ flex: 3.7, alignItems: 'center' }} >
                <View style={styles.rankingBox} >
                    <View style={{ flex: 1, flexDirection: 'row' }} >
                        <TouchableOpacity activeOpacity={1} onPress={() => setStatus('month')} >
                            <Text style={status == 'month' ? styles.monthText : styles.monthText2} >월간</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={1} onPress={() => setStatus('week')} >
                            <Text style={status == 'week' ? styles.weekText : styles.weekText2}>주간</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10 }} >
                        <ScrollView
                            showsHorizontalScrollIndicator={false} >
                            <View style={styles.RankingTop} >
                                <View style={{ flex: 1, flexDirection: 'row' }} >
                                    <Text style={styles.menuText} >순위</Text>
                                    <Text style={styles.menuText}>유저</Text>
                                </View>
                                <View style={{ flex: 5, alignItems: 'flex-end' }} >
                                    <Text style={[styles.menuText, styles.marginRight]}>Pts</Text>
                                </View>
                            </View>

                            {status == "month" && monthData.map((v: any, key) => (
                                <View style={[styles.rankingLineOne, myName == v.nickName && styles.rankingLineOne2]} key={key} >
                                    <View style={styles.lineRankingImg} ></View>
                                    <View style={styles.RankingTextBox} ><Text style={[styles.lineText, myName == v.nickName && styles.lineText2]} >{v.ranking}</Text></View>
                                    <View style={styles.imgBox} >
                                        <Image style={styles.userIcon} source={require('../../assets/UserIcon.png')} />
                                    </View>
                                    <View style={{ marginLeft: 20 * heightScale }} ><Text style={[styles.lineText, myName == v.nickName && styles.lineText2]} >{v.nickname}</Text></View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <Text style={[styles.menuText, styles.marginRight, styles.lineText, myName == v.nickName && styles.lineText2]}>{v.points}</Text>
                                    </View>

                                </View>
                            ))}


                            {status == "week" && weekData.map((v: any, key) => (
                                <View style={[styles.rankingLineOne, myName == v.nickName && styles.rankingLineOne2]} key={key} >
                                    <View style={styles.lineRankingImg} ></View>
                                    <View style={styles.RankingTextBox} ><Text style={[styles.lineText, myName == v.nickName && styles.lineText2]} >{v.ranking}</Text></View>
                                    <View style={styles.imgBox} >
                                        <Image style={styles.userIcon} source={require('../../assets/UserIcon.png')} />
                                    </View>
                                    <View style={{ marginLeft: 20 * heightScale }} ><Text style={[styles.lineText, myName == v.nickName && styles.lineText2]} >{v.nickname}</Text></View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <Text style={[styles.menuText, styles.marginRight, styles.lineText, myName == v.nickName && styles.lineText2]}>{v.points}</Text>
                                    </View>

                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#121212',
        // paddingBottom: heightScale * 40
    },
    fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#999999',
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    bannerBoxPostion: {
        position: 'absolute',
        width: 390 * heightScale,
        height: 94 * heightScale,
        borderRadius: 10,
        marginTop: 15 * heightScale,
    },
    bannerText: {
        color: 'white',
        fontSize: 16 * heightScale,
        textAlign: 'center',
        fontWeight: '800',
    },
    bannerText2: {
        color: 'white',
        fontSize: 14 * heightScale,
        textAlign: 'center',
        marginTop: 3 * heightScale,
    },
    scoreIcon: {
        position: 'absolute',
        right: 10 * heightScale,
        marginTop: (heightScale * (105 - 30)) / 2,
    },
    scoreText: {
        color: '#fff',
        fontSize: 19 * heightScale,
        marginTop: 15 * heightScale,
        marginLeft: 10 * heightScale,
    },
    scoreText2: {
        color: '#fff',
        fontSize: 29 * heightScale,
        fontWeight: '600',
        marginLeft: 55 * heightScale,
    },
    monthText: {
        color: 'white',
        marginLeft: 10 * heightScale,
        fontSize: 20 * heightScale,
    },
    monthText2: {
        color: '#797979',
        marginLeft: 10 * heightScale,
        fontSize: 20 * heightScale,
    },
    weekText: {
        color: 'white',
        marginLeft: 35 * heightScale,
        fontSize: 20 * heightScale,
    },
    weekText2: {
        color: '#797979',
        marginLeft: 35 * heightScale,
        fontSize: 20 * heightScale,
    },
    calendarStyle: {
        position: 'absolute',
        right: 50 * heightScale,
    },
    menuText: {
        color: 'white',
        marginLeft: 20 * heightScale,
        fontSize: 14 * heightScale,
    },
    rankingBox: {
        width: 389 * heightScale,
        height: '100%',
    },
    marginRight: {
        marginRight: 53 * heightScale,
    },
    rankingLineOne: {
        width: '100%',
        height: 50 * heightScale,
        borderColor: '#3D3D3D',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    rankingLineOne2: {
        width: '100%',
        height: 50 * heightScale,
        borderColor: '#3D3D3D',
        borderBottomWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#F5FF82'
    },
    lineText: {
        color: 'white',
        fontSize: 18 * heightScale,
        lineHeight: 50 * heightScale,
        marginLeft: 3 * heightScale,
        textAlign: 'center',
    },
    lineText2: {
        color: 'black'
    },
    lineRankingImg: {
        width: 20 * heightScale,
        height: '100%',
    },
    userIcon: {
        height: heightScale * 30,
        width: heightScale * 30,
        borderRadius: 100,
        // marginLeft: heightScale * 20,
        marginTop: (heightScale * (50 - 30)) / 2,
        // resizeMode: 'center',
    },
    RankingTextBox: {
        width: 25 * heightScale,
    },
    imgBox: {
        width: 25 * heightScale,
        alignItems: 'center',
        marginLeft: 20 * heightScale
    },
    RankingTop: {
        borderColor: '#3D3D3D',
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingTop: 15 * heightScale,
        paddingBottom: 10 * heightScale,
    },
    playerImg: {
        position: 'absolute',
        top: 34,
        left: (width / 3 - 112) / 2,
        width: 112 * heightScale,
        height: 112 * heightScale,
        resizeMode: 'contain',
    },
    playerRound: {
        position: 'absolute',
        top: 27,
        left: (width / 3 - 128) / 2 + 1,
        width: 128 * heightScale,
        height: 128 * heightScale,
        resizeMode: 'contain',
    },
    playerCrown: {
        position: 'absolute',
        top: 5,
        left: (width / 3 - 29) / 2,
        width: 29 * heightScale,
        height: 23 * heightScale,
        resizeMode: 'contain',
    },


    playerImg2: {
        position: 'absolute',
        top: 64,
        left: (width / 3 - 74) / 2,
        width: 74 * heightScale,
        height: 74 * heightScale,
        resizeMode: 'contain',
    },
    playerRound2: {
        position: 'absolute',
        top: 56,
        left: (width / 3 - 90) / 2,
        width: 90 * heightScale,
        height: 90 * heightScale,
        resizeMode: 'contain',
    },
    playerCrown2: {
        position: 'absolute',
        top: 35,
        left: (width / 3 - 18) / 2,
        width: 18 * heightScale,
        height: 14 * heightScale,
        resizeMode: 'contain',
    },



    animatView: {
        position: 'absolute',
        top: 1,
        left: 1,
        width: 128 * heightScale,
        height: 128 * heightScale,
    },

    nameWing1: {
        position: 'absolute',
        right: 110 * heightScale,
        width: 30 * heightScale,
        height: 49 * heightScale,
    },
    nameWing2: {
        position: 'absolute',
        left: 110 * heightScale,
        width: 30 * heightScale,
        height: 49 * heightScale,
    },
});

export default Ranking