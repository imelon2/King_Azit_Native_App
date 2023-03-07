import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign2 from 'react-native-vector-icons/Entypo';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, MyPageRootStackParamList } from '../../../AppInner';
import { heightData } from '../../modules/globalStyles';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { Icon } from 'react-native-vector-icons/Icon';
const heightScale = heightData;

function Ranking() {
    const [status, setStatus] = useState('month');
    const [myNum, setMyNum] = useState(3);
    const [rankingData, setRankingData] = useState([{ ranking: 1, name: '한나피쉬', point: 25, status: 'up' }, { ranking: 2, name: '한나피쉬', point: 24, status: '' }
        , { ranking: 3, name: '한나피쉬', point: 23, status: 'up' }, { ranking: 4, name: '한나피쉬', point: 22, status: 'down' }
        , { ranking: 5, name: '한나피쉬', point: 21, status: '' }, { ranking: 6, name: '한나피쉬', point: 20, status: 'down' }
        , { ranking: 7, name: '한나피쉬', point: 19, status: 'up' }, { ranking: 8, name: '한나피쉬', point: 18, status: 'down' }
        , { ranking: 9, name: '한나피쉬', point: 17, status: 'down' }, { ranking: 10, name: '한나피쉬', point: 16, status: '' }]
    );

    const animation = useRef(new Animated.Value(1)).current;

    Animated.timing(animation, {
        toValue: 4, // 어떤 값으로 변경할지 - 필수
        duration: 1000, // 애니메이션에 걸리는 시간(밀리세컨드) - 기본값 500
        delay: 0, // 딜레이 이후 애니메이션 시작 - 기본값 0
        useNativeDriver: true, // 네이티브 드라이버 사용 여부 - 필수
        isInteraction: true, // 사용자 인터랙션에 의해 시작한 애니메이션인지 지정 - 기본값 true

        // easing: Easing.inOut(Easing.ease), // 애니메이션 속서 변경 함수 - 기본값 Easing.inOut(Easing.ease)
    }).start(() => {
        // 애니메이션 처리 완료 후 실행할 작업
    })


    const animationStyles = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg']
                })
            }
        ]
    };

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
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >moomoo</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>30pts</Text>
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
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >케토피이1234</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>35pts</Text>
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
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale }} >moomoo</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14 * heightScale, marginTop: 2 * heightScale, fontWeight: '600' }}>30pts</Text>
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

                            {rankingData.map((v: any, key) => (
                                <View style={[styles.rankingLineOne, myNum == key && styles.rankingLineOne2]} key={key} >
                                    <View style={styles.lineRankingImg} ></View>
                                    <View style={styles.RankingTextBox}  ><Text style={[styles.lineText, myNum == key && styles.lineText2]} >{v.ranking}</Text></View>
                                    <View style={styles.imgBox} >
                                        <Image style={styles.userIcon} source={require('../../assets/UserIcon.png')} />
                                    </View>
                                    <View style={{ marginLeft: 20 * heightScale }} ><Text style={[styles.lineText, myNum == key && styles.lineText2]} >{v.name}</Text></View>
                                    <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                        <Text style={[styles.menuText, styles.marginRight, styles.lineText, myNum == key && styles.lineText2]}>{v.point}</Text>
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