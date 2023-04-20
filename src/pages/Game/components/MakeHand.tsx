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
    pattern: 'D' | 'H' | 'S' | 'C' | '',
}
interface propsType {
    setHandModalStatus(bool: boolean): void;
    setBestHandData: any;
    bestHandData: any;
}


function MakeHand(props: propsType) {
    const { setBestHandData, bestHandData, setHandModalStatus } = props;

    const [cardMap, setCardMap] = useState<cardType[]>([{ num: '', pattern: 'S' }, { num: '2', pattern: 'S' }, { num: '3', pattern: 'S' }, { num: '4', pattern: 'S' }, { num: '5', pattern: 'S' },
    { num: '', pattern: 'H' }, { num: '6', pattern: 'S' }, { num: '7', pattern: 'S' }, { num: '8', pattern: 'S' }, { num: '9', pattern: 'S' },
    { num: '', pattern: 'D' }, { num: '10', pattern: 'S' }, { num: 'J', pattern: 'S' }, { num: 'Q', pattern: 'S' }, { num: 'K', pattern: 'S' },
    { num: '', pattern: 'C' }, { num: 'A', pattern: 'S' }, { num: '', pattern: '' }, { num: '', pattern: '' }, { num: '', pattern: '' }]
    );

    const cardName = { D: 'cards-diamond', H: 'cards-heart', S: 'cards-spade', C: 'cards-club', '': '' };
    const color = { D: '#EF473C', H: '#EF473C', S: '#373737', C: '#373737' }

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

        let result = [];
        let push = false;

        for (let i = 0; i < bestHandData.length; i++) {
            let one = bestHandData[i];
            if (push == false && one.size == '') {
                result.push({ num: num, pattern: pattern, size: 'big' })
                push = true;
            } else {
                result.push(one);
            }
        }

        setBestHandData(result);

    }

    const onclickDelete = () => {

        let card = 0;
        let result = [];
        for (let i = 0; i < bestHandData.length; i++) {
            let one = bestHandData[i];
            
            if ( one.size != '') {
                card++;
            }
            result.push(one);
        }

        if ( card == 0 ) { 
            return;
        }

        result[card - 1] = { num: '', pattern: '', size: ''   }        

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

                            {key == 18 && (
                                <TouchableOpacity onPress={() => onclickDelete()} >
                                    <Text>[delete]</Text>
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
