import { useEffect } from 'react';
import { Image, StyleSheet, Text, View, Pressable, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import TicketHistoryViewDetail from './TicketHistoryViewDetail';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { HomeRootStackParamList } from '../../../../AppInner';
import { NavigationProp, useNavigation } from '@react-navigation/native';
const heightScale = heightData;

const { width } = Dimensions.get('window');

const ContentsList = [
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },
    {
        date: '02.14.2023 06:35 PM',
        id: 'KING123',
        count: 20,
    },

]

const LISTS = [...Array(ContentsList.length).keys()].map((_, i) => {
    return {
        key: i,
        data: ContentsList[i],
    };
});

function TicketHistory() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();

    return (
        <View>
            <View >
                <TouchableOpacity style={styles.moreLine}  activeOpacity={1} onPress={() => navigation.navigate('AdminTicketsHistory')}>
                    <Text style={styles.fontStyle} >전체보기</Text>
                    <IconAntDesign
                        name="right"
                        size={heightScale * 20}
                        color="white"
                        style={{ marginRight: 15 * heightScale }}

                    />
                </TouchableOpacity>
            </View>
            <View>
                {LISTS.length === 0 ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30,
                        }}>
                        <Text style={{ fontSize: 16, color: '#929292', fontWeight: '100' }}>
                            티켓 사용 내역이 없습니다.
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={LISTS}
                        // style={{ paddingBottom: heightScale * 30 }}
                        keyExtractor={item => String(item.key)}
                        bounces={false}
                        renderItem={({ item }) => (
                            <TicketHistoryViewDetail data={item.data} />
                        )}
                    />
                )}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    moreLine: {
        height: 45 * heightScale,
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomColor: '#353535',
        borderBottomWidth: 1,
    },
    fontStyle: {
        color: '#fff',
        fontSize: 14 * heightScale,
        marginRight: 10 * heightScale,
    },
})
export default TicketHistory;