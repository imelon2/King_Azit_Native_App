import { useEffect, useState, useCallback } from 'react';
import { Image, StyleSheet, Text, View, TextInput, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, } from '../../../AppInner';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;


function MemberManagement() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [nickname, setNickname] = useState<string>('');
    const [modalStatus, setModalStatus] = useState(false);
    const [selectIndex, setSelectIndex] = useState<number>(0);

    const onChangeNicknane = useCallback((text: string) => {
        setNickname(text);
    }, []);

    const onClickUser = (key: number) => {
        if (dummyData[key].state == 'Approved') {
            navigation.navigate('UserDetail', { userData : dummyData[key]  });
        } else {
            setModalStatus(true);
        }
        setSelectIndex(key);
    }

    const dummyData = [{ name: '차원1', phone: '010-1234-1234', id: 'woncha', nickname: '한나퓌시', state: '', date: '2023.02.15' , email: 'hanagogi@email.com' , profileImage :''  },
    { name: '차원2', phone: '010-1234-1234', id: 'woncha', nickname: '한나퓌시', state: 'Approved', date: '2023.02.15'  , profileImage :''  , email: 'hanagogi@email.com'  },
    { name: '차원3', phone: '010-1234-1234', id: 'woncha', nickname: '한나퓌시', state: 'Deniend', date: '2023.02.15'  , profileImage :''   , email: 'hanagogi@email.com' }]

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>가입 신청 내역</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={styles.beforeIcon}
                    onPress={() => navigation.goBack()}
                />
            </View>
            <View style={{ alignItems: 'center' }} >
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
                <ScrollView style={{ marginBottom: 50 * heightScale, marginTop: 30 * heightScale }} >
                    {dummyData.map((val, key) => (
                        <TouchableOpacity onPress={() => onClickUser(key)} activeOpacity={1} style={styles.applicationBox} key={key} >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <View style={styles.playerIcon} ></View>
                            </View>
                            <View style={{ flex: 4, paddingLeft: 20 * heightScale }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <Text style={styles.fontStyle2} >{val.name}   </Text>
                                    {val.state == 'Approved' && (<View style={styles.Approved}>
                                        <Text style={styles.fontStyle4}>Approved</Text>
                                    </View>)}
                                    {val.state == 'Deniend' && (<View style={styles.Deniend}>
                                        <Text style={styles.fontStyle4}>Deniend</Text>
                                    </View>)}
                                </View>
                                <View>
                                    <Text style={styles.fontStyle3} >신청일: {val.date}</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: 'center' }} >
                                <IconAntDesign
                                    name="right"
                                    size={heightScale * 25}
                                    color="white"
                                    style={{ marginRight: 10 * heightScale }}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <Modal isVisible={modalStatus} >
                <SafeAreaView style={styles.container2}>
                    <View>
                        <View style={styles.headerStyle}>
                            <Text style={styles.fontStyle}>사용자</Text>
                        </View>
                        <IconAntDesign
                            name="left"
                            size={heightScale * 28}
                            color="white"
                            style={styles.beforeIcon}
                            onPress={() => setModalStatus(false)}
                        />
                    </View>
                    <View style={{ paddingHorizontal: 24 * heightScale, paddingTop: 40 * heightScale }} >

                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                                <Image source={require('../../assets/Rectangle.png')} />
                                <Text style={styles.fontStyle5} >이름</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                                <Image source={require('../../assets/Rectangle2.png')} />
                                <Text style={styles.fontStyle6} >{dummyData[selectIndex].name}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 28 * heightScale }} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                                <Image source={require('../../assets/Rectangle.png')} />
                                <Text style={styles.fontStyle5} >핸드폰 번호</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                                <Image source={require('../../assets/Rectangle2.png')} />
                                <Text style={styles.fontStyle6} >{dummyData[selectIndex].phone}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 28 * heightScale }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                                <Image source={require('../../assets/Rectangle.png')} />
                                <Text style={styles.fontStyle5} >아이디 (이메일)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                                <Image source={require('../../assets/Rectangle2.png')} />
                                <Text style={styles.fontStyle6} >{dummyData[selectIndex].id}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 28 * heightScale }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                                <Image source={require('../../assets/Rectangle.png')} />
                                <Text style={styles.fontStyle5} >닉네임</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                                <Image source={require('../../assets/Rectangle2.png')} />
                                <Text style={styles.fontStyle6} >{dummyData[selectIndex].nickname}</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: heightScale * 150, flexDirection: 'row' }}>
                            <View style={{ flex: 1, alignItems: 'flex-start' }} >
                                <View style={styles.buttonStyle} >
                                    <Text style={{ fontSize: 20 * heightScale, color: 'white' }} >거절</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end' }} >
                                <View style={styles.buttonStyle2} >
                                    <Text style={{ fontSize: 20 * heightScale, color: 'black' }} >승인</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#121212',
        paddingBottom: heightScale * 40
    },
    container2: {
        width: width,
        height: height,
        position: 'absolute',
        left: - 20,
        backgroundColor: '#121212',
    },
    fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
    fontStyle2: {
        fontSize: 18 * heightScale,
        color: 'white',
        marginTop: 15 * heightScale,
        fontWeight: '600',
    },
    fontStyle3: {
        fontSize: 14 * heightScale,
        color: 'white',
        marginTop: 6 * heightScale,
        // fontWeight:'600',
    },
    fontStyle4: {
        fontSize: 10 * heightScale,
        color: 'black',
        fontWeight: '500',
    },
    fontStyle5: {
        color: 'white',
        fontSize: 18 * heightScale,
        marginLeft: 10 * heightScale,
    },
    fontStyle6: {
        color: 'white',
        fontSize: 16 * heightScale,
        marginLeft: 8 * heightScale,
    },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#999999',
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    giftModalTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: heightScale * 379,
        height: heightScale * 40,
        lineHeight: heightScale * 40,
        paddingHorizontal: 14 * heightScale,
        backgroundColor: '#414141',
        marginTop: 15 * heightScale,
        // borderRadius: 19,
    },
    textInput: {
        color: '#ffffff',
        fontSize: heightScale * 16,
        marginLeft: 8 * heightScale,
        padding: 0,
        margin: 0,
    },
    applicationBox: {
        width: 390 * heightScale,
        height: 85 * heightScale,
        borderBottomColor: '#3D3D3D',
        borderBottomWidth: 1,
        borderLeftWidth: 3,
        borderLeftColor: '#D9D9D9',

        flexDirection: 'row',
    },
    playerIcon: {
        width: 44 * heightScale,
        height: 44 * heightScale,
        borderRadius: 50,
        backgroundColor: '#D9D9D9',
        marginLeft: 9 * heightScale,
    },
    Approved: {
        width: 63 * heightScale,
        height: 19 * heightScale,
        backgroundColor: '#F9F36B',
        borderRadius: 86,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 19 * heightScale,
    },
    Deniend: {
        width: 52 * heightScale,
        height: 19 * heightScale,
        backgroundColor: '#48E0EA',
        borderRadius: 86,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 19 * heightScale,
    },
    buttonStyle: {
        width: 166 * heightScale,
        height: 60 * heightScale,
        backgroundColor: '#222',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#F5FF82',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle2: {
        width: 166 * heightScale,
        height: 60 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: 40 * heightScale,
    },

})
export default MemberManagement;