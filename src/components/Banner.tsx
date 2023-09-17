import {GlobalStyles, heightData, width, widthData} from '@/modules';
import {View, Image, StyleSheet} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList, MyPageRootStackParamList} from 'AppInner';
import {RootState} from '@/store/reducer';
import {useSelector} from 'react-redux';

const Banner = () => {
  const {roles} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');

  const images = [
    require('../assets/MainBanner.png'), 
    require('../assets/MainBanner.png')
    ];
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>>();

  return (
    <View style={GlobalStyles.flexCenter}>
      <View style={BannerStyle.imgSlideBox}>
        <Swiper
          horizontal={true}
          paginationStyle={{bottom: heightData * 5}}
          activeDot={<View style={BannerStyle.activeDot} />}
          dot={<View style={BannerStyle.dot} />}>
          {images.map((uri, index) => (
            <Image key={index} style={BannerStyle.imgSlideBox2} source={uri} />
          ))}
        </Swiper>
      </View>
      {isAdmin ? (
        <IconAntDesign
          style={{position: 'absolute'}}
          name="pluscircleo"
          size={heightData * 30}
          color="white"
          onPress={() => navigation.navigate('SetBanner')}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const BannerStyle = StyleSheet.create({
  imgSlideBox: {
    height: heightData * 265,
  },
  imgSlideBox2: {
    width: width,
    height: heightData * 265,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#484848',
    width: widthData * 27,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#484848',
    opacity: 0.5,
    width: widthData * 8,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default Banner;
