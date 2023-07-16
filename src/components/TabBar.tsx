import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import {heightData} from '../modules/globalStyles';

function TabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        let title='';
        const icon = () => {
          if (route.name === 'MainPage') {
            title='Home'
            return <IconIonicons name="md-home-outline" color={isFocused ? '#F5FF82' : 'white'} size={heightData*27} />;
          } else if (route.name === 'Game') {
            title='Game'
            return <IconIonicons color={isFocused ? '#F5FF82' : 'white'} name="game-controller-outline" size={heightData*27} />;
          } else if (route.name === 'Calendar') {
            title='Calendar'
            return <AntDesign color={isFocused ? '#F5FF82' : 'white'} name="calendar"  size={heightData*30} />;
          } else if (route.name === 'Ranking') {
            title='Ranking'
            return <IconIonicons color={isFocused ? '#F5FF82' : 'white'} name="md-trophy-outline" size={heightData*27} />;
          } else if (route.name === 'MyPage') {
            title='My Profile'
            return <IconIonicons color={isFocused ? '#F5FF82' : 'white'} name="person-outline" size={heightData*27} />;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarStyle}
            key={index}>
            {icon()}
            <Text style={isFocused ? styles.onButtonStyle : styles.offButtonStyle}>
              {title}
              </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height:heightData*80,
    backgroundColor:'#121212',
  },
  tabBarStyle: {
    flex: 1,
    marginTop:heightData*10,
    alignItems: 'center',
  },
  onButtonStyle: {
    fontSize: heightData*14,
    color: '#F5FF82',

  },
  offButtonStyle: {
    fontSize: heightData*14,
    color: 'white',

  },
});
export default TabBar;
