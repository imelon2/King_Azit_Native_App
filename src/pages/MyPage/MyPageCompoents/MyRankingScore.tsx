import React from 'react';
import { StyleSheet, Text, View,Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MyPageRootStackParamList } from '../../../../AppInner';
import { heightData } from '../../../modules/globalStyles';
const heightScale = heightData;

const MyRankingScore = ({ ...props }) => {
    const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let RankingData = {
        '1st': { number: 3, pts: 122 },
        '2nd': { number: 2, pts: 4 }, '3rd': { number: 3, pts: 2 },
        tournament: { number: 7, pts: 2 }, totalData: {}
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>

            <View style={styles.headerStyle}>
                <Text style={styles.fontStyle}>총 누적 승점</Text>
            </View>
            <IconAntDesign
                name="left"
                size={heightScale * 28}
                color="white"
                style={styles.beforeIcon}
                onPress={() => navigation.goBack()}
                />
                </View>

            <View style={styles.mainContainer} >
                <Text style={styles.mainText} >{year}년 {month}월</Text>
            </View>

            <View style={{ alignItems: 'center' }} >
                <View style={styles.scoreBox} >
                    <View style={{ flex: 1 , flexDirection: 'row' }} >
                        <Image style={styles.crownIcon} source={require('../../../assets/1st_crown.png')} />
                        <Text style={styles.scoreText} > 1st Place </Text>
                    </View>

                    <View style={{ flex: 1 , flexDirection: 'row' ,marginLeft: 50 * heightScale }} >
                        <Text style={styles.scoreText}>{RankingData['1st'].number}회</Text>
                        <Text style={styles.scoreText}>{RankingData['1st'].pts} pts</Text>
                    </View>
                </View>

                <View style={styles.scoreBox} >
                    <View style={{ flex: 1 , flexDirection: 'row' }} >
                        <Image style={styles.crownIcon} source={require('../../../assets/2nd_crown.png')} />
                        <Text style={styles.scoreText} > 2nd Place </Text>
                    </View>

                    <View style={{ flex: 1 , flexDirection: 'row' ,marginLeft: 50 * heightScale }} >
                        <Text style={styles.scoreText}>{RankingData['2nd'].number}회</Text>
                        <Text style={styles.scoreText}>{RankingData['2nd'].pts} pts</Text>
                    </View>
                </View>

                <View style={styles.scoreBox} >
                    <View style={{ flex: 1 , flexDirection: 'row' }} >
                        <Image style={styles.crownIcon} source={require('../../../assets/3rd_crown.png')} />
                        <Text style={styles.scoreText} > 3rd Place </Text>
                    </View>

                    <View style={{ flex: 1 , flexDirection: 'row' ,marginLeft: 50 * heightScale }} >
                        <Text style={styles.scoreText}>{RankingData['3rd'].number}회</Text>
                        <Text style={styles.scoreText}>{RankingData['3rd'].pts} pts</Text>
                    </View>
                </View>

                <View style={styles.scoreBox} >
                    <View style={{ flex: 1 , flexDirection: 'row' }} >
                        <Image style={[styles.crownIcon , styles.tournament]} source={require('../../../assets/tournament.png')} />
                        <Text style={styles.scoreText} >토너먼트 </Text>
                    </View>

                    <View style={{ flex: 1 , flexDirection: 'row' ,marginLeft: 50 * heightScale }} >
                        <Text style={styles.scoreText}>{RankingData.tournament.number}위</Text>
                        <Text style={styles.scoreText}>{RankingData.tournament.pts} pts</Text>
                    </View>
                </View>

                <View style={styles.totalBox}  >
                    <Image style={styles.totalImg} source={require('../../../assets/tournament.png')} />
                    <View style={styles.totalTextBox} >
                        <Text style={styles.totalText}>현재 월간 랭킹: 1위</Text>
                        <Text style={styles.totalText2}>총 누적 승점: 24점</Text>
                    </View>
               
                </View>
            </View>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#121212',
        paddingBottom: heightScale * 40
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
    mainContainer: {
        padding: 23 * heightScale,
    },
    mainText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18 * heightScale,
        marginTop: 10 * heightScale,

    },
    scoreBox: {
        backgroundColor: '#393939',
        borderRadius: 12,
        width: 380 * heightScale,
        height: 70 * heightScale,
        marginTop: 6 * heightScale,
        borderColor: 'rgba(120, 120, 120, 1)',
        borderWidth: 1,
        flexDirection:'row',
    },
    crownIcon: {
        marginTop: (heightScale * (70 - 35)) / 2,
        width: 36 * heightScale,
        height: 35 * heightScale,
        marginLeft: 20 * heightScale,
    },
    tournament: {
        width: 41 * heightScale,
        height: 41 * heightScale,
    },
    scoreText: {
        color: 'white',
        lineHeight: 70 * heightScale,
        marginLeft: 22 * heightScale,
    },
    totalBox: {
        backgroundColor: '#393939',
        borderRadius: 12,
        width: 380 * heightScale,
        height: 170 * heightScale,
        marginTop: 30 * heightScale,
        borderColor: 'rgba(120, 120, 120, 1)',
        borderWidth: 1,
        flexDirection:'row',
    },
    totalImg: {
        width: 135 * heightScale,
        height: 135 * heightScale,
        marginTop: (heightScale * (170 - 135)) / 2,
        marginLeft: 15 * heightScale,
    },
    totalTextBox: {
        marginLeft:  20 * heightScale,
        height: 48 * heightScale,
        marginTop: (heightScale * (170 - 48)) / 2,
    },
    totalText:{
        fontSize: 19* heightScale,
        fontWeight: '600',
        color:'white',
        textAlign:'center'
    },
    totalText2:{
        fontSize: 17* heightScale,
        // fontWeight: '600',
        color:'white',
        textAlign:'center',
        marginTop: 4* heightScale,
    },
})

export default MyRankingScore;
