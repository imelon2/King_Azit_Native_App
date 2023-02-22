import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
    setPlayMemberStatus(id: boolean): void
}

function MemberModal(props: propsType) {
    const [playMember, setPlayMember] = useState([1,2,3,4,5,6 , 7]);
    const [outMember, setoutMember] = useState([1,2,3,4]);

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
                    {playMember.map((v, key) => (
                        <View>
                            <Image  style={styles.player} source={ require('../../assets/UserIcon2.png')} />
                            <Text style={styles.playerText}> 플레이어 </Text>
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <Text style={styles.mainText} >싯아웃 멤버</Text>
            </View>

            <View style={  styles.playerBox } >
                    {outMember.map((v, key) => (
                        <View>
                            <Image  style={styles.player} source={ require('../../assets/UserIcon2.png')} />
                            <Text style={styles.playerText}> 플레이어 </Text>
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
        left: -20,
        bottom: 0,
        borderRadius: 20,
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