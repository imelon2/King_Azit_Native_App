import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';





//찾아보니 React 18버전부터는 안써도 된다 하는데 이상한건 저는 17버전이더라구요...하하...
const DismissKeyboardView: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({children, ...props}) => {

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView
        {...props}
          style={props.style}
          // resetScrollToCoords={{x:0,y:0}}
          // keyboardOpeningTime={0}
          // scrollEnabled={false}
          // showsVerticalScrollIndicator={false}
          // keyboardShouldPersistTaps={'handled'}
          // enableOnAndroid
          // contentContainerStyle={props.style}

          // scrollEnabled={true}
          // showsVerticalScrollIndicator={false}
          // keyboardShouldPersistTaps={'handled'}
          // automaticallyAdjustKeyboardInsets={true}
          // automaticallyAdjustContentInsets={true}
          // contentInsetAdjustmentBehavior='never'
          // enableOnAndroid
        >
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
