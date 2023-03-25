import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");
const heightScale = heightData;

export type cardType = {
    num: String,
    pattern: 'diamond' | 'heart' | 'spade' | 'clover',
}

function CardOne(props: cardType) {
    const { num, pattern } = props
    const cardName = { diamond: 'cards-diamond', heart: 'cards-heart', spade: 'cards-spade', clover: 'cards-club' };
    const color = { diamond: '#EF473C', heart: '#EF473C', spade: '#373737', clover: '#373737' }

    return (
        <View style={styles.card} >
            <View style={[styles.cardBorder, (pattern == 'diamond' || pattern == 'heart') && styles.cardBorder2]} >
                <Text style={[{ color: color[pattern]  } , styles.fontStyle]} >{num}</Text>
                <View style={{  alignItems: 'center' }} >
                    <IconAntDesign
                        name={cardName[pattern]}
                        size={heightScale * 35}
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
    }
});

export default CardOne
