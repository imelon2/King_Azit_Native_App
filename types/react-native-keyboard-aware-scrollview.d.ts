declare module 'react-native-keyboard-aware-scrollview' {
    import * as React from 'react';
    import {Constructor, ViewProps,ScrollViewProps} from 'react-native';
    class KeyboardAwareScrollViewComponent extends React.Component<ViewProps & ScrollViewProps> {}
    const KeyboardAwareScrollViewBase: KeyboardAwareScrollViewComponent &
      Constructor<any>;
    class KeyboardAwareScrollView extends KeyboardAwareScrollViewComponent {}
    export {KeyboardAwareScrollView};
  }