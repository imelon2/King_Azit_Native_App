import {StyleSheet, Dimensions} from 'react-native';
import {heightData, widthData} from '@/modules';
const {width, height} = Dimensions.get('screen');

export const UserStyle = StyleSheet.create({
  ticket: {
    marginTop: 20 * heightData,
    width: 315 * widthData,
    height: 420 * heightData,
  },
  plusTextBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  qrbox: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    flex: 1,
  },
  qrStyle: {marginTop: heightData * 11, marginRight: widthData * 17},
  buttonContaner: {
    flex: 1,
  },
  ticketBox: {
    width: 263 * widthData,
    height: 416 * heightData,
    borderColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 50 * heightData,
    borderRadius: 14,
  },
  ticketImg: {
    width: 263 * widthData,
    height: 325 * heightData,
  },
  qrViewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketNameBox: {
    width: 120 * heightData,
    height: 26 * heightData,
    borderWidth: 1,
    borderRadius: 12 * heightData,
    borderColor: '#8B806F',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ticketCountBorder: {
    width: (width - 120 * heightData) / 2,
    height: 1 * heightData,
    backgroundColor: '#8B806F',
  },
  tabFont: {
    fontSize: 15 * heightData,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 50 * heightData,
  },
  tabStyle: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#363636',
    overflow: 'hidden',
    height: 50 * heightData,
  },
  tabiconStyle: {
    marginLeft: 'auto',
  },
  tabBoxStyle: {
    width: width,
    height: 50 * heightData,
    paddingHorizontal: 20 * heightData,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTextBox: {
    paddingHorizontal: 20 * heightData,
    paddingBottom: 40 * heightData,
  },
  subFont: {
    color: '#fff',
    fontSize: 13 * heightData,
    width: 297 * heightData,
    marginTop: 15 * heightData,
  },
  benefitImg: {
    width: 308 * heightData,
    height: 101 * heightData,
    marginTop: 20 * heightData,
  },
  userTicketImg: {
    resizeMode: 'stretch',
    // width: _width,
    height: heightData * 130,
    // marginHorizontal: _gap / 2,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    borderRadius: 4,
  },
  userTicketText: {
    color: 'white',
    letterSpacing: 2,
    fontSize: heightData * 12,
    fontWeight: '500',
  },
  userTicketTextSub: {
    color: 'white',
    fontSize: heightData * 9,
    fontWeight: 'bold',
  },
  // Square: {
  //   width: 8 * heightData,
  //   height: 8 * heightData,
  //   backgroundColor: '#F85FF82',
  //   marginRight: 5 * heightData,
  // },
});
