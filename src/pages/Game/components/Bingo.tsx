import React, { useState, useCallback } from "react"
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
const { width } = Dimensions.get("window");
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import IconAntDesign from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
const heightScale = heightData;



function Bingo() {
    const { roles } = useSelector((state: RootState) => state.user);
    const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
    const [userModalStatus, setUserModalStatus] = useState(false);
    const [boxModalStatus, setBoxModalStatus] = useState(false);
    const [nickName, setNickName] = useState('');
    const [selectIndex, setSelectIndex] = useState(-1);
    const [mode, setMode] = useState(0);
    const [changeText, setChangeText] = useState('');
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');

    const onChangeNickName = useCallback((text: any) => {
        setNickName(text.trim());
    }, []);

    const onChangeText = useCallback((text: any) => {
        setChangeText(text.trim());
    }, []);

    const onChangeLeftText = useCallback((text: any) => {
        setLeftText(text.trim());
    }, []);

    const onChangeRightText = useCallback((text: any) => {
        setRightText(text.trim());
    }, []);

    const onClickChangeMode = () => {
        if (isAdmin) {
            if (mode == 0) {
                setMode(1);
            } else {
                setMode(0);
            }
        }
    }

    const onClickBingo = (index: number) => {
        setSelectIndex(index);
        if (isAdmin) {
            if (mode == 0)
                setUserModalStatus(true);

            if (mode == 1)
                setBoxModalStatus(true);
        }
    }

    const dummyData = [{ text: 'k 풀하우스', num: [] }, { text: '승리', num: [9, 2] }, { text: `풀하우스${'\n'}   패배`, num: [] }, { text: '승리', num: [9, 2] },
    { text: '패배', num: [] }, { text: '포카드', num: [] }, { text: 'Set 패배', num: [] }, { text: `      한방 ${'\n'} 스트레이트`, num: [] },
    { text: `  3인 이상 ${'\n'} 올인 승리`, num: [] }, { text: 'Suited 승리', num: ['Q', 10] }, { text: '승리', num: [2, 7] }, { text: `K High ${'\n'} 플러시`, num: [] },
    { text: ` 같은 컬러 ${'\n'}     승리`, num: ['K', 'K'] }, { text: '일주일 개근', num: [] }, { text: '패배', num: ['A', 'A'] }, { text: `      한방 ${'\n'}  풀하우스`, num: [] }];

    const line = [{}, {}, {}, {}];


    return (
        <View style={{ flex: 6, alignItems: 'center' }} >
            {line.map((v, k) =>
                <View key={k} style={{ flexDirection: 'row' }} >
                    {dummyData.map((val, key) => (k * 4 <= key && (k + 1) * 4 > key) &&
                        <TouchableOpacity onPress={() => onClickBingo(key)} activeOpacity={1} key={key} style={styles.bingoBox} >
                            {val.num.length > 0 && (
                                <View style={{ flexDirection: 'row' }} >
                                    {val.num.map((numval, numkey) =>
                                        <TouchableOpacity activeOpacity={1} style={[numkey == 0 && styles.cardBox2, styles.cardBox, mode == 1 && styles.cardBox3]} key={numkey} >
                                            <Text style={[styles.fontStyle2, mode == 1 && styles.fontStyle3]} >{numval}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                            <Text style={[styles.fontStyle, mode == 1 && styles.fontStyle3]} >{val.text}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}

            <View style={{ alignItems: 'center', marginTop: 70 * heightScale }} >
                <TouchableOpacity activeOpacity={1} style={styles.buttonStyles} onPress={() => onClickChangeMode()}  >
                    <Text style={styles.fontStyle5} >{mode == 0 ? (isAdmin ? '수정하기' : 'Bingo') : '변경'} </Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={userModalStatus} >
                <View style={styles.container3} >
                    <Text style={styles.fontStyle6} >달성 유저 검색</Text>
                    <IconAntDesign
                        name="close"
                        size={heightScale * 32}
                        color="white"
                        style={{
                            position: 'absolute',
                            right: heightScale * 19,
                            top: heightScale * 19,
                        }}
                        onPress={() => setUserModalStatus(false)}
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
                    <View style={{ alignItems: 'center', marginTop: 170 * heightScale }} >
                        <View style={styles.buttonStyles} >
                            <Text style={styles.fontStyle5} >등록하기</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={boxModalStatus} >
                <View style={styles.container2} >
                    <Text style={styles.fontStyle6} >칸 채우기</Text>
                    <IconAntDesign
                        name="close"
                        size={heightScale * 32}
                        color="white"
                        style={{
                            position: 'absolute',
                            right: heightScale * 19,
                            top: heightScale * 19,
                        }}
                        onPress={() => setBoxModalStatus(false)}
                    />


                    <View style={[styles.giftModalTextInput , { marginTop : 40 * heightScale } ]}>
                        <View style={styles.cardBox} >
                            <Text style={styles.fontStyle2} >L</Text>
                        </View>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={onChangeLeftText}
                            placeholderTextColor={'#6F6F6F'}
                            style={styles.textInput3}
                            placeholder="카드 텍스트 입력"
                            value={leftText}
                        />
                        <View style={[styles.cardBox , { marginLeft: 10 * heightData }]} >
                            <Text style={styles.fontStyle2} >R</Text>
                        </View>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={onChangeRightText}
                            placeholderTextColor={'#6F6F6F'}
                            style={styles.textInput3}
                            placeholder="카드 텍스트 입력"
                            value={rightText}
                        />
                    </View>

                    <View style={styles.giftModalTextInput}>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            onChangeText={onChangeText}
                            placeholderTextColor={'#6F6F6F'}
                            style={styles.textInput2}
                            placeholder="세부 텍스트 입력"
                            value={changeText}
                        />
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 70 * heightScale }} >
                        <View style={styles.buttonStyles} >
                            <Text style={styles.fontStyle5} >변경하기</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bingoBox: {
        width: 90 * heightScale,
        height: 90 * heightScale,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F5FF82',
        backgroundColor: '#373737',
        marginRight: 10 * heightScale,
        marginBottom: 10 * heightScale,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonStyles: {
        width: 188 * heightScale,
        height: 48 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fontStyle: {
        fontSize: 14 * heightScale,
        color: 'white',
    },
    fontStyle2: {
        color: 'black',
        fontSize: 12 * heightScale,
        fontWeight: '600',
    },
    fontStyle3: {
        color: '#F5FF82',
    },
    fontStyle5: {
        color: 'black',
        fontSize: 20 * heightScale,
    },
    fontStyle6: {
        color: 'white',
        fontSize: 18 * heightScale,
    },
    cardBox: {
        width: 21 * heightScale,
        height: 27 * heightScale,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333333',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardBox2: {
        marginRight: 5 * heightScale,
    },
    cardBox3: {
        backgroundColor: '#121212',
    },
    container2: {
        width: 380 * heightScale,
        height: 350 * heightScale,
        backgroundColor: '#353535',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 25 * heightScale,
    },
    container3: {
        width: 380 * heightScale,
        height: 388 * heightScale,
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
    },
    textInput: {
        width: 324 * heightScale,
        height: 48 * heightScale,
        borderRadius: 4,
        backgroundColor: '#414141',
        marginTop: 40 * heightScale,
        paddingHorizontal: 40 * heightScale,
    },
    textInput2: {
        width: 324 * heightScale,
        height: 48 * heightScale,
        borderRadius: 4,
        backgroundColor: '#414141',
        marginTop: 20 * heightScale,
        paddingHorizontal: 10 * heightScale,
    },
    textInput3: {
        width: 130 * heightScale,
        height: 48 * heightScale,
        borderRadius: 4,
        backgroundColor: '#414141',
        paddingHorizontal: 10 * heightScale,
        marginLeft: 5 * heightScale,
    }


});

export default Bingo
