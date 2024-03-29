import { widthData, heightData } from './globalStyles';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
export const heightScale = heightData;

export const MainStyles = StyleSheet.create({
  azitText: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: '#121212',
    height:'100%'
  },
  mainTextBox: {
    flex: 1,
    marginTop: heightScale * 20,
    marginLeft: heightScale * 18,
  },
  mainTextBox2: {
    marginLeft: heightScale * 18,
    marginBottom: heightScale * 30,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: heightScale * 22,
    marginRight: 20,
    color: 'white',
  },
  textBorder: {
    position: 'absolute',
    bottom: 0,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
  },
  imgSlideBox: {
    width: width,
    height: heightScale * 300,
  },
  imgSlideBox2: {
    width: width,
    height: heightScale * 300,
    // resizeMode:'center'
  },
  imgSlideBox3: {
    width: width,
    height: heightScale * 208,
    // resizeMode:'center'
  },
  ticketContainer: {
    flex: 10,
    paddingTop: heightScale * 14, // 12나와야함
    paddingHorizontal: heightScale * 18,
  },
  ticketBox: {
    width: '100%',
    height: heightScale * 46,
    marginTop: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    iphone13ShadowBox1: {
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
    elevation: 3,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  ticketBoxColor: {
    backgroundColor: '#656565',
  },
  ticketBoxColor2: {
    backgroundColor: '#9A9A9A',
  },
  ticketText: {
    fontSize: heightScale * 13,
    color: 'white',
    lineHeight: heightScale * 46,
    marginLeft: heightScale * 14,
  },
  gameMenuWrapper: {
    flexDirection: 'row',
    marginBottom:heightScale*35
  },
  gameMenuComponent: {
    flex: 1,
    alignItems: 'center',
  },
  gameMenuText: {
    color: '#fff',
    paddingVertical: 8,
  },
  onGameMenu: { flexDirection: 'row', alignItems: 'center' },
  onGameMenuBody: {
    backgroundColor: '#F5FF82',
    height: heightScale * 2,
    width: heightScale * 86,
  },
  onGameMenuEdge: {
    transform: [{ rotate: '45deg' }],
    width: heightScale * 4,
    height: heightScale * 4,
    backgroundColor: '#F5FF82',
  },
  gameBoxImg: {
    width: heightScale * 390,
    height: heightScale * 230,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#FEFFD7',
    borderRadius: 5,
  },
  noGameBoxContainer : {
    width: heightScale * 390,
    height: heightScale * 230,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEFFD7',
    borderRadius: 5,
    marginBottom: heightScale * 30,
  },
  gameContainer: {
    position: 'absolute',
    width: heightScale * 390,
    height: heightScale * 230,
    padding: heightScale * 20,
  },
  gameText : {
    color: '#fff',
    fontSize: heightScale * 14,
    fontWeight: 'bold',
  },
  gameStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameStateStyle: {
    width: heightScale*60,
    height: heightScale*20,
    backgroundColor: '#5F9A31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  gameStateText: {
    color: '#fff',
    fontSize: heightScale * 14,
    fontWeight: '500',
  },
  gamePlayersContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
  },
  gamePlayerIcon: {
    borderWidth: 1,
    borderColor: '#A4A4A4',
    width: heightScale * 30,
    height: heightScale * 30,
    backgroundColor: 'gray',
    borderRadius: 15,
  },


  tableNumText: {
    color: 'white',
    fontSize: heightScale * 10,
  },
  mainGameText: {
    fontSize: heightScale * 20,
    color: 'white',
  },
  gameStatus: {
    textAlign: 'center',
    fontSize: heightScale * 10,
    color: 'white',
  },
  entryText: {
    fontSize: heightScale * 10,
    color: 'white',
  },
  gameStatusBox: {
    backgroundColor: 'green',
    borderRadius: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 3,
    marginLeft: 3,
  },
  roomMakeBox: {
    width: 80 * heightScale,
    height: 25 * heightScale,
    // lineHeight: 25 * heightScale,
    position: 'absolute',
    right: 15,
    backgroundColor: 'black',
    borderRadius: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 3,
    marginLeft: 3,
  },
  roomMakeText: {
    color: 'white',
    lineHeight: 22 * heightScale,
    textAlign: 'center',
    fontSize: 12 * heightScale,
  },
  ticketBuy: {
    color: 'white',
    fontSize: heightScale * 15,
    marginTop: heightScale * 12,
    fontWeight: '500',
  },
  Blind: {
    color: 'white',
    fontSize: heightScale * 13,
    fontWeight: '300',
  },
  group_icon: {
    height: heightScale * 30,
    resizeMode: 'contain',
    position: 'absolute',
    left: -10,
  },
  joinButtonText: {
    textAlign: 'center',
    lineHeight: heightScale * 35,
    fontWeight: '500',
    color: '#000',
  },
  joinButton: {
    width: heightScale * 200,
    height: heightScale * 35,
    backgroundColor: '#F5FF82',
    borderRadius: 4
    // marginBottom: heightScale * 16,
  },

  groupPosition: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    height: heightScale * 42,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    width: '100%',
    marginTop: 5 * heightScale,
    borderWidth: 1,
    borderColor: '#333',
  },
  gameWatingImag: {
    resizeMode: 'contain',
    width: heightScale * 230,
    height: heightScale * 254,
    position: 'absolute',
  },
  gamePostion: {
    position: 'absolute',
    width: heightScale * 230,
    height: heightScale * 254,
    top: 0,
    left: 0,
  },
  gameColor: {
    backgroundColor: 'rgba(65, 52, 52, 0.7)',
  },
  gameColor2: {
    backgroundColor: ' rgba(187, 200, 107, 1)',
  },
  gameColor3: {
    backgroundColor: ' rgba(48, 48, 48, 0.4)',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeDot: {
    backgroundColor: '#484848',
    width: 27,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#484848',
    opacity: 0.5,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  azitTextImg: {
    width: 292 * heightScale,
    height: 96 * heightScale,
    resizeMode: 'contain',
    position: 'absolute',
    top: -10 * heightScale,
  },
  azitTextImg2: {
    width: 124 * heightScale,
    height: 76 * heightScale,
    resizeMode: 'contain',
    position: 'absolute',
    top: 40 * heightScale,
  },
  contentsBox: {
    width: 192 * heightScale,
    height: 324 * heightScale,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightScale,
    paddingTop: 12 * heightScale,
  },
  contentsBox2: {
    width: 196 * heightScale,
    height: 158 * heightScale,
    borderRadius: 12,
    backgroundColor: '#272727',
    marginLeft: 3 * heightScale,
    paddingHorizontal: 10 * heightScale,
    paddingTop: 12 * heightScale,
  },
  contentsBox3: {
    width: 254 * heightScale,
    height: 102 * heightScale,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightScale,
    paddingTop: 12 * heightScale,
    marginTop: 8 * heightScale,
    flexDirection:'row',
  },

  contentsBox4: {
    width: 137 * heightScale,
    height: 102 * heightScale,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightScale,
    paddingTop: 12 * heightScale,
    marginTop: 8 * heightScale,
  },
  contentImg: {
    width: 171 * heightScale,
    height: 233 * heightScale,
    marginTop: 22 * heightScale,
  },
  contentImg2: {
    width: 189 * heightScale,
    height: 88 * heightScale,
    marginTop: 6 * heightScale,
  },
  contentImg3: {
    width: 122 * heightScale,
    height: 94 * heightScale,
    marginLeft: 60 * heightScale,
  },
  contentImg4:{
    width: 98 * heightScale,
    height: 60 * heightScale,
    marginLeft: 15 * heightScale,
    marginTop: 10 * heightScale,
  },
  contentImg5:{
    width: 70 * heightScale,
    height: 91 * heightScale,
    position:'absolute',
    right: -1,
    top: 10,
    resizeMode:'contain',
    // marginLeft: 15 * heightScale,
    // marginTop: 10 * heightScale,
  },
  contentsText: {
    fontSize: 20 * heightScale,
    color: 'white',
    fontWeight: '600',
  },
  contentsText2: {
    fontSize: 12 * heightScale,
    color: 'white',
    marginTop: 5 * heightScale,
  },
});
