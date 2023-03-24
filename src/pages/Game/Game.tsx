import React, { useState, Fragment } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/EvilIcons';
import SwitchSelector from "react-native-switch-selector";
import CardOne, { cardType } from './components/CardOne'
import { Pattern } from "react-native-svg";

const { width } = Dimensions.get("window");
const heightScale = heightData;




function Game() {
    const [tab, setTab] = useState('');

    const options = [
        { label: "BINGO", value: "bingo" },
        { label: "BEST HAND", value: "hand" }
    ];

    const cardData : cardType[]  = [{ num: 'A', pattern: 'diamond' }, { num: 'A', pattern: 'spade' },
    { num: 'A', pattern: 'clover' }, { num: '10', pattern: 'heart' }, { num: '10', pattern: 'spade' }];

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
            <View style={{ flex: 2.6, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <Text style={styles.fontStyle2} >Kings Azit
                    </Text>
                    <IconAntDesign
                        name="pencil"
                        size={heightScale * 17}
                        color="white"
                    // onPress={() => navigateFunc()}
                    />
                </View>
                <View style={{ flex: 3, alignItems: 'center' }} >
                    <View style={{ flexDirection: 'row', width: 390 * heightScale }} >
                        {cardData.map((val, key) => (
                            <CardOne key={key} num={val.num} pattern={val.pattern} />
                        ))}
                    </View>
                </View>
            </View>
            <View style={{ flex: 4.2 }}></View>
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
    fontStyle2: {
        color: 'white',
        fontSize: 20 * heightScale,
        fontWeight: '600',
    },
});

export default Game
