import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, Pressable , TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeRootStackParamList } from '../../../AppInner';
import { heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
const heightScale = heightData;



function MemberManagePage() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();

    const onClickBox = (text : String) => {
        let result = text.trim();
        navigation.navigate('MemberManagement',{status:result});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>멤버 관리</Text>
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
                <TouchableOpacity onPress={() => onClickBox('new')} activeOpacity={1} style={styles.selectBox} >
                    <View style={{ flex: 1 }} >
                        <View style={{ paddingLeft: 22 * heightScale, flex: 1 }} >
                            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                                <Text style={styles.fontStyle2}>신규 멤버 관리</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-start' }} >
                                <Text style={styles.fontStyle3}>신규 유저 긍인 및 거절</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <IconAntDesign
                            name="right"
                            size={heightScale * 32}
                            color="white"
                            style={{ position: 'absolute', right: 10 }}
                        // onPress={() => navigation.goBack()}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClickBox('exist')} activeOpacity={1} style={styles.selectBox} >
                    <View style={{ paddingLeft: 22 * heightScale, flex: 1 }} >
                        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                            <Text style={styles.fontStyle2}>기존 멤버 관리</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }} >
                            <Text style={styles.fontStyle3}>유저 상세 및 티켓 내역</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <IconAntDesign
                            name="right"
                            size={heightScale * 32}
                            color="white"
                            style={{ position: 'absolute', right: 10 }}
                        // onPress={() => navigation.goBack()}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onClickBox('admin')} activeOpacity={1} style={styles.selectBox} >
                    <View style={{ paddingLeft: 22 * heightScale, flex: 1 }} >
                        <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                            <Text style={styles.fontStyle2}>어드민 멤버 관리</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start' }} >
                            <Text style={styles.fontStyle3}>어드민 추가 및 삭제 </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                        <IconAntDesign
                            name="right"
                            size={heightScale * 32}
                            color="white"
                            style={{ position: 'absolute', right: 10 }}
                        // onPress={() => navigation.goBack()}
                        />
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#121212',
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
    fontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white'
    },
    selectBox: {
        width: 380 * heightScale,
        height: 85 * heightScale,
        borderWidth: 1,
        borderColor: '#A3A95E',
        borderRadius: 4,
        marginTop: 15 * heightScale,
        flexDirection: 'row',
    },
    fontStyle2: {
        fontSize: 18 * heightScale,
        fontWeight: '600',
        color: 'white',
        marginBottom: 1 * heightScale,
    },
    fontStyle3: {
        fontSize: 14 * heightScale,
        fontWeight: '400',
        color: 'white',
        marginTop: 5 * heightScale,
    },
})
export default MemberManagePage;