import {Text, View, SafeAreaView, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import {RootStackParamList} from 'AppInner';
import {heightData} from '@/modules';
import {SignUpstyles} from './SignUpstyles';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {SignUpHeader} from './SignUpComponent/SignUpHeader';
import {BottomButton} from '@/components/Button';
import {ServiceModal, PrivacyModal, MarketingModal} from './SignUpComponent';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpHome'>;
type checkLineProps = {
  check: boolean;
  setCheck: (check: boolean) => void;
  text: string;
  setModalState: (boolean: boolean) => void;
};

const CheckLine = ({check, setCheck, text, setModalState}: checkLineProps) => {
  return (
    <Pressable style={SignUpstyles.termsBox} onPress={() => setCheck(!check)}>
      <Icon style={SignUpstyles.check} name="check" size={20} color={check ? '#F5FF82' : '#BCBCBC'} />
      <Text style={{color: '#fff'}}>{text}</Text>
      <Icon2
        style={SignUpstyles.next}
        name="navigate-next"
        size={20}
        color={'#BCBCBC'}
        onPress={() => setModalState(true)}
      />
    </Pressable>
  );
};

export const SignUpHome = ({navigation}: SignInScreenProps) => {
  const [checkAll, setcheckAll] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);
  const [modalState3, setModalState3] = useState(false);

  const onClickCheckAll = (checkAll: boolean) => {
    setCheck1(checkAll);
    setCheck2(checkAll);
    setCheck3(checkAll);
    setcheckAll(checkAll);
  };

  useEffect(() => {
    if (check1 && check2 && check3) setcheckAll(true);
    else setcheckAll(false);

    if (check1 && check2) setNextPage(true);
    else setNextPage(false);
  }, [check3, check2, check1]);

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <SignUpHeader text={'서비스약관에 동의해주세요.'} bar={72} />

      <View style={{marginBottom: heightData * 64}}>
        <Pressable style={SignUpstyles.termsBox} onPress={() => onClickCheckAll(!checkAll)}>
          <Icon style={SignUpstyles.checkBox} name="checksquareo" size={22} color={checkAll ? '#F5FF82' : '#848484'} />
          <Text style={SignUpstyles.agreeText}>모두 동의</Text>
        </Pressable>
        <View style={SignUpstyles.bottomBar}></View>
        <CheckLine
          check={check1}
          setCheck={setCheck1}
          text={'(필수) Kings’ Azit 서비스 이용약관'}
          setModalState={setModalState}
        />
        <CheckLine
          check={check2}
          setCheck={setCheck2}
          text={'(필수) 개인정보 수집 및 이용 동의'}
          setModalState={setModalState2}
        />
        <CheckLine
          check={check3}
          setCheck={setCheck3}
          text={'(선택) 마케팅 정보 활용 동의'}
          setModalState={setModalState3}
        />
      </View>

      <View style={SignUpstyles.center}>
        <BottomButton
          onPress={() => navigation.navigate('SignUpId')}
          title="다음"
          backgroundColor={nextPage ? '#F5FF82' : '#808080'}
          color="#000"
        />
      </View>

      <ServiceModal modalState={modalState} setModalState={setModalState} setCheck={setCheck1} />
      <PrivacyModal modalState={modalState2} setModalState={setModalState2} setCheck={setCheck2} />
      <MarketingModal modalState={modalState3} setModalState={setModalState3} setCheck={setCheck3} />
    </SafeAreaView>
  );
};

export default SignUpHome;
