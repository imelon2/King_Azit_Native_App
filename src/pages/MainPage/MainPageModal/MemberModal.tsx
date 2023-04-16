import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { roomType } from '../../../hooks/getGameList';
import Config from 'react-native-config';
import ProfileImg from '../../../components/ProfileImg';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
    setPlayMemberStatus(id: boolean): void
    selectedGameId:string;
}

function MemberModal(props: propsType) {
    const gameData:any = useSelector((state: RootState) => state.games);
    const currentGameData: roomType = gameData['constructor'][props.selectedGameId];

    return (
        <View style={styles.container} >
            <View>
                <Text style={styles.mainText} >플레이 중인 멤버</Text>
                <Icon
                    name="close"
                    style={styles.closeIcon}
                    size={20}
                    color="#fff"
                    onPress={() => props.setPlayMemberStatus(false)}
                />
                <View style={  styles.playerBox } >
                    {currentGameData.seat.map((v,key) => {
                        if(v?.nickname == null) return;
                        return (
                        <View key={key} >
                            <ProfileImg style={styles.player} source={Config.IMG_URL! + v?.uuid}/>
                        <Text style={styles.playerText}>{v?.nickname}</Text>
                    </View>
                    )})}
                </View>
            </View>
            <View>
                <Text style={styles.mainText} >싯아웃 멤버</Text>
            </View>

            <View style={  styles.playerBox } >
                    {Object.keys(currentGameData.sitout_users).map((v, key) => (
                        <View key={key} >
                            <ProfileImg style={styles.player} source={Config.IMG_URL! + currentGameData.sitout_users[v]}/>
                            <Text style={styles.playerText}>{v}</Text>
                        </View>
                    ))}
                </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height - 200 * heightScale,
        position: 'absolute',
        left: -20 * heightScale,
        bottom: -20* heightScale,
        borderTopRadius: 20,
        backgroundColor: '#353535',
        paddingHorizontal: 20 * heightScale,
    },
    mainText: {
        color: 'white',
        fontSize: 19 * heightScale,
        marginTop: 50 * heightScale,
        fontWeight: '600',
    },
    closeIcon: {
        position: 'absolute',
        right: 0,
        top: 15,
    },
    player: {
        width: 66 * heightScale,
        height: 66  * heightScale,
        marginTop: 20 * heightScale,
        marginLeft: 15* heightScale,
        marginRight: 15* heightScale,
        borderRadius:66 * heightScale
    },
    playerBox: {
        flexDirection: 'row' ,
        flexWrap: 'wrap' ,
        textAlign:'center',
    },
    playerText: {
        color:'white',
        marginTop: 10 * heightScale,
        textAlign:'center',
        fontSize: 14 * heightScale,
    }

});


export default MemberModal