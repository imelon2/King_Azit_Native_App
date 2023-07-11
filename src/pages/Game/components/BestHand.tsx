import React, { useState, useCallback, useEffect } from "react"
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/EvilIcons';
import CardOne, { cardType } from './CardOne'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MakeHand from "./MakeHand";
const heightScale = heightData;
import Config from 'react-native-config';
import axios from 'axios';


function BestHand() {
    const { roles } = useSelector((state: RootState) => state.user);
    const access_token = useSelector(
        (state: RootState) => state.user.access_token,
    );
    const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');

    const [modalStatus, setModalStatus] = useState(false);
    const [ncikModalStatus, setncikModalStatus] = useState(false);
    const [handModalStatus, setHandModalStatus] = useState(false);
    const [nickName, setNickName] = useState('닉네임');
    const [bestHand, setBestHand] = useState('');
    const [bestHandData, setBestHandData] = useState<cardType[]>([{ num: '', pattern: '', size: '' }, { num: '', pattern: '', size: '' },
    { num: '', pattern: '', size: '' }, { num: '', pattern: '', size: '' }, { num: '', pattern: '', size: '' }]);


    const onChangeBestHand = useCallback((text: any) => {
        setBestHand(text.trim());
    }, []);

    const onChangeNickName = useCallback((text: any) => {
        setNickName(text.trim());
    }, []);

    const onOpenBestHand = () => {
        setHandModalStatus(true);
        // setBestHandData([]);
    }

    const onSaveData = async () => {

        let result: any = {
            card1: "",
            card2: "",
            card3: "",
            card4: "",
            card5: "",
            nickname: ""
        };

        if (nickName == '닉네임') {
            Alert.alert('닉네임을 입력해 주세요');
            return;
        }

        result['nickname'] = nickName;

        for (let i = 0; i < bestHandData.length; i++) {
            let one = bestHandData[i];

            if (one.size == '') {
                Alert.alert('카드를 모두 입력해 주세요');
                return;
            }
            let num = one.num.toString();
            result["card" + (i + 1)] = one.pattern + numChage[num];
        }
        // console.log(result);

        try {
             axios.post(`${Config.API_URL}/admin/game/besthand`,result, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            // bestHand
        } catch (error) {
            console.log(error);
        }


    }

    // const cardData: cardType[] = [{ num: 'A', pattern: 'diamond' }, { num: 'A', pattern: 'spade' },
    // { num: 'A', pattern: 'clover' }, { num: '10', pattern: 'heart' }, { num: '10', pattern: 'spade' }];

    const numChage: any = {
        1: 'A', 11: 'J', 12: 'Q', 13: 'K', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10',
        A: '1', J: '11', Q: '12', K: '13'
    }

    // '1': 'A', '11': 'J', '12': 'Q', '13': 'K', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
    // 'A': '1', 'J': '11', 'Q': '12', 'K': '13'



    useEffect(() => {
        const getBestHand = async () => {
            try {
                const BestHand = await axios.get(`${Config.API_URL}/game/besthand`);
                if (BestHand.data.length == 0) {
                    let result: cardType[] = [];
                    for (let i = 1; i < 6; i++) {
                        let pattern_: 'D' | 'H' | 'S' | 'C' | '' = '';
                        let map = { num: '', pattern: pattern_, size: '' };
                        result.push(map);
                    }
                    setBestHandData(result);
                    setNickName('닉네임');
                    return;
                }
                setNickName(BestHand.data['nickname']);

                let result: cardType[] = [];

                for (let i = 1; i < 6; i++) {

                    let pattern_: 'D' | 'H' | 'S' | 'C' | '' = '';
                    let card = BestHand.data['card' + i];
                    let map = { num: '', pattern: pattern_, size: '' };
                    let one = card.substr(0, 1);
                    let two = card.substr(1, 2);
                    map['pattern'] = one;
                    map['num'] = numChage[two];
                    map['size'] = 'big';
                    result.push(map);
                }
                setBestHandData(result);

            } catch (error) {
                console.error(error);
            }
        };
        // getBestHand();
    }, [])

    return (
        <>
            <View style={{ flex: 2.6, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <Text style={styles.fontStyle2} >Kings Azit
                    </Text>
                    {isAdmin && (
                        <IconAntDesign
                            name="pencil"
                            size={heightScale * 17}
                            color="white"
                            onPress={() => setModalStatus(true)}
                        />
                    )}
                </View>
                <TouchableOpacity activeOpacity={1} onPress={() => onOpenBestHand()} style={{ flex: 3 }} >
                    <View style={{ alignItems: 'center' }} >
                        <View  >
                            <View style={{ flexDirection: 'row', width: 390 * heightScale, justifyContent: 'center', alignItems: 'center' }}>
                                {bestHandData.map((val, key) => (
                                    <View key={key} style={[key != 4 && { marginRight: 20 * heightScale }]} >
                                        <CardOne key={key} num={val.num} pattern={val.pattern} size={val.size} />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 * heightScale }} >
                        <Text style={styles.fontStyle3} >*Show-down 시 핸드만 기록 됩니다.</Text>
                        <Text style={styles.fontStyle3} >*매월 1일 12:00 정각 Prize 증정 및 초기화</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 4.2 }}>

                <View style={{ alignItems: 'center', paddingBottom: 130 * heightScale, marginTop: 40 * heightScale }} >
                    <Image style={styles.nameWing2} source={require('../../../assets/nameWing2.png')} />
                    <Image style={styles.nameWing1} source={require('../../../assets/nameWing1.png')} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >

                        <View style={styles.ImgView} ></View>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={styles.fontStyle4} >{nickName}</Text>
                            {isAdmin && (
                                <IconAntDesign
                                    name="pencil"
                                    size={heightScale * 20}
                                    color="white"
                                    style={{}}
                                    onPress={() => setncikModalStatus(true)}
                                />
                            )}
                        </View>
                    </View>
                </View>
                {isAdmin && (
                    <View style={{ alignItems: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={styles.buttonStyles} onPress={() => onSaveData()} >
                            <Text style={styles.fontStyle5} >변경하기</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <Modal isVisible={modalStatus} >
                <View style={styles.container2} >
                    <Text style={styles.fontStyle6} >BEST HAND</Text>
                    <IconAntDesign
                        name="close"
                        size={heightScale * 32}
                        color="white"
                        style={{
                            position: 'absolute',
                            right: heightScale * 19,
                            top: heightScale * 19,
                        }}
                        onPress={() => setModalStatus(false)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="텍스트를 입력해 주세요"
                        onChangeText={onChangeBestHand}
                        value={bestHand}
                        placeholderTextColor="#6F6F6F"
                    />
                    <View style={{ alignItems: 'center', marginTop: 90 * heightScale }} >
                        <View style={styles.buttonStyles} >
                            <Text style={styles.fontStyle5} >바꾸기</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={ncikModalStatus} >
                <View style={styles.container3} >
                    <Text style={styles.fontStyle6} >닉네임</Text>
                    <IconAntDesign
                        name="close"
                        size={heightScale * 32}
                        color="white"
                        style={{
                            position: 'absolute',
                            right: heightScale * 19,
                            top: heightScale * 19,
                        }}
                        onPress={() => setncikModalStatus(false)}
                    />

                    <View style={styles.giftModalTextInput}>
                        <IconIonicons
                            name="search"
                            color={'#929292'}
                            size={heightScale * 24}
                            style={styles.iconStyle}
                        />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={onChangeNickName}
                            placeholderTextColor={'#6F6F6F'}
                            style={styles.textInput}
                            placeholder="닉네임 검색"
                            value={nickName}
                        />
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 190 * heightScale }} >
                        <View style={styles.buttonStyles} >
                            <Text style={styles.fontStyle5} >바꾸기</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={handModalStatus} style={{ alignItems: 'center' }} >
                <MakeHand setBestHandData={setBestHandData} bestHandData={bestHandData} setHandModalStatus={setHandModalStatus} />
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    fontStyle2: {
        color: 'white',
        fontSize: 20 * heightScale,
        fontWeight: '600',
    },
    fontStyle3: {
        color: 'white',
        fontSize: 12 * heightScale,
    },
    fontStyle4: {
        color: 'white',
        fontSize: 22 * heightScale,
        marginLeft: 14 * heightScale
    },
    fontStyle5: {
        color: 'black',
        fontSize: 20 * heightScale,
    },
    fontStyle6: {
        color: 'white',
        fontSize: 18 * heightScale,
    },
    nameWing1: {
        position: 'absolute',
        left: 90 * heightScale,
        width: 30 * heightScale,
        height: 49 * heightScale,
    },
    nameWing2: {
        position: 'absolute',
        right: 90 * heightScale,
        width: 30 * heightScale,
        height: 49 * heightScale,
    },
    ImgView: {
        width: 54 * heightScale,
        height: 54 * heightScale,
        borderRadius: 100,
        backgroundColor: '#C4C4C4',
    },
    buttonStyles: {
        width: 188 * heightScale,
        height: 48 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 324 * heightScale,
        height: 48 * heightScale,
        borderRadius: 4,
        backgroundColor: '#414141',
        marginTop: 40 * heightScale,
        paddingHorizontal: 40 * heightScale,
    },
    container3: {
        width: 380 * heightScale,
        height: 430 * heightScale,
        backgroundColor: '#353535',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 25 * heightScale,
    },
    container2: {
        width: 380 * heightScale,
        height: 300 * heightScale,
        backgroundColor: '#353535',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 25 * heightScale,
    },
    giftModalTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        position: 'absolute',
        zIndex: 3,
        top: 50 * heightScale,
        left: 10 * heightScale,
    }
});

export default BestHand
