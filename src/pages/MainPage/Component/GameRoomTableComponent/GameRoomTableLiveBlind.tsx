import {tournamentBreakGame, tournamentRestartGame, tournamentStartGame} from '@/api/Tournament/TournamentApi';
import {IBlindInfo, ITournamentLive, ITournamentRoomState} from '@/config';
import {heightData, GlobalStyles, widthData, UpperString} from '@/modules';
import {useCallback} from 'react';
import {View, Text, StyleSheet, Alert, Pressable} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

type IProps = {
  timer: string;
  roomId: string;
  tableBlindInfo: Omit<ITournamentLive, 'players'>;
};

export const GameRoomTableLiveBlind = (props: IProps) => {
  const {roomId} = props;
  const {timer} = props;
  const {gameState, blindLevel, currentBlind, nextBlind} = props.tableBlindInfo;

  const changeRoomState = async () => {
    try {
      if (gameState === 'wait') await tournamentStartGame(roomId);
      if (gameState === 'break') await tournamentRestartGame(roomId);
      if (gameState === 'start') await tournamentBreakGame(roomId);
      if (gameState === 'restart') await tournamentBreakGame(roomId);
    } catch (error) {
      console.log(error);
      Alert.alert('ERROR', '잠시후에 이용해주시기 바랍니다.');
    }
  };

  const filterRoomState = () => {
    switch (gameState) {
      case 'wait':
        return 'Start';
      case 'start':
        return 'Break';
      case 'restart':
        return 'Break';
      case 'break':
        return 'Restart';
      default:
        break;
    }
  };

  return (
    <View pointerEvents="box-none" style={[{flex: 1},GlobalStyles.flexCenter]}>
      <View style={GlobalStyles.flexCenter}>
        <Text style={styles.textStyle1}>Blinds : Level {Number(blindLevel) + 1}</Text>
        <Text style={styles.textStyle1}>
          {currentBlind.BB} / {currentBlind.SB} Ante: {currentBlind.Ante}
        </Text>
      </View>
      <View style={[GlobalStyles.flexCenter, {marginTop: 155, top: 20}]}>
        <Text style={[styles.textStyle2, {marginBottom: 8}]}>
          Next Blind : {nextBlind.BB} / {nextBlind.SB}
        </Text>
        <Text style={styles.textStyle2}>in {timer}</Text>
        <Pressable
          onPress={() => changeRoomState()}
          style={[
            GlobalStyles.flexCenter,
            styles.buttonStyle,
            {backgroundColor: filterRoomState() === 'Break' ? '#35312A' : '#DACFB1', marginTop: 17 * heightData},
          ]}>
          <IconFeather
            name={filterRoomState() === 'Break' ? 'pause' : 'play'}
            size={18}
            color={filterRoomState() === 'Break' ? '#C9BEA2' : '#171717'}
          />
          <Text
            style={[
              styles.textStyle1,
              {
                color: filterRoomState() === 'Break' ? '#C9BEA2' : '#171717',
                marginLeft: 4 * widthData,
              },
            ]}>
            {filterRoomState()}
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={() => Alert.alert("TODO","종료 및 프라이즈 지급")} style={[styles.exitButtonStyle, GlobalStyles.flexCenter]}>
      <IconFeather
            name={'power'}
            size={14}
            color={'#fff'}
          />
        <Text style={[styles.textStyle2,{paddingLeft:4}]}>종료 및 프라이즈 지급</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    width: 100 * widthData,
    height: 33 * heightData,
    borderWidth: 1,
    borderColor: '#DACFB1',
    borderRadius: 30,
  },
  exitButtonStyle: {
    flexDirection:'row',
    width: 144 * widthData,
    height: 33 * heightData,
    backgroundColor: '#242424',
    position: 'absolute',
    bottom: 45 * heightData,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius:20
  },
  textStyle1: {color: '#C9BEA2', fontSize: 14, fontWeight: 'bold', letterSpacing: 1},
  textStyle2: {color: '#C9BEA2', fontSize: 12, fontWeight: '500', letterSpacing: 1},
});
