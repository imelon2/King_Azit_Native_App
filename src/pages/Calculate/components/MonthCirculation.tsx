import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get("window");
const heightScale = heightData;

interface propsType {
    setModalStatus(id: boolean): void
}


function MonthCirculation(props: propsType) {


    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}></Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={styles.beforeIcon}
                    onPress={() => props.setModalStatus(false)}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#121212',
        position: 'absolute',
        left: -20,
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
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
});

export default MonthCirculation
