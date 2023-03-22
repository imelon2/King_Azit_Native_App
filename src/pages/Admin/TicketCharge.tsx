import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, ScrollView, View, Keyboard, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeRootStackParamList, } from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { heightData } from '../../modules/globalStyles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CountBox from './Components/CountBox'
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign2 from 'react-native-vector-icons/Feather';

const heightScale = heightData;
const { width, height } = Dimensions.get('window');


function TicketCharge() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [nickname, setNickname] = useState<string>('');
    const [black, setBlack] = useState(0);
    const [red, setRed] = useState(0);
    const [gold, setGold] = useState(0);

    const [blackState, setBlackState] = useState(false);
    const [redState, setRedState] = useState(false);
    const [goldState, setGoldState] = useState(false);

    const onClickBlack = () => {
        if (black > 0) {
            setBlackState(true);
        }
    };

    const onClickRed = () => {
        if (red > 0) {
            setRedState(true);
        }
    };

    const onClickGold = () => {
        if (gold > 0) {
            setGoldState(true);
        }
    };


    const onChangeNicknane = useCallback((text: string) => {
        setNickname(text);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>티켓결제</Text>
                </View>
                <IconAntDesign
                    name="close"
                    size={heightScale * 32}
                    color="white"
                    style={{
                        position: 'absolute',
                        right: 12,
                        top: heightScale * 12,
                    }}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{ flex: 1 }} >
                <View style={styles.container1} >
                    <Text style={styles.fontStyle2} >티켓 충전 유저</Text>

                    <View style={styles.giftModalTextInput}>
                        <IconIonicons
                            name="search"
                            color={'#929292'}
                            size={heightScale * 24}
                        />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={onChangeNicknane}
                            placeholderTextColor={'#929292'}
                            style={styles.textInput}
                            placeholder="닉네임 검색"
                            value={nickname}
                        />
                    </View>
                </View>
            </View>
            <View style={{ flex: 3.2 }} >
                <View style={styles.container1} >
                    <Text style={styles.fontStyle2} >티켓 종류</Text>
                    <View style={styles.ticketBox} >
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Image
                                style={styles.ticketImg}
                                source={require(`../../assets/BlackCard.png`)} />
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 13 * heightScale, justifyContent: 'center' }} >
                            <View style={{ height: 76 * heightScale }}>
                                <Text style={styles.fontStyle3} >Black Ticket</Text>
                                <CountBox ticket={black} setTicket={setBlack} />
                            </View>
                        </View>
                        <View style={{ flex: 1.2, alignItems: 'flex-end' }} >
                            <TouchableOpacity activeOpacity={1} style={styles.shopButton} onPress={onClickBlack} >
                                <IconAntDesign
                                    name="shoppingcart"
                                    size={heightScale * 25}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ticketBox} >
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Image
                                style={styles.ticketImg}
                                source={require(`../../assets/RedTicket.png`)} />
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 13 * heightScale, justifyContent: 'center' }} >
                            <View style={{ height: 76 * heightScale }}>
                                <Text style={styles.fontStyle3} >Red Ticket</Text>
                                <CountBox ticket={red} setTicket={setRed} />
                            </View>
                        </View>
                        <View style={{ flex: 1.2, alignItems: 'flex-end' }} >
                            <TouchableOpacity activeOpacity={1} style={styles.shopButton} onPress={onClickRed} >
                                <IconAntDesign
                                    name="shoppingcart"
                                    size={heightScale * 25}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.ticketBox} >
                        <View style={{ flex: 1, justifyContent: 'center' }} >
                            <Image
                                style={styles.ticketImg}
                                source={require(`../../assets/GoldTicket.png`)} />
                        </View>
                        <View style={{ flex: 3, paddingHorizontal: 13 * heightScale, justifyContent: 'center' }} >
                            <View style={{ height: 76 * heightScale }}>
                                <Text style={styles.fontStyle3} >Gold Ticket</Text>
                                <CountBox ticket={gold} setTicket={setGold} />
                            </View>
                        </View>
                        <View style={{ flex: 1.2, alignItems: 'flex-end' }} >
                            <TouchableOpacity activeOpacity={1} style={styles.shopButton} onPress={onClickGold} >
                                <IconAntDesign
                                    name="shoppingcart"
                                    size={heightScale * 25}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.boxBorder} >
                </View>
            </View>
            <View style={{ flex: 1.5 }} >
                <View style={styles.container1} >
                    <Text style={styles.fontStyle4} >장바구니</Text>
                    <ScrollView style={{ marginBottom: 50 * heightScale }} bounces={false}>
                        {blackState && (
                            <View style={styles.shopBox} >
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <Image
                                        style={styles.ticketImg2}
                                        source={require(`../../assets/BlackTicket.png`)} />
                                    <Text style={styles.fontStyle5} >Black Ticket</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale }}>
                                    <Text style={styles.fontStyle5} >{black} 장</Text>
                                    <IconAntDesign2
                                        name="trash-2"
                                        size={heightScale * 25}
                                        style={{ marginLeft: 30 * heightScale }}
                                        color="white"
                                        onPress={() => setBlackState(false)}
                                    />
                                </View>
                            </View>
                        )}
                        {redState && (
                            <View style={styles.shopBox} >
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <Image
                                        style={styles.ticketImg2}
                                        source={require(`../../assets/RedTicket.png`)} />
                                    <Text style={styles.fontStyle5} >Red Ticket</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale }}>
                                    <Text style={styles.fontStyle5} >{red} 장</Text>
                                    <IconAntDesign2
                                        name="trash-2"
                                        size={heightScale * 25}
                                        style={{ marginLeft: 30 * heightScale }}
                                        color="white"
                                        onPress={() => setRedState(false)}
                                    />
                                </View>
                            </View>
                        )}
                        {goldState && (
                            <View style={styles.shopBox} >
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
                                    <Image
                                        style={styles.ticketImg2}
                                        source={require(`../../assets/GoldTicket.png`)} />
                                    <Text style={styles.fontStyle5} >Gold Ticket</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale }}>
                                    <Text style={styles.fontStyle5} >{gold} 장</Text>
                                    <IconAntDesign2
                                        name="trash-2"
                                        size={heightScale * 25}
                                        style={{ marginLeft: 30 * heightScale }}
                                        color="white"
                                        onPress={() => setGoldState(false)}
                                    />
                                </View>
                            </View>
                        )}

                    </ScrollView>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#121212',
    },
    container1: {
        paddingHorizontal: 24 * heightScale,
        paddingTop: 25 * heightScale,
    },
    fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
    fontStyle3: {
        fontSize: heightScale * 16,
        fontWeight: '400',
        color: 'white',
    },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#999999',
    },
    fontStyle2: {
        fontSize: heightScale * 18,
        fontWeight: '500',
        color: 'white',
        paddingBottom: heightScale * 20,
    },
    fontStyle4: {
        fontSize: heightScale * 18,
        fontWeight: '400',
        color: 'white',
        paddingBottom: heightScale * 20,
    },
    fontStyle5: {
        fontSize: heightScale * 16,
        marginLeft: 22 * heightScale,
        color: 'white',
    },
    giftModalTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: heightScale * 379,
        height: heightScale * 40,
        lineHeight: heightScale * 40,
        paddingHorizontal: 14 * heightScale,
        backgroundColor: '#414141',
        borderRadius: 19,
    },
    textInput: {
        color: '#ffffff',
        fontSize: heightScale * 16,
        marginLeft: 8 * heightScale,
        padding: 0,
        margin: 0,
    },
    ticketBox: {
        width: 380 * heightScale,
        height: 100 * heightScale,
        borderWidth: 1,
        borderColor: '#878B52',
        borderRadius: 10,
        marginBottom: 20 * heightScale,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    ticketImg: {
        width: 54 * heightScale,
        height: 76 * heightScale,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 4,
        marginLeft: 10 * heightScale,
    },
    ticketImg2: {
        width: 38 * heightScale,
        height: 52 * heightScale,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 4,
        marginLeft: 18 * heightScale,
    },
    shopButton: {
        width: 72 * heightScale,
        height: 100 * heightScale,
        backgroundColor: '#F5FF82',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxBorder: {
        width: width,
        height: 5,
        backgroundColor: '#363636',
    },
    shopBox: {
        width: 378 * heightScale,
        height: 73 * heightScale,
        borderRadius: 8,
        backgroundColor: 'rgba(99, 99, 99, 0.3)',
        borderColor: '#aaa',
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 20 * heightScale,
    },



});
export default TicketCharge;
