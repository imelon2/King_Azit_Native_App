import {StyleSheet} from 'react-native';
import {heightData} from '@/modules';
const heightScale = heightData;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212',
    // paddingBottom: heightScale * 40
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
    width: 390 * heightScale,
    height: 94 * heightScale,
    borderRadius: 10,
    marginTop: 15 * heightScale,
  },
  bannerText: {
    color: 'white',
    fontSize: 16 * heightScale,
    textAlign: 'center',
    fontWeight: '800',
  },
  bannerText2: {
    color: 'white',
    fontSize: 14 * heightScale,
    textAlign: 'center',
    marginTop: 3 * heightScale,
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
    marginLeft: 10 * heightScale,
    fontSize: 20 * heightScale,
  },
  monthText2: {
    color: '#797979',
    marginLeft: 10 * heightScale,
    fontSize: 20 * heightScale,
  },
  weekText: {
    color: 'white',
    marginLeft: 35 * heightScale,
    fontSize: 20 * heightScale,
  },
  weekText2: {
    color: '#797979',
    marginLeft: 35 * heightScale,
    fontSize: 20 * heightScale,
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
    width: 389 * heightScale,
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
    fontSize: 18 * heightScale,
    lineHeight: 50 * heightScale,
    marginLeft: 3 * heightScale,
    textAlign: 'center',
  },
  lineText2: {
    color: 'black',
  },
  lineRankingImg: {
    width: 20 * heightScale,
    height: '100%',
  },
  userIcon: {
    height: heightScale * 30,
    width: heightScale * 30,
    borderRadius: 100,
    // marginLeft: heightScale * 20,
    marginTop: (heightScale * (50 - 30)) / 2,
    // resizeMode: 'center',
  },
  RankingTextBox: {
    width: 25 * heightScale,
  },
  imgBox: {
    width: 25 * heightScale,
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
    width: 112 * heightScale,
    height: 112 * heightScale,
    marginTop: 12 * heightScale,
    borderRadius: 60,
  },
  playerRound: {
    position: 'absolute',
    marginTop: 33 * heightScale,
    width: 128 * heightScale,
    height: 128 * heightScale,
  },
  playerCrown: {
    marginTop: 6 * heightScale,
    width: 29 * heightScale,
    height: 23 * heightScale,
    resizeMode: 'contain',
  },

  playerImg2: {
    width: 74 * heightScale,
    height: 74 * heightScale,
    marginTop: 13 * heightScale,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  playerRound2: {
    position: 'absolute',
    marginTop: 20 * heightScale,
    width: 90 * heightScale,
    height: 90 * heightScale,
    resizeMode: 'contain',
  },
  playerCrown2: {
    width: 18 * heightScale,
    height: 14 * heightScale,
  },

  animatView: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 128 * heightScale,
    height: 128 * heightScale,
  },

  nameWing1: {
    right: 10 * heightScale,
    width: 20 * heightScale,
    height: 49 * heightScale,
  },
  nameWing2: {
    left: 10 * heightScale,
    width: 20 * heightScale,
    height: 49 * heightScale,
  },
});
