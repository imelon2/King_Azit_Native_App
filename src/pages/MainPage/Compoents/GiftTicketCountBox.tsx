import React, { useCallback, useEffect, useState } from 'react';
import {  Pressable,  StyleSheet, Text, View,} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { heightData } from '../../../modules/globalStyles';
const heightScale = heightData;

interface propsType {
    ticket : number;
    max : number;
    setTicket(id: number): void
}

function GiftTicketCountBox(props: propsType) {
    // const [counts, setCount] = useState(0);
    const canAdd = props.ticket === 0 ? true : false;
    const canMius = props.ticket === props.max? true : false;

    return (
        <View style={styles.countBox}>
            <Pressable
                style={[styles.countButtonStyle, { borderRightWidth: 1, borderRightColor: '#787878' },]}
                onPress={() => props.setTicket(props.ticket - 1)}
                disabled={canAdd}>
                <IconAntDesign
                    size={heightScale * 16}
                    name="minus"
                    color={canAdd ? '#787878' : '#FFFFFF'}
                />
            </Pressable>
            {/* count */}
            <View style={{ flex: 1.5, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontSize: heightScale * 18, color: '#ffffff' }}>
                    {props.ticket}
                </Text>
            </View>
            {/* plus */}
            <Pressable style={[styles.countButtonStyle, { borderLeftWidth: 1, borderLeftColor: '#787878' },]}
                onPress={() => props.setTicket(props.ticket + 1)}
                disabled={canMius}
                >
                <IconAntDesign
                    size={heightScale * 16}
                    name="plus"
                    color={canMius ? '#787878' : '#FFFFFF'}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    countBox: {
        height: heightScale * 40,
        width: heightScale * 151,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#7B7B7B',
        backgroundColor:'#3C3C3C',
        borderRadius: 4,
        marginTop: 15 * heightScale,
    },
    countButtonStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GiftTicketCountBox;