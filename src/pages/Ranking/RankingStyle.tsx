import {StyleSheet} from 'react-native';
import {heightData, widthData} from '@/modules';
const heightScale = heightData;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'rgba(18, 18, 18, 1)',
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
  bannerBoxPostion: {
    position: 'absolute',
    width: 320 * widthData,
    height: 65 * heightScale,
    borderRadius: 6 * heightScale,
    marginTop: 20 * heightScale,
  },
  bannerText: {
    color: 'white',
    fontSize: 13 * heightScale,
    textAlign: 'center',
    fontWeight: '700',
  },
  bannerText2: {
    color: 'white',
    fontSize: 12 * heightScale,
    textAlign: 'center',
    marginTop: 5 * heightScale,
    fontWeight: '400',
  },
  scoreIcon: {
    position: 'absolute',
    right: 10 * heightScale,
    marginTop: (heightScale * (105 - 30)) / 2,
  },
  scoreText: {
    color: '#fff',
    fontSize: 19 * heightScale,
    marginTop: 15 * heightScale,
    marginLeft: 10 * heightScale,
  },
  scoreText2: {
    color: '#fff',
    fontSize: 29 * heightScale,
    fontWeight: '600',
    marginLeft: 55 * heightScale,
  },
  monthText: {
    color: 'white',
    marginLeft: 22 * heightScale,
    fontSize: 17 * heightScale,
  },
  monthText2: {
    color: '#797979',
    marginLeft: 22 * heightScale,
    fontSize: 17 * heightScale,
  },
  weekText: {
    color: 'white',
    marginLeft: 35 * heightScale,
    fontSize: 17 * heightScale,
  },
  weekText2: {
    color: '#797979',
    marginLeft: 35 * heightScale,
    fontSize: 17 * heightScale,
  },
  calendarStyle: {
    position: 'absolute',
    right: 50 * heightScale,
  },
  menuText: {
    color: 'white',
    marginLeft: 20 * heightScale,
    fontSize: 14 * heightScale,
  },
  rankingBox: {
    width: 389 * widthData,
    height: '100%',
    marginTop: heightScale * 10,
  },
  marginRight: {
    marginRight: 53 * heightScale,
  },
  rankingLineOne: {
    width: '100%',
    height: 50 * heightScale,
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  rankingLineOne2: {
    width: '100%',
    height: 50 * heightScale,
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FF82',
  },
  lineText: {
    color: 'white',
    fontSize: 14 * heightScale,
    lineHeight: 50 * heightScale,
    marginLeft: 3 * heightScale,
    textAlign: 'center',
  },
  lineText2: {
    color: 'black',
  },
  lineRankingImg: {
    width: 51 * widthData,
    height: '100%',
  },
  userIcon: {
    height: heightScale * 30,
    width: widthData * 30,
    borderRadius: 100,
    // marginLeft: heightScale * 20,
    marginTop: (heightScale * (50 - 30)) / 2,
    // resizeMode: 'center',
  },
  RankingTextBox: {
    width: 25 * widthData,
  },
  imgBox: {
    width: 25 * widthData,
    alignItems: 'center',
    marginLeft: 20 * heightScale,
  },
  RankingTop: {
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingTop: 15 * heightScale,
    paddingBottom: 10 * heightScale,
  },
  playerImg: {
    width: 77 * widthData,
    height: 77 * heightScale,
    marginTop: 12 * heightScale,
    borderRadius: 60,
    borderColor: '#background: rgba(245, 255, 130, 1)',
    borderWidth: 2 * heightScale,
  },
  playerRound: {
    position: 'absolute',
    marginTop: 33 * heightScale,
    width: 128 * widthData,
    height: 128 * heightScale,
  },
  playerCrown: {
    marginTop: 6 * heightScale,
    width: 29 * widthData,
    height: 23 * heightScale,
    resizeMode: 'contain',
  },

  playerImg2: {
    width: 58 * widthData,
    height: 58 * heightScale,
    marginTop: 15 * heightScale,
    resizeMode: 'contain',
    borderRadius: 50,
    borderColor: '#background: rgba(245, 255, 130, 1)',
    borderWidth: 2 * heightScale,
  },
  playerRound2: {
    position: 'absolute',
    marginTop: 20 * heightScale,
    width: 90 * widthData,
    height: 90 * heightScale,
    resizeMode: 'contain',
  },
  playerCrown2: {
    width: 18 * widthData,
    height: 14 * heightScale,
  },

  animatView: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 128 * widthData,
    height: 128 * heightScale,
  },
  pointContainer: {
    alignItems: 'center',
    paddingVertical: 10 * heightScale,
    flexDirection: 'row',
  },
  pointContainer_side: {
    marginTop: 59 * heightData,
    width: 113 * widthData,
    height: 154 * heightScale,
    alignItems: 'center',
    position: 'relative',
  },
  pointContainer_img: {
    position: 'absolute',
    width: 113 * widthData,
    height: 154 * heightScale,
  },
  pointContainer_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 13 * heightScale,
    fontWeight: '500',
    marginTop: 2 * heightScale,
  },
  pointContainer_text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15 * heightScale,
    fontWeight: '500',
  },
  pointContainer_textBox: {
    flex: 1,
    marginTop: 16 * heightScale,
    alignItems: 'center',
  },
  pointContainer_center: {
    alignItems: 'center',
    marginTop: heightScale * 5,
  },
  pointContainer_img_center: {
    position: 'absolute',
    width: 133 * widthData,
    height: 197 * heightScale,
    resizeMode: 'contain',
  },
  textcolor: {
    color: 'background: rgba(245, 255, 130, 1)',
  },
});
