import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeRootStackParamList } from '../../../AppInner';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightData } from '../../modules/globalStyles';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import TicketManagement from './Components/TicketManagement'
import TicketHistory from './Components/TicketHistory'
import TicketCharge from './Components/TicketCharge'
import Modal from 'react-native-modal';
import UserInformation from './Components/UserInformation';



const heightScale = heightData;
const { width } = Dimensions.get('window');
type AdminScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'UserDetail'>;



function UserDetail({ route }: AdminScreenProps) {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const { profileImage, name, email } = route.params.userData;
    const [menu, setMenu] = useState(['charge', 'history', 'management']);
    const [status, setStatus] = useState('charge');
    const [modalStatus , setModalStatus] = useState(false);

    return (
        <SafeAreaView style={styles.container} >
            <View>
                <View style={styles.headerStyle}>
                    <Text style={styles.fontStyle}>사용자</Text>
                </View>
                <IconAntDesign
                    name="left"
                    size={heightScale * 28}
                    color="white"
                    style={styles.beforeIcon}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <View style={{ flex: 1 }} >
                <Pressable style={styles.myInfoStyle} onPress={() => setModalStatus(true)}>
                    <Pressable  >
                        <Image source={
                            profileImage
                                ? { uri: profileImage }
                                : require('../../assets/UserIcon.png')}
                            style={styles.userIcon}
                        />
                    </Pressable>
                    <View style={styles.infoWrapper}>
                        <Text style={[styles.fontStyle, { fontWeight: 'normal', fontSize: heightScale * 16 },]}>
                            {name}
                        </Text>
                        <Text style={[styles.fontStyle, { fontWeight: 'normal', fontSize: heightScale * 16, marginTop: 10 * heightScale },]}>
                            {email}
                        </Text>
                        <IconAntDesign
                            name="right"
                            size={heightScale * 28}
                            color="white"
                            style={{ position: 'absolute', right: -30, }}
                        // onPress={() => navigation.goBack()}
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
                    // <TicketCharge />
                    <TicketHistory />
                )}
                
                {status == "history" && (
                    <TicketHistory />
                )}

                {status == "management" && (
                    <TicketManagement />
                )}
            </View>

            <Modal isVisible={modalStatus} >
                <UserInformation setModalStatus={setModalStatus} data = {route.params.userData} state = 'exist' />
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
    beforeIcon: {
        position: 'absolute',
        marginTop: (heightScale * (61 - 28)) / 2,
        marginLeft: heightScale * 15,
    },
    myInfoStyle: {
        flexDirection: 'row',
        paddingHorizontal: heightScale * 25,
        marginVertical: heightScale * 42,
    },
    userIcon: {
        height: heightScale * 115,
        width: heightScale * 115,
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