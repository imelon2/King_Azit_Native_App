import { Image, StyleSheet, Text, View, TextInput, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
    setModalStatus(id: boolean): void
    data: any
    state: string
}

function UserInformation(props: propsType) {
    const { data, setModalStatus, state } = props
    return (
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
                        <Image source={require('../../../assets/Rectangle.png')} />
                        <Text style={styles.fontStyle5} >이름</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle2.png')} />
                        <Text style={styles.fontStyle6} >{data.name}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 28 * heightScale }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle.png')} />
                        <Text style={styles.fontStyle5} >핸드폰 번호</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle2.png')} />
                        <Text style={styles.fontStyle6} >{data.phone}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 28 * heightScale }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle.png')} />
                        <Text style={styles.fontStyle5} >아이디 (이메일)</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle2.png')} />
                        <Text style={styles.fontStyle6} >{data.id}</Text>
                    </View>
                </View>

                <View style={{ marginTop: 28 * heightScale }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle.png')} />
                        <Text style={styles.fontStyle5} >닉네임</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                        <Image source={require('../../../assets/Rectangle2.png')} />
                        <Text style={styles.fontStyle6} >{data.nickname}</Text>
                    </View>
                </View>
                {state == 'exist' && (
                    <View style={{ marginTop: 28 * heightScale }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4 * heightScale }} >
                            <Image source={require('../../../assets/Rectangle.png')} />
                            <Text style={styles.fontStyle5} >가입일</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 * heightScale }} >
                            <Image source={require('../../../assets/Rectangle2.png')} />
                            <Text style={styles.fontStyle6} >{data.date}</Text>
                        </View>
                    </View>
                )}

                {state == 'new' && (
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
                )}

                {state == 'exist' && (
                    <View style={{ marginTop: heightScale * 150, flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={styles.buttonStyle2} >
                            <Text style={styles.fontStyle2} >회원탈퇴</Text>
                        </View>
                    </View>
                )}

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container2: {
        width: width,
        height: height,
        left: - heightScale * 22,
        backgroundColor: '#121212',
    },
    headerStyle: {
        height: heightScale * 61,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#999999',
    },
    fontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white'
    },
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
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
    fontStyle2: {
        color: 'black',
        fontSize: 20 * heightScale,
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

});

export default UserInformation;