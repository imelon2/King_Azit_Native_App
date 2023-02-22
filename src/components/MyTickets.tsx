import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {  heightData } from '../modules/globalStyles';
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/AntDesign';
import { Shadow } from 'react-native-shadow-2';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
    setTiketModalStatus(id: boolean) : void 
}

function MyTickets(props:propsType) {

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <View style={{ flex: 1, alignItems: 'center' }} >
                    <Text style={styles.headerText}>My Tickets</Text>
                    <Icon
                        name="close"
                        style={styles.closeIcon}
                        size={20}
                        color="#fff"
                        onPress={() => props.setTiketModalStatus(false)}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center', flex: 12 }} >
                <View>

                    <Video
                        source={{ uri: "https://uploads-ssl.webflow.com/624b2c0795c4aab84ebe3296/624c5f468ac8f85e6acd1a08_kings%20NFT%203-transcode.mp4" }}
                        style={styles.tiket}
                        paused={false} // 재생/중지 여부
                        resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                        // onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
                        repeat={true} // video가 끝나면 다시 재생할 지 여부
                    // onAnimatedValueUpdate={() => {}}
                    />

                    <View style={styles.qrbox} >
                    </View>

                    <View style={styles.plusTextBox} >
                        <View style={{ flexDirection:'row' , alignItems: 'center' }} >
                            <Text style={styles.plusText} >QR 크게보기</Text>
                            <Image
                                source={ require('../assets/MagnifyingGlassPlus.png')}
                                style={styles.plusIcon}
                                />
                        </View>    
                    </View>

                    <View style={ styles.buttonContaner } >
                        <View style={styles.buttonBox} >
                            <Shadow distance={6} startColor={'#FCFF72'} >
                                <TouchableOpacity activeOpacity={1} style={styles.giftButton} >
                                    <View style={styles.textCenter} >
                                        <Icon
                                            name="gift"
                                            size={16} 
                                            style={styles.iconStyle} />
                                        <Text style={styles.giftButtonText}>선물하기</Text>
                                    </View>
                                </TouchableOpacity>
                            </Shadow>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        position: 'absolute',
        left: -20,
        backgroundColor: '#000',
    },
    header: {
        flex: 1,
        borderBottomColor: '#5A5A5A',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 19 * heightScale,
        color: '#fff',
        fontWeight: '500',
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
    },
    tiket: {
        marginTop: 50 * heightScale,
        width: 264 * heightScale,
        height: 419 * heightScale,
    },
    plusText: {
        color: 'white',
        marginTop: 10,
        fontSize: 14 * heightScale,
    },
    plusTextBox: {
        alignItems: 'center',
        flexDirection: 'column',
    },
    qrbox: {
        backgroundColor: '#000',
        width: 264 * heightScale,
        height: 70 * heightScale,
        marginTop: 20,
    },
    giftButton: {
        width: 350 * heightScale,
        height: 55 * heightScale,
        backgroundColor: '#F5FF82',
        flexDirection: 'column',
        alignItems: 'center',
    },
    giftButtonText: {
        color: '#000',
        fontWeight: '500',
        lineHeight: 55 * heightScale,
        fontSize: 17 * heightScale,
    },
    buttonBox: {
        flex: 1,
        alignItems: 'center',
    },
    textCenter: {
        width: 86 * heightScale,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginRight: 5 * heightScale,
    },
    buttonContaner: {
        marginTop: 60 * heightScale ,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row' 
    },
    plusIcon: {
        height: heightScale * 20,
        width: heightScale * 20,
        marginTop: heightScale * 10,
        marginLeft: heightScale * 5,
      },

});


export default MyTickets