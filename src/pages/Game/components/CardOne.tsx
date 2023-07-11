import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");
const heightScale = heightData;

export type cardType = {
    num: String,
    pattern: 'D' | 'H' | 'S' | 'C' | '',
    size: String
}

function CardOne(props: cardType) {
    const { num, pattern, size } = props
    const cardName = { D: 'cards-diamond', H: 'cards-heart', S: 'cards-spade', C: 'cards-club', '': '' };
    const color = { D: '#EF473C', H: '#EF473C', S: '#373737', C: '#373737', '': '#000' }

    return (
        <>
            {size === '' ? (
                <View style={[styles.card, { backgroundColor: '#292929' }]} >
                    <View style={[styles.cardBorder, styles.cardBorder3]} >
                        <Image style={styles.cardBack} source={require('../../../assets/MainLogo.png')} />
                    {/* MainLogo */}
                    </View>
                </View>
            ) : (
                <View style={[styles.card, size == 'small' && styles.card2]} >
                    <View style={[styles.cardBorder, (pattern == 'D' || pattern == 'H') && styles.cardBorder2]} >
                        <Text style={[{ color: color[pattern] }, styles.fontStyle, size == 'small' && styles.fontStyle2]} >{num}</Text>
                        <View style={{ alignItems: 'center' }} >
                            <IconAntDesign
                                name={cardName[pattern]}
                                size={size == 'small' ? heightScale * 22 : heightScale * 35}
                                color={color[pattern]}
                            />
                        </View>
                    </View>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: 62 * heightScale,
        height: 81 * heightScale,
        borderRadius: 4,
        // marginRight: 20 * heightScale,
        padding: 2 * heightScale,

    },
    card2: {
        width: 45 * heightScale,
        height: 60 * heightScale,
    },
    cardBorder: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
        borderColor: '#373737',
        borderWidth: 0.5,
        // justifyContent:'center',

    },
    cardBorder2: {
        borderColor: '#EF473C',
    },
    cardBorder3: {
        borderColor: '#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
    },
    fontStyle: {
        fontSize: 18 * heightScale,
        fontWeight: '600',
        marginLeft: 5 * heightScale,
        marginTop: 3 * heightScale,
        // fontFamily:'Cinzel'
    },
    fontStyle2: {
        fontSize: 14 * heightScale,
        fontWeight: '600',
        marginLeft: 3 * heightScale,
        marginTop: 1 * heightScale,
        marginBottom: 4 * heightScale,
        // fontFamily:'Cinzel'
    },
    cardBack: {
        resizeMode: 'cover',
        width: 44 * heightScale,
        height: 30 * heightScale,
    }
});

export default CardOne
