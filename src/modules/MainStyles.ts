import { widthData, heightData } from './globalStyles'
import { Dimensions,  StyleSheet  } from "react-native";
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

export const MainStyles = StyleSheet.create({
    azitText: {
        resizeMode: 'stretch',
        position:'absolute',
        top: -26 * heightScale,
        left: -10 * heightScale,
        width: 202 *heightScale,
        height: 98 *heightScale,
      },
      container: {
        backgroundColor: '#121212',
        flex: 1,
      },
      mainTextBox: {
        flex: 1,
        marginTop: heightScale * 20,
        marginLeft: heightScale * 18,
      },
      mainTextBox2: {
        flex: 1,
        marginLeft: heightScale * 18,
        flexDirection: 'row',
      },
      mainText: {
        fontWeight: 'bold',
        fontSize: heightScale * 15,
        // marginRight: 20 * heightScale,
        marginTop: 27 * heightScale,
        color: 'white',
      },
      textBorder: {
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: 2,
        borderColor: '#C4C4C4',
      },
      imgSlideBox: {
        marginTop: 46 * heightScale,
        width: '100%',
        height: heightScale * 155,
        // borderWidth:1,
      },
      imgSlideBox2: {
        flex: 4,
      },
      tiketContainer: {
        flex: 10,
        paddingTop: heightScale * 14, // 12나와야함
        paddingHorizontal: heightScale * 18,
      },
      tiketBox: {
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
      tiketBoxColor: {
        backgroundColor: '#656565'
      },
      tiketBoxColor2: {
        backgroundColor: '#9A9A9A'
      },
      tiketText: {
        fontSize: heightScale * 13,
        color: 'white',
        lineHeight: heightScale * 46,
        marginLeft: heightScale * 14,
      },
      gameBox: {
        flex: 7,
      },
      gameContainer: {
        width: heightScale * 230,
        height: heightScale * 254,
        borderRadius: 6,
        marginLeft: heightScale * 20,
        paddingHorizontal: heightScale * 16,
        backgroundColor:'#222',
        borderWidth:1,
        borderColor:'rgba(245, 255, 130, 0.3)',
      },
      gameContainer2: {
        width: heightScale * 227,
        height: heightScale * 252,
        borderRadius: 6,
        // marginLeft: heightScale * 20,
        paddingHorizontal: heightScale * 16,
        position:'absolute',
        top:0,
        left:0,
        // backgroundColor:'#222',
      },
      tableNumText: {
        color: 'white',
        fontSize: heightScale * 10
      },
      mainGameText: {
        fontSize: heightScale * 20,
        color: 'white',
      },
      gameStatus: {
        textAlign: 'center',
        fontSize: heightScale * 10,
        color: 'white'
      },
      entryText: {
        fontSize: heightScale * 10,
        color: 'white'
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
        position:'absolute',
        right: 15,
        backgroundColor: 'black',
        borderRadius: 18,
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginBottom: 3,
        marginLeft: 3,
      },
      roomMakeText:{
        color:'white',
        lineHeight: 22 * heightScale,
        textAlign: 'center',
        fontSize: 12 * heightScale,
      },
      tiketBuy: {
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
        borderRadius: 4,
        marginBottom: heightScale * 16,
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
        position:'absolute',
        
      },
      gamePostion: {
        position:'absolute',
        width: heightScale * 230,
        height: heightScale * 254,
        top:0,
        left:0,
      },
      gameColor: {
        backgroundColor: 'rgba(65, 52, 52, 0.7)',
      },
      gameColor2: {
        backgroundColor: ' rgba(187, 200, 107, 1)',
      },
      gameColor3: {
        backgroundColor: ' rgba(48, 48, 48, 0.4)',
        borderWidth:1,
        borderColor:'#E0E0E0'
      },
      TicketBox:{
        width: 262 * heightScale,
        height: 142 * heightScale,
      },
});
