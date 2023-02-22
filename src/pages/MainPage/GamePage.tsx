import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions , TextInput } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect , useState } from "react";
import { RootStackParamList } from "../../../AppInner";
import Modal from "react-native-modal";
import { widthData, heightData } from '../../modules/globalStyles';

const { width, height } = Dimensions.get('window');

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'GamePage'>

function GamePage({navigation}: MainScreenProps) {
    const [modalStatus, setModalStatus] = useState(true);

    return (
        <SafeAreaView>
            <View><Text>게임페이지</Text></View>
            <View style={{ flex: 1, alignItems: 'center' , flexDirection: 'row' }} >
                <Modal isVisible={modalStatus} >
                    <View style={styles.modalBox} >
                        
                        <Text style={styles.mainText} >임시 닉네임 설정</Text>
                        <TextInput
                        style={styles.textInput}
                        placeholder="입력"
                        />
                        <Text style={styles.textsub} > 설정할 닉네임을 입력해 주세요. (한글, 숫자, 영문2~8자) </Text>

                        <View style={{alignItems: 'center'}} >
                            <View style={styles.buttonBox} >
                                <TouchableOpacity activeOpacity={1} style={styles.button}>
                                    <Text style={styles.buttonText} > 중복확인 </Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={styles.button}>
                                    <Text style={styles.buttonText}> 확인 </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    modalBox: {
        width:  width - 80,
        height: heightData * 220,
        backgroundColor:'#C5C5C5',
        borderRadius: 15,
        position:'absolute',
        top: 160,
        left: 20,
        alignItems:'center',
    },
    mainText: {
        color:'#000',
        fontWeight:'600',
        fontSize: heightData * 18,
        textAlign: 'center',
        marginTop: heightData * 12,
        marginBottom: heightData * 18,
    },
    textInput: {
        width: heightData * 280,
        height: heightData * 40,
        backgroundColor:'#D9D9D9',
        lineHeight: heightData * 40,
        paddingLeft: 8,
        borderRadius: 3,
    },
    textsub: {
        color:'#000',
        fontSize: heightData * 11,
        marginTop: heightData * 9,
    },
    buttonBox: {
        width:  heightData * 280,
        flexDirection: 'row',
        marginTop: heightData * 40,
        alignItems:'center',
    },
    button: {
        width: heightData * 120,
        height: heightData * 45,
        backgroundColor: '#2C2A2A',
        borderRadius: 4,
        marginLeft: heightData * 13,
    },
    buttonText: {
       lineHeight: heightData * 45,
       color:'white',
       textAlign:'center',
       fontSize: heightData * 15,
    },
});


export default GamePage