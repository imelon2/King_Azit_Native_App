import React, { useState } from "react"
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { heightData } from '../../modules/globalStyles';
const { width } = Dimensions.get("window");
const heightScale = heightData;
import { useSpring, animated } from "@react-spring/native";

const AnimatedView = animated(View);

function Game() {
    const [activeIndex, setActiveIndex] = React.useState(1);

    function handleItemChange(nextIndex: any) {
        setActiveIndex(nextIndex);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <Text style={styles.fontStyle}>미니 게임</Text>
            </View>
            <View>
                {/* <TabBar
                    items={["Short Tab", "Looooooooooooooooooooooong Tab", "Nah"]}
                    activeIndex={activeIndex}
                    onItemChange={handleItemChange}
                    indicatorColor={colors[activeIndex]}
                    renderItem={(item, index) => (
                        <View
                            style={{
                                paddingHorizontal: 24,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 5
                            }}
                        >
                            <Text>{item}</Text>
                        </View>
                    )}
                /> */}
            </View>
        </SafeAreaView>
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

