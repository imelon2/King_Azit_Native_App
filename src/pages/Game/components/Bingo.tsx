import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
const { width } = Dimensions.get("window");
const heightScale = heightData;



function Bingo() {
    const dummyData = [{ text: 'k 풀하우스', num: [] }, { text: '승리', num: [9, 2] }, { text: `풀하우스${'\n'}   패배`, num: [] }, { text: '승리', num: [9, 2] },
    { text: '패배', num: [] }, { text: '포카드', num: [] }, { text: 'Set 패배', num: [] }, { text: `      한방 ${'\n'} 스트레이트`, num: [] },
    { text: `  3인 이상 ${'\n'} 올인 승리`, num: [] }, { text: 'Suited 승리', num: ['Q', 10] }, { text: '승리', num: [2, 7] }, { text: `K High ${'\n'} 플러시`, num: [] },
    { text: ` 같은 컬러 ${'\n'}     승리`, num: ['K', 'K'] }, { text: '일주일 개근', num: [] }, { text: '패배', num: ['A', 'A'] }, { text: `      한방 ${'\n'}  풀하우스`, num: [] }];

    const line = [{}, {}, {}, {}];


    return (
        <View style={{ flex: 6, alignItems: 'center' }} >
            {line.map((v, k) =>
                <View key={k} style={{ flexDirection: 'row' }} >
                    {dummyData.map((val, key) => (k * 4 <= key && (k + 1) * 4 > key) &&
                        <View key={key} style={styles.bingoBox} >
                            {val.num.length > 0 && (
                                <View style={{ flexDirection:'row'  }} >
                                    {val.num.map((numval, numkey) =>
                                        <View style={[numkey == 0 && styles.cardBox2 , styles.cardBox ]} key={numkey} >
                                            <Text style={styles.fontStyle2} >{numval}</Text>
                                        </View>
                                    )}
                                </View>
                            )}
                            <Text style={styles.fontStyle} >{val.text}</Text>
                        </View>
                    )}
                </View>
            )}

            <View style={{ alignItems: 'center', marginTop: 70 * heightScale }} >
                <View style={styles.buttonStyles} >
                    <Text style={styles.fontStyle5} >변경하기</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bingoBox: {
        width: 90 * heightScale,
        height: 90 * heightScale,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F5FF82',
        backgroundColor: '#373737',
        marginRight: 10 * heightScale,
        marginBottom: 10 * heightScale,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyles: {
        width: 188 * heightScale,
        height: 48 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontStyle: {
        fontSize: 14 * heightScale,
        color: 'white',
    },
    fontStyle2: {
        color: 'black',
        fontSize: 12 * heightScale,
        fontWeight:'600',
    },
    fontStyle5: {
        color: 'black',
        fontSize: 20 * heightScale,
    },
    cardBox: {
        width: 21 * heightScale,
        height: 27 * heightScale,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#fff',
        alignItems:'center' , 
        justifyContent:'center',
    },
    cardBox2:{
        marginRight: 5 * heightScale,
    }


});

export default Bingo
