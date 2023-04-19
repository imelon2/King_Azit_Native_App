import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeRootStackParamList } from '../../../AppInner';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderStyle, heightData } from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import TicketManagement from './Components/TicketManagement'
import TicketHistory from './Components/TicketHistory'
import ProfileImg from '../../components/ProfileImg';
import Config from 'react-native-config';


const heightScale = heightData;
const { width } = Dimensions.get('window');
type UserDetailScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'UserDetail'>;



function UserDetail({ route }: UserDetailScreenProps) {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const { uuid, name,memberId,nickname } = route.params
    const [menu, setMenu] = useState(['charge', 'history', 'management']);
    const [status, setStatus] = useState('charge');
    const [modalStatus , setModalStatus] = useState(false);

    return (
        <SafeAreaView style={HeaderStyle.container} >
            <View>
                <View style={HeaderStyle.headerStyle}>
                    <Text style={HeaderStyle.headerFontStyle}>사용자</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={HeaderStyle.headerLeftIcon}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={{ flex: 1 }} >
                <Pressable style={styles.myInfoStyle} onPress={() => setModalStatus(true)}>
                        <ProfileImg style={styles.userIcon} source={Config.IMG_URL! + uuid} />
                    <View style={styles.infoWrapper}>
                        <Text style={[styles.fontStyle, { fontWeight: 'normal', fontSize: heightScale * 18 },]}>
                            {nickname}
                        </Text>
                        <Text style={[styles.fontStyle, { fontWeight: 'normal', fontSize: heightScale * 18, marginTop: 10 * heightScale },]}>
                            {memberId}
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>

                        <IconAntDesign
                            name="right"
                            size={heightScale * 28}
                            color="white"
                            onPress={() => navigation.navigate('UserInformation',route.params)}
                            />
                            </View>
                </Pressable>
            </View>
            <View style={{ flex: 3.6 }} >
                <View style={{ flexDirection: 'row' }} >
                    <View style={styles.menuBox} >
                        {menu.map((val, key) => (
                            <TouchableOpacity onPress={() => setStatus(val)} activeOpacity={1} key={key} style={[styles.menuTextBox, , status == val && styles.menuTextBox2]} >
                                <Text style={[styles.fontStyle2, status == 'charge' && styles.fontStyle3]} >{val == 'charge' && '티켓 충전 내역'}</Text>
                                <Text style={[styles.fontStyle2, status == 'history' && styles.fontStyle3]}>{val == 'history' && '티켓 소모 내역'}</Text>
                                <Text style={[styles.fontStyle2, status == 'management' && styles.fontStyle3]}>{val == 'management' && '티켓 관리'}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {status == "charge" && (
                    <TicketHistory status={status} uuid={route.params.uuid}/>
                )}
                
                {status == "history" && (
                    <TicketHistory status={status} uuid={route.params.uuid}/>
                )}

                {status == "management" && (
                    <TicketManagement userInfo={route.params}/>
                )}
            </View>
        {/* 
            <Modal isVisible={modalStatus} >
                <UserInformation setModalStatus={setModalStatus} data = {route.params.userData} state = 'exist' />
            </Modal> */}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    fontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white'
    },
    fontStyle2: {
        color: 'white',
        fontSize: 18 * heightScale,
    },
    fontStyle3: {
        color: '#F5FF82',

    },
    menuBox: {
        width: width,
        height: 60 * heightScale,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    myInfoStyle: {
        flexDirection: 'row',
        paddingHorizontal: heightScale * 25,
        marginVertical: heightScale * 42,
    },
    userIcon: {
        height: heightScale * 86,
        width: heightScale * 86,
        borderRadius: 100,
    },
    infoWrapper: {
        justifyContent: 'center',
        paddingHorizontal: heightScale * 29,
    },
    userInfoWrapper: {
        flexDirection: 'row',
    },
    menuTextBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: width / 3,
        borderBottomColor: '#353535',
        borderBottomWidth: 2,
        paddingBottom: 10 * heightScale,
    },
    menuTextBox2: {
        borderBottomColor: '#F5FF82',
        borderBottomWidth: 2,
    },
})
export default UserDetail;