import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import CardOne from './CardOne'
import { Pattern } from "react-native-svg";
import BestHand from "./BestHand";
const { width } = Dimensions.get("window");
const heightScale = heightData;

export type cardType = {
    num: String,
    pattern: 'diamond' | 'heart' | 'spade' | 'clover' | '',
}
interface propsType {
    setHandModalStatus(bool: boolean): void;
    setBestHandData: any;
    bestHandData: any;
}


function MakeHand(props: propsType) {
    const { setBestHandData, bestHandData , setHandModalStatus } = props;

    const [cardMap, setCardMap] = useState<cardType[]>([{ num: '', pattern: 'spade' }, { num: '2', pattern: 'spade' }, { num: '3', pattern: 'spade' }, { num: '4', pattern: 'spade' }, { num: '5', pattern: 'spade' },
    { num: '', pattern: 'heart' }, { num: '6', pattern: 'spade' }, { num: '7', pattern: 'spade' }, { num: '8', pattern: 'spade' }, { num: '9', pattern: 'spade' },
    { num: '', pattern: 'diamond' }, { num: '10', pattern: 'spade' }, { num: 'J', pattern: 'spade' }, { num: 'Q', pattern: 'spade' }, { num: 'K', pattern: 'spade' },
    { num: '', pattern: 'clover' }, { num: 'A', pattern: 'spade' }, { num: '', pattern: '' }, { num: '', pattern: '' }, { num: '', pattern: '' }]
    );

    const cardName = { diamond: 'cards-diamond', heart: 'cards-heart', spade: 'cards-spade', clover: 'cards-club' };
    const color = { diamond: '#EF473C', heart: '#EF473C', spade: '#373737', clover: '#373737' }

    const line = [{}, {}, {}, {}];

    const onClickPattern = (pattern: any) => {
        let arr = cardMap;
        let result = [];

        for (let i = 0; i < arr.length; i++) {
            let one = arr[i];
            if (one.num != '' && one.pattern != '') {
                one.pattern = pattern
            }
            result.push(one);
        }
        setCardMap(result);
    }

    const onClickCard = (num: any, pattern: any) => {
        if (bestHandData.length == 5) {
            return;
        }

        let result = [];

        for (let i = 0; i < bestHandData.length; i++) {
            let one = bestHandData[i];
            result.push(one);
        }

        result.push({ num: num, pattern: pattern })

        setBestHandData(result);

    }

    return (
        <View style={styles.container} >
            {line.map((v, k) =>
                <View key={k} style={{ flexDirection: 'row' }} >
                    {cardMap.map((val, key) => (k * 5 <= key && (k + 1) * 5 > key) &&
                        <View style={styles.boxOne} key={key} >

                            {val.num == '' && val.pattern != '' && (
                                <TouchableOpacity onPress={() => onClickPattern(val.pattern)}  >
                                    <IconAntDesign
                                        name={cardName[val.pattern]}
                                        size={heightScale * 55}
                                        color={color[val.pattern]}
                                    />
                                </TouchableOpacity>
                            )}

                            {val.num != '' && val.pattern != '' && (
                                <TouchableOpacity onPress={() => onClickCard(val.num, val.pattern)} >
                                    <CardOne num={val.num} pattern={val.pattern} size='small' />
                                </TouchableOpacity>
                            )}

                            {key == 19 && (
                                <TouchableOpacity onPress={() => setHandModalStatus(false)} >
                                    <Text>[close]</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    )}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // position:'absolute',
        width: 428 * heightScale,
        height: 293 * heightScale,
        backgroundColor: '#121212',
        marginTop: 100 * heightScale,
        paddingLeft: 3 * heightScale,
        alignItems: 'center',
        justifyContent: 'center',

    },
    boxOne: {
        width: 80 * heightScale,
        height: 68 * heightScale,
        backgroundColor: '#aaa',
        marginRight: 3 * heightScale,
        marginTop: 3 * heightScale,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MakeHand
