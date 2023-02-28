import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {heightData} from '../modules/globalStyles';
const heightScale = heightData;

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
            return <IconOcticons name="home" color={isFocused ? '#F5FF82' : 'white'} size={heightScale*29} />;
          } else if (route.name === 'Game') {
            title='Game'
            return <IconIonicons color={isFocused ? '#F5FF82' : 'white'} name="game-controller-outline" size={heightScale*32} />;
          } else if (route.name === 'Ranking') {
            title='Ranking'
            return <IconIonicons color={isFocused ? '#F5FF82' : 'white'} name="md-trophy-outline" size={heightScale*32} />;
          } else if (route.name === 'MyPage') {
            title='My Profile'
            return <IconOcticons color={isFocused ? '#F5FF82' : 'white'} name="person" size={heightScale*32} />;
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
    height:heightScale*72,
    backgroundColor:'black',
    paddingVertical:5,
    borderTopColor:'#A4A4A4',
    borderTopWidth:StyleSheet.hairlineWidth,
    // paddingTop:10
  },
  tabBarStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onButtonStyle: {
    fontSize: heightScale*17,
    color: '#F5FF82',

  },
  offButtonStyle: {
    fontSize: heightScale*17,
    color: 'white',

  },
});
export default TabBar;
