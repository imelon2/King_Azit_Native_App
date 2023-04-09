import React, { useState, useCallback } from "react"
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/EvilIcons';
import CardOne, { cardType } from './CardOne'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import MakeHand from "./MakeHand";
const heightScale = heightData;


function BestHand() {
    const { roles } = useSelector((state: RootState) => state.user);
    const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');

    const [modalStatus, setModalStatus] = useState(false);
    const [ncikModalStatus, setncikModalStatus] = useState(false);
    const [handModalStatus, setHandModalStatus] = useState(false);
    const [nickName, setNickName] = useState('');
    const [bestHand, setBestHand] = useState('');
    const [bestHandData, setBestHandData] = useState<cardType[]>([]);


    const onChangeBestHand = useCallback((text: any) => {
        setBestHand(text.trim());
    }, []);

    const onChangeNickName = useCallback((text: any) => {
        setNickName(text.trim());
    }, []);

    const onOpenBestHand = () => {
        setHandModalStatus(true);
        setBestHandData([]);
    }


    // const cardData: cardType[] = [{ num: 'A', pattern: 'diamond' }, { num: 'A', pattern: 'spade' },
    // { num: 'A', pattern: 'clover' }, { num: '10', pattern: 'heart' }, { num: '10', pattern: 'spade' }];

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
                <View style={{ flex: 3 }} >
                    <View style={{ alignItems: 'center' }} >
                        <View  >
                            {bestHandData.length != 0 ? (
                                <View style={{ flexDirection: 'row', width: 390 * heightScale, justifyContent: 'center', alignItems: 'center' }}>
                                    {bestHandData.map((val, key) => (
                                        <View style={[key != 4 && { marginRight: 20 * heightScale }]} >
                                            <CardOne key={key} num={val.num} pattern={val.pattern} size='big' />
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View  >
                                    <Text style={styles.fontStyle2} >현재 등록된 Best Hand가 없습니다.</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    {bestHandData.length != 0 && (
                        <View style={{ marginTop: 10 * heightScale }} >
                            <Text style={styles.fontStyle3} >*Show-down 시 핸드만 기록 됩니다.</Text>
                            <Text style={styles.fontStyle3} >*매월 1일 12:00 정각 Prize 증정 및 초기화</Text>
                        </View>
                    )}
                </View>
            </View>
            <View style={{ flex: 4.2 }}>

                <View style={{ alignItems: 'center', paddingBottom: 130 * heightScale, marginTop: 40 * heightScale }} >
                    <Image style={styles.nameWing2} source={require('../../../assets/nameWing2.png')} />
                    <Image style={styles.nameWing1} source={require('../../../assets/nameWing1.png')} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >

                        <View style={styles.ImgView} ></View>
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={styles.fontStyle4} >닉네임</Text>
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
                        <TouchableOpacity activeOpacity={1} style={styles.buttonStyles} onPress={() => onOpenBestHand()} >
                            <Text style={styles.fontStyle5} >채우기</Text>
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
