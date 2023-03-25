import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TextInput } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import SwitchSelector from "react-native-switch-selector";
import BestHand from "./components/BestHand";
import Bingo from './components/Bingo'
const heightScale = heightData;




function Game() {
    const [tab, setTab] = useState('bingo');
    const options = [
        { label: "BINGO", value: "bingo" },
        { label: "BEST HAND", value: "hand" }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <Text style={styles.fontStyle}>미니 게임</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 * heightScale }} >
                <SwitchSelector
                    style={{ width: 390 * heightScale }}
                    options={options}
                    initial={0}
                    onPress={(value: string) => setTab(value)}
                    buttonColor={'#F5FF82'}
                    textColor={'#464646'}
                    selectedColor={'#000'}
                    backgroundColor={'#A8A7A7'}
                    hasPadding
                    height={48 * heightScale}
                />
            </View>
            {tab == 'hand' && (
                <BestHand />
            )}
            {tab == 'bingo' && (
                <Bingo />
            )}


        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
    },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#484848',
    },
    fontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: heightScale * 4.5,
    },
});

export default Game
