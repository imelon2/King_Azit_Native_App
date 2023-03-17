import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightData } from '../../../modules/globalStyles';
const heightScale = heightData;

function TicketManagement() {
    const [gold, setGold] = useState(0);
    const [red, setRed] = useState(5);
    const [black, setBlack] = useState(20);
    const [selectTicket , setSelectTicket] = useState('');
    const [count , setCount] = useState(0);

    return (
            <View style={{ marginTop: 70 * heightScale }} >
                <View style={{ flexDirection: 'row' , marginBottom: 64 * heightScale }} >
                    <Image style={styles.ticketImg} source={require('../../../assets/BlackTicket.png')} />
                    <View style={{ width: 160 * heightScale, height: 76 * heightScale, justifyContent: 'center', marginLeft: 20 * heightScale }} >
                        <Text style={styles.fontStyle} >{black}  Black Ticket</Text>
                    </View>
                    <View style={{ height: 76 * heightScale, justifyContent: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={styles.buttonStyle} >
                            <Text style={styles.fontStyle2} >차감</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' , marginBottom: 64 * heightScale }} >
                    <Image style={styles.ticketImg} source={require('../../../assets/RedTicket.png')} />
                    <View style={{  width: 160 * heightScale, height: 76 * heightScale, justifyContent: 'center', marginLeft: 20 * heightScale }} >
                        <Text style={styles.fontStyle} >{red}  Red Ticket</Text>
                    </View>
                    <View style={{ height: 76 * heightScale, justifyContent: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={styles.buttonStyle} >
                            <Text style={styles.fontStyle2} >차감</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }} >
                    <Image style={styles.ticketImg} source={require('../../../assets/GoldTicket.png')} />
                    <View style={{  width: 160 * heightScale, height: 76 * heightScale, justifyContent: 'center', marginLeft: 20 * heightScale }} >
                        <Text style={styles.fontStyle} >{gold}  Gold Ticket</Text>
                    </View>
                    <View style={{  height: 76 * heightScale, justifyContent: 'center' }} >
                        <TouchableOpacity activeOpacity={1} style={styles.buttonStyle} >
                            <Text style={styles.fontStyle2} >차감</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    )
}
const styles = StyleSheet.create({
    ticketImg: {
        width: 54 * heightScale,
        height: 76 * heightScale,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#D9D9D9',
        marginLeft: 23 * heightScale,
    },
    fontStyle: {
        color: 'white',
        fontSize: 16 * heightScale,
    },
    fontStyle2: {
        color: 'black',
        fontSize: 18 * heightScale,
    },
    buttonStyle: {
        marginLeft: 40 * heightScale,
        width: 100 * heightScale,
        height: 46 * heightScale,
        backgroundColor: '#F5FF82',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

})
export default TicketManagement;