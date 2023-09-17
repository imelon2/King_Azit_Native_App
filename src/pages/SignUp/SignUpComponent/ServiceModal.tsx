import Modal from 'react-native-modal';
import {Text, View, StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {GlobalStyles, headerIconSize, heightData, widthData} from '@/modules/globalStyles';
import {textarr, cancelTextarr} from './ModalText';
import {Fragment} from 'react';
import {BottomButton} from '@/components/Button';
const {width, height} = Dimensions.get('screen');

interface serviceModalProps {
  modalState: boolean;
  setModalState: (boolean: boolean) => void;
  setCheck: (boolean: boolean) => void;
}

export const ServiceModal = ({modalState, setModalState, setCheck}: serviceModalProps) => {
  const onClickNext = () => {
    setModalState(false);
    setCheck(true);
  };

  return (
    <Modal isVisible={modalState}>
      <ScrollView style={styles.modalBox}>
        <View style={styles.headerContainer}>
          <View style={styles.headerStyle}>
            <Text style={styles.headerFontStyle}>서비스 이용에 관한 약관</Text>
          </View>
          <View style={styles.headerRightIcon}>
            <AntDesignIcon name="close" size={headerIconSize} color="#fff" onPress={() => setModalState(false)} />
          </View>
        </View>

        <View style={[styles.container, GlobalStyles.flexCenter]}>
          <Text style={styles.titleText}> 서비스 이용에 관한 약관 </Text>
          <View>
            {textarr.map((val: any, i: number) => (
              <Fragment key={i}>
                <Text style={styles.subTitle}>{val.title}</Text>
                <Text style={styles.containerText}>{val.text}</Text>
              </Fragment>
            ))}
          </View>

          <Text style={[styles.titleText, {marginTop: 28 * heightData}]}> 취소 및 환불 규정 </Text>
          <View>
            {cancelTextarr.map((val: any, i: number) => (
              <Fragment key={i}>
                <Text style={styles.subTitle}>{val.title}</Text>
                <Text style={styles.containerText}>{val.text}</Text>
              </Fragment>
            ))}

            <Image style={styles.img} source={require(`@/assets/serviceImg.png`)} />
            <Text style={styles.bottomText}>(시행일) 이 약관은 어플리케이션 개설일 부터 시행합니다.</Text>
          </View>

          <View style={{marginTop: 40 * heightData}}>
            <BottomButton onPress={onClickNext} title="다음" backgroundColor="#F5FF82" color="#000" />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    width: width,
    height: height,
    backgroundColor: '#000',
    position: 'absolute',
    top: -20,
    left: -20,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  headerStyle: {
    flex: 1,
    height: heightData * 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerFontStyle: {
    fontSize: heightData * 17,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: heightData * 4.5,
  },
  headerRightIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: widthData * 20,
    top: 20 * heightData,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 20 * heightData,
    color: 'white',
  },
  container: {
    padding: 20 * heightData,
    marginBottom: 80 * heightData,
  },
  subTitle: {
    fontWeight: '600',
    fontSize: 15 * heightData,
    color: 'white',
    marginTop: 17 * heightData,
  },
  containerText: {
    fontWeight: '400',
    fontSize: 12 * heightData,
    color: 'white',
    lineHeight: 22 * heightData,
  },
  img: {
    width: 321 * heightData,
    height: 197 * heightData,
    resizeMode: 'contain',
    marginTop: 20 * heightData,
  },
  bottomText: {
    fontSize: 12 * heightData,
    color: '#fff',
    marginTop: 10 * heightData,
  },
});
