import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../AppInner';
import React, { useEffect, useState, useCallback } from "react";
import { RootStackParamList } from "../../../AppInner";
import Modal from "react-native-modal";
import { widthData, heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const heightScale = heightData;

const { width, height } = Dimensions.get('window');


function RoomMake() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [selectDrop, setSelectDrop] = useState(false);
    const [tiketSelectDrop, setTiketSelectDrop] = useState(false);

    const [table, setTable] = useState('No.1');
    const [gameType, setGameType] = useState('main');
    const [buyin, setBuyin] = useState('');
    const [entey, setEntry] = useState('');
    const [tiket, setTiket] = useState('Ticket');
    const [status, setStatus] = useState('progress');


    const onChangeBuyin = useCallback((text: any) => {
        setBuyin(text.trim());
    }, []);

    const onClickTicket = useCallback((text: any) => {
        setTiket(text.trim());
        setTiketSelectDrop(false);
    }, []);

    const onChangeEntry = useCallback((text: any) => {
        setEntry(text.trim());
    }, []);



    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            >
                <View>
                    <View style={styles.headerStyle}>
                        <Text style={styles.fontStyle}>방만들기</Text>
                    </View>
                    <IconAntDesign
                        name="left"
                        size={heightScale * 28}
                        color="white"
                        style={{
                            position: 'absolute',
                            marginTop: (heightScale * (61 - 28)) / 2,
                            marginLeft: heightScale * 15,
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                {selectDrop && (
                    <View style={styles.selectBox} >
                        <TouchableOpacity onPress={() => setSelectDrop(false)} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                            <Text style={styles.tableSelectText}>Table NO.1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectDrop(false)} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                            <Text style={styles.tableSelectText}>Table NO.1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectDrop(false)} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                            <Text style={styles.tableSelectText}>Table NO.1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectDrop(false)} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                            <Text style={styles.tableSelectText}>Table NO.1</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={{ flex: 1, paddingHorizontal: 18 * heightScale }} >
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Table</Text>
                        <TouchableOpacity onPress={() => setSelectDrop(!selectDrop)} activeOpacity={1} style={styles.tableSelect} >
                            <Text style={styles.tableSelectText}>Table No. 1</Text>
                            <IconAntDesign
                                name="down"
                                size={heightScale * 25}
                                color="#F5FF82"
                                style={styles.downIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Game Type</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={() => setGameType('main')} style={[styles.touchBox, gameType == 'main' && styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, gameType == 'main' && styles.tableSelectText3]} >Main Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGameType('nft')} style={[styles.touchBox, styles.marginLeft, gameType == 'nft' && styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, gameType == 'nft' && styles.tableSelectText3]} >NFT Game</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setGameType('custom')} style={[styles.touchBox, styles.marginLeft, gameType == 'custom' && styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, gameType == 'custom' && styles.tableSelectText3]} >Custom</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Buy-in</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <View>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter"
                                    onChangeText={onChangeBuyin}
                                    value={buyin}
                                    keyboardType={'decimal-pad'}
                                    // returnKeyType="next" // next key로 변환
                                    // onSubmitEditing={() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                                    placeholderTextColor="#6F6F6F"
                                />
                            </View>
                            <TouchableOpacity onPress={() => setTiketSelectDrop(!selectDrop)} activeOpacity={1} style={styles.tableSelect2} >
                                <Text style={styles.tableSelectText}>{tiket}</Text>
                                <IconAntDesign
                                    name="down"
                                    size={heightScale * 25}
                                    color="#F5FF82"
                                    style={styles.downIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {tiketSelectDrop && (
                        <View style={styles.selectBox2} >
                            <TouchableOpacity onPress={() => onClickTicket('Black Ticket')} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                                <Text style={styles.tableSelectText}>Black Ticket</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickTicket('Red Ticket')} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                                <Text style={styles.tableSelectText}>Red Ticket</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onClickTicket('Gold Ticket')} activeOpacity={1} style={{ flex: 1, zIndex: 2 }}>
                                <Text style={styles.tableSelectText}>Gold Ticket</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Entry</Text>
                        <View>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Enter"
                                onChangeText={onChangeEntry}
                                value={entey}
                                keyboardType={'number-pad'}
                                // returnKeyType="next" // next key로 변환
                                // onSubmitEditing={() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                                placeholderTextColor="#6F6F6F"
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Blind Duration</Text>
                        <View>
                            <TouchableOpacity style={[styles.touchBox, styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, styles.tableSelectText3]} >8 Mins</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <Text style={styles.mainText} >Status</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <TouchableOpacity onPress={() => setStatus('progress')} style={[styles.touchBox, status == 'progress' && styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, status == 'progress' && styles.tableSelectText3]} >진행중</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setStatus('loading')} style={[styles.touchBox, styles.marginLeft, status == 'loading' && styles.touchBox2]} >
                                <Text style={[styles.tableSelectText2, status == 'loading' && styles.tableSelectText3]} >대기중</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ justifyContent:'center',alignItems:'center' }} >
                        <TouchableOpacity style={styles.buttonStyle} >
                            <Text style={styles.buttonTextStyle} > 방만들기 </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
    },
    fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#484848',
    },
    mainText: {
        fontSize: 18 * heightScale,
        fontWeight: '600',
        color: 'white',
        marginTop: 25 * heightScale,
    },
    tableSelect: {
        backgroundColor: '#222',
        width: 208 * heightScale,
        height: 44 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        // lineHeight: 44 * heightScale,
        marginTop: 20 * heightScale,
    },
    tableSelectText: {
        lineHeight: 42 * heightScale,
        color: 'white',
        paddingLeft: 14 * heightScale,
    },
    tableSelectText2: {
        lineHeight: 42 * heightScale,
        color: 'white',
        textAlign: 'center',
        // fontWeight:'500'
    },
    tableSelectText3: {
        color: 'black',
    },
    downIcon: {
        position: 'absolute',
        right: 12 * heightScale,
        top: (44 * heightScale - 25) / 2
    },
    selectBox: {
        position: 'absolute',
        top: 176 * heightScale,
        left: 18 * heightScale,
        width: 208 * heightScale,
        height: 177 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#222',
        zIndex: 5,
    },
    touchBox: {
        width: 110 * heightScale,
        height: 44 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 20 * heightScale,
        backgroundColor: '#222',
    },
    touchBox2: {
        backgroundColor: '#F5FF82'
    },
    marginLeft: {
        marginLeft: 20 * heightScale,
    },
    TextInput: {
        borderColor: '#f5ff82',
        borderWidth: 1,
        borderRadius: 6,
        width: 128 * heightScale,
        height: 44 * heightScale,
        paddingLeft: 10 * heightScale,
        marginTop: 20 * heightScale,
        backgroundColor: '#222',
        color:'white'
    },
    tableSelect2: {
        backgroundColor: '#222',
        width: 154 * heightScale,
        height: 44 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 20 * heightScale,
        marginLeft: 20 * heightScale,
    },
    selectBox2: {
        position: 'absolute',
        top: 338 * heightScale,
        left: 167 * heightScale,
        width: 154 * heightScale,
        height: 133 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#222',
        zIndex: 5,
    },
    buttonStyle: {
        backgroundColor: '#F5FF82',
        width: 390 * heightScale,
        height: 64 * heightScale,
        borderColor: '#F5FF82',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 23 * heightScale,
    },
    buttonTextStyle:{
        lineHeight: 64 * heightScale,
        fontSize: 20 * heightScale,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default RoomMake