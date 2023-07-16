import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {heightData, widthData} from '../modules/globalStyles';

const Header: React.FC<{
  title: string;
  rightIcon?: any;
  leftIcon?: any;
}> = ({...props}) => {
  return (
    <View style={HeaderStyle.headerContainer}>
      <View style={HeaderStyle.headerLeftIcon}>
        {props.leftIcon ? props.leftIcon() : null}
      </View>
      <View style={HeaderStyle.headerStyle}>
        <Text style={HeaderStyle.headerFontStyle}>{props.title}</Text>
      </View>
      <View style={HeaderStyle.headerRightIcon}>
        {props.rightIcon ? props.rightIcon() : null}
      </View>
    </View>
  );
};

const HeaderStyle = StyleSheet.create({
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
  headerLeftIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    left: widthData * 20,
  },
  headerRightIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    right: widthData * 20,
  },
});

export default Header;
