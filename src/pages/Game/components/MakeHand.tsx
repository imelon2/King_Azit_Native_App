import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get("window");
const heightScale = heightData;



function MakeHand() {

    return (
        <View style={styles.container} >

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:428 * heightScale,
        height:293 * heightScale,
    },
});

export default MakeHand
