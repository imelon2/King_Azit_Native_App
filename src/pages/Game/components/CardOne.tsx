import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");
const heightScale = heightData;

export type cardType = {
    num: String,
    pattern: 'diamond' | 'heart' | 'spade' | 'clover',
    size:String
}

function CardOne(props: cardType) {
    const { num, pattern , size } = props
    const cardName = { diamond: 'cards-diamond', heart: 'cards-heart', spade: 'cards-spade', clover: 'cards-club' };
    const color = { diamond: '#EF473C', heart: '#EF473C', spade: '#373737', clover: '#373737' }

    return (
        <View style={[styles.card , size == 'small' && styles.card2  ]} >
            <View style={[styles.cardBorder, (pattern == 'diamond' || pattern == 'heart') && styles.cardBorder2]} >
                <Text style={[{ color: color[pattern]  } , styles.fontStyle , size == 'small' && styles.fontStyle2 ]} >{num}</Text>
                <View style={{  alignItems: 'center' }} >
                    <IconAntDesign
                        name={cardName[pattern]}
                        size={ size == 'small' ?  heightScale * 22 : heightScale * 35 }
                        color={color[pattern]}
                    />
                </View>
            </View>
        </View>
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
        borderWidth: 1,
        // justifyContent:'center',
       
    },
    cardBorder2: {
        borderColor: '#EF473C',
    },
    fontStyle:{
        fontSize: 18 * heightScale,
        fontWeight:'600',
        marginLeft: 5 * heightScale,
        marginTop: 3 * heightScale,
        // fontFamily:'Cinzel'
    },
    fontStyle2:{
        fontSize: 14 * heightScale,
        fontWeight:'600',
        marginLeft: 3 * heightScale,
        marginTop: 1 * heightScale,
        marginBottom: 4 * heightScale,
        // fontFamily:'Cinzel'
    }
});

export default CardOne
