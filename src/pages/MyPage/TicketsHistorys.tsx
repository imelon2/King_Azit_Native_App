import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyPageRootStackParamList, HomeRootStackParamList} from 'AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import {heightData} from '@/modules';
import TicketHistoryViewDetail from './MyPageCompoents/TicketHistoryViewDetail';
import {ticketHistory} from './MyTicket';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
const heightScale = heightData;
const {width, height} = Dimensions.get('window');

function TicketsHistorys() {
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>>();
  const {access_token} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [sort, setSort] = useState('recent');
  const [type, setType] = useState('all');
  const [ticket, setTicket] = useState('all');

  const [LISTS, setLISTS] = useState<ticketHistory[]>([]);

  useEffect(() => {
    const getTicketsHistory = async () => {
      try {
        setLoading(true);
        const getTicketsHistory = await axios.get(`${Config.API_URL}/member/ticket/history`, {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        });
        setLISTS(getTicketsHistory.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTicketsHistory();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>사용 내역</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.beforeIcon}
          onPress={() => navigation.goBack()}
        />
        <Pressable style={styles.FadersBox}>
          <TouchableOpacity onPress={() => setModalStatus(true)}>
            <Image source={require('../../assets/FadersHorizontal.png')} style={styles.Faders} />
          </TouchableOpacity>
        </Pressable>
      </View>
      {/* 리스트 */}
      <View>
        {loading ? (
          <ActivityIndicator style={{marginTop: heightScale * 30}} />
        ) : LISTS.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 16, color: '#929292', fontWeight: '100'}}>티켓 사용 내역이 없습니다.</Text>
          </View>
        ) : (
          <FlatList
            data={LISTS}
            style={{marginBottom: heightScale * 30}}
            keyExtractor={(_, index) => String(index)}
            bounces={false}
            renderItem={({item}) => <TicketHistoryViewDetail data={item} />}
          />
        )}
      </View>
      <Modal isVisible={modalStatus}>
        <View style={styles.modalBox}>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}>티켓 사용 내역 정렬</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSort('recent')}
                style={[styles.slectBox, styles.slectBoxLeft, sort == 'recent' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, sort == 'recent' && styles.slectBoxOnText]}>최근순</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setSort('past')}
                style={[styles.slectBox, styles.slectBoxRight, sort == 'past' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, sort == 'past' && styles.slectBoxOnText]}>과거순</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}>티켓 소모 유형</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setType('all')}
                style={[styles.slectBox, styles.slectBoxLeft, type == 'all' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, type == 'all' && styles.slectBoxOnText]}>전체</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setType('pay')}
                style={[styles.slectBox, styles.slectCenter, type == 'pay' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, type == 'pay' && styles.slectBoxOnText]}>결제</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setType('gift')}
                style={[styles.slectBox, styles.slectBoxRight, type == 'gift' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, type == 'gift' && styles.slectBoxOnText]}>선물</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.modalText}>티켓 유형</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setTicket('all')}
                style={[styles.slectBox, styles.slectBoxLeft, ticket == 'all' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, ticket == 'all' && styles.slectBoxOnText]}>전체</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setTicket('black')}
                style={[styles.slectBox, styles.slectCenter, ticket == 'black' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, ticket == 'black' && styles.slectBoxOnText]}>블랙</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setTicket('red')}
                style={[styles.slectBox, styles.slectCenter2, ticket == 'red' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, ticket == 'red' && styles.slectBoxOnText]}>레드</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setTicket('gold')}
                style={[styles.slectBox, styles.slectBoxRight, ticket == 'gold' && styles.slectBoxOn]}>
                <Text style={[styles.slectBoxText, ticket == 'gold' && styles.slectBoxOnText]}>골드</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalStatus(false)}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    paddingBottom: heightScale * 40,
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
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
  Faders: {
    width: heightScale * 32,
    height: heightScale * 32,
  },
  FadersBox: {
    position: 'absolute',
    right: 0,
    marginTop: (heightScale * (61 - 28)) / 2,
    marginRight: heightScale * 15,
  },
  modalBox: {
    width: width,
    height: 449 * heightScale,
    position: 'absolute',
    left: -20,
    bottom: -20,
    borderTopRadius: 20,
    backgroundColor: '#353535',
    paddingHorizontal: 20 * heightScale,
    paddingVertical: 20 * heightScale,
    borderTopRightRadius: 36 * heightScale,
    borderTopLeftRadius: 36 * heightScale,
  },
  modalText: {
    color: '#fff',
    fontSize: 16 * heightScale,
    marginTop: 10 * heightScale,
  },
  slectBox: {
    flex: 1,
    backgroundColor: '#595959',
    height: 44 * heightScale,
    marginTop: 20 * heightScale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slectBoxOn: {
    backgroundColor: '#F5FF82',
  },
  slectBoxOnText: {
    color: 'black',
  },
  slectBoxLeft: {
    borderColor: '#F5FF82',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  slectBoxRight: {
    borderColor: '#F5FF82',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  slectCenter: {
    borderColor: '#F5FF82',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  slectCenter2: {
    borderColor: '#F5FF82',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  slectBoxText: {
    fontSize: 16 * heightScale,
    color: 'white',
  },
  slectBoxText2: {
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#F5FF82',
    borderRadius: 10,
    height: 64 * heightScale,
    marginTop: 30 * heightScale,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 20 * heightScale,
    color: '#000',
  },
});
export default TicketsHistorys;
