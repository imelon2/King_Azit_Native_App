import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TicketHistoryViewDetail from './TicketHistoryViewDetail';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {HomeRootStackParamList} from '../../../../AppInner';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import { heightScale } from '../../../modules/MainStyles';
const {width} = Dimensions.get('window');


interface IticketHistory {
  type: string;
  date: string;
  amount: number;
  summary: string;
}

interface IProps {
  status: 'charge' | 'history';
  uuid: string;
}
function TicketHistory({status, uuid}: IProps) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {access_token} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<IticketHistory[]>();

  useEffect(() => {
    const getTicketsUseHistory = async () => {
      try {
        setLoading(true);
        const getTicketsUseHistory = await axios.get(
          `${Config.API_URL}/admin/ticket/history/use?uuid=${uuid}`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        setList(getTicketsUseHistory.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const getTicketsChargeHistory = async () => {
      try {
        setLoading(true);
        const getTicketsUseHistory = await axios.get(
          `${Config.API_URL}/admin/ticket/history/charge?uuid=${uuid}`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        setList(getTicketsUseHistory.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === 'history') {
      getTicketsUseHistory();
    } else if (status === 'charge') {
      getTicketsChargeHistory();
    }
  }, []);

  return (
    <View>
      <View>
        <TouchableOpacity
          style={styles.moreLine}
          activeOpacity={1}
          onPress={() => navigation.navigate('AdminTicketsHistory')}>
          <Text style={styles.fontStyle}>전체보기</Text>
          <IconAntDesign
            name="right"
            size={heightScale * 20}
            color="white"
            style={{marginRight: 15 * heightScale}}
          />
        </TouchableOpacity>
      </View>
      <View>
        {loading ? (
          <View
            style={{
              marginTop: heightScale * 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#fff'} />
          </View>
        ) : (
          <FlatList
            data={list}
            ListEmptyComponent={() => (
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#fff',
                    display: loading ? 'none' : 'flex',
                    paddingVertical: heightScale * 30,
                    fontSize: heightScale * 18,
                  }}>
                  티켓 내역이 없습니다.
                </Text>
              </View>
            )}
            keyExtractor={(_, index) => String(index)}
            bounces={false}
            renderItem={({item}) => <TicketHistoryViewDetail data={item} />}
          />
        )}
      </View>
    </View>
  );
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
});
export default TicketHistory;
