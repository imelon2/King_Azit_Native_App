import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {HeaderStyle, StringUpperCase} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {heightScale} from '../../modules/MainStyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import React, {useEffect, useState} from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../AppInner';
import useSocket from '../../hooks/useSocket';


type TRate = "prize1" | "prize2" | "prize3" 
interface IPrize {
    [key : string]: {
        nickname: string;
            amount: string;
            ticketType: string;
    }
}
function Prize() {
    const [socket, disconnect] = useSocket();
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const userList = ['한나피쉬', '한나', '피쉬이'];
    const [prize, setPrize] = useState<IPrize>({
        "prize1" : {
            nickname: '',
            amount: '',
            ticketType: '',
        },
        "prize2" : {
            nickname: '',
            amount: '',
            ticketType: '',
        },
        "prize3" : {
            nickname: '',
            amount: '',
            ticketType: '',
        },
    });

  const ticketList = ['black','red','gold']

  useEffect(() => {
    const callbackError = (data:any) => {
        console.log(data);
    }
    if(socket) {
        socket.on('error', callbackError);
        socket.on('finishGameError', callbackError);
    }

    return () => {
        if (socket) {
          socket.off('finishGameError', callbackError);
          socket.off('error', callbackError);
        }
      };
  }),[]

  const canFinish = Object.keys(prize).every((v) => {
    return !!prize[v].nickname && !!prize[v].amount && !!prize[v].ticketType;
})

  const finishGame = () => {
    if (socket) {
    console.log('try delete Room');
      socket.emit(
        'finishGame',
        '',
        // {
        //   user_1st: user_1st,
        //   user_2nd: user_2nd,
        //   user_3rd: user_3rd,
        //   prize_type: prize_type,
        //   prize_amount: prize_amount,
        // }
      );
    }
  };

  const component = (Rate:TRate) => {
    return (<>
    <View style={styles.tableSelect}>
            <View style={styles.downIcon}>
              <IconAntDesign
                name="down"
                size={heightScale * 25}
                color="#F5FF82"
              />
            </View>
            <RNPickerSelect
              onValueChange={value =>
                setPrize({
                    ...prize,
                    [Rate]:{
                        ...prize?.[Rate],
                        nickname:value
                    }
                })
              }
              placeholder={{
                label: 'Select Player',
                inputLabel: 'Select Player',
              }}
              items={userList.map(item => {
                return {
                  label: `${item}`,
                  inputLabel: `${item}`,
                  value: item,
                };
              })}
              style={{
                viewContainer: selecterStyles.viewContainer,
                placeholder: selecterStyles.placeholder,
                inputIOS: selecterStyles.inputIOS,
                inputAndroid: selecterStyles.inputAndroid,
              }}
            />
          </View>
          <View style={{flexDirection: 'row',marginTop:heightScale*26}}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter"
              returnKeyType="done"
              onChangeText={value =>
                setPrize({
                    ...prize,
                    [Rate]:{
                        ...prize?.[Rate],
                        amount:value
                    }
                })
              }
              value={prize[Rate].amount}
              keyboardType={'number-pad'}
              placeholderTextColor="#6F6F6F"
            />
            <View style={styles.tableSelect}>
              <View style={styles.downIcon}>
                <IconAntDesign
                  name="down"
                  size={heightScale * 25}
                  color="#F5FF82"
                />
              </View>
              <RNPickerSelect
                onValueChange={value =>
                setPrize({
                    ...prize,
                    [Rate]:{
                        ...prize?.[Rate],
                        ticketType:value
                    }
                })
                }
                placeholder={{
                  label: 'Select Ticket',
                  inputLabel: 'Select Ticket',
                }}
                items={ticketList.map(item => {
                  return {
                    label: `${StringUpperCase(item)} Ticket`,
                    inputLabel: `${StringUpperCase(item)} Ticket`,
                    value: item,
                  };
                })}
                style={{
                    viewContainer: selecterStyles.viewContainer,
                    placeholder: selecterStyles.placeholder,
                    inputIOS: selecterStyles.inputIOS,
                    inputAndroid: selecterStyles.inputAndroid,
                  }}
              />
            </View>
          </View>
          </>)
  }

  return (
    <SafeAreaView style={HeaderStyle.container}>
      <View>
        <View style={HeaderStyle.headerStyle}>
          <Text style={HeaderStyle.headerFontStyle}>Prize</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={HeaderStyle.headerLeftIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{
          paddingHorizontal: heightScale * 24,
        }}>
        <View>
          <Text style={styles.fontStyle}>1등</Text>
          {component('prize1')}
          <Text style={styles.fontStyle}>2등</Text>
          {component('prize2')}
          <Text style={styles.fontStyle}>3등</Text>
          {component('prize3')}
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'black',
        }}>
        <TouchableOpacity
          style={[styles.buttonStyle,{backgroundColor: canFinish ? "#F5FF82" : "#222"}]
          }
          onPress={finishGame}>
          <Text
            style={[styles.buttonTextStyle,{color: canFinish ? "#000" : "#8A8A8A"}
            ]}>
            {loading ? <ActivityIndicator /> : '지급하기'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fontStyle: {
    color: '#fff',
    fontSize: heightScale*18,
    paddingBottom:heightScale*20,
    paddingTop:heightScale*42
  },
  tableSelect: {
    backgroundColor: '#222',
    width: 208 * heightScale,
    height: 44 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
  },
  downIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: heightScale * 10,
  },
  TextInput: {
    borderColor: '#f5ff82',
    borderWidth: 1,
    borderRadius: 6,
    width: 128 * heightScale,
    height: 44 * heightScale,
    marginRight:heightScale*26,
    backgroundColor: '#222',
    color: 'white',
    paddingHorizontal:heightScale*10
  },
  buttonStyle: {
    backgroundColor: '#F5FF82',
    justifyContent: 'center',
    alignItems: 'center',
    width: 370 * heightScale,
    height: 64 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonTextStyle:{
    fontSize: 20 * heightScale,
    fontWeight: '600',
    textAlign: 'center',
  }
});

const selecterStyles = StyleSheet.create({
    viewContainer: {
        justifyContent: 'center',
        paddingLeft: heightScale * 10,
        flex: 1,
      },
      placeholder: {
        color: 'gray',
        fontSize: heightScale * 18,
        fontWeight: 'bold',
      },
      inputIOS: {
        color: '#fff',
        fontSize: heightScale * 18,
        fontWeight: 'bold',
      },
      inputAndroid: {
        color: '#fff',
        fontSize: heightScale * 18,
        fontWeight: 'bold',
      },
})
export default Prize;
