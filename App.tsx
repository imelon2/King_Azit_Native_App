import React from 'react';
import Config from 'react-native-config';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppInner from './AppInner';
import store from './src/store/index';

console.log(Config.TEST_VALUE);

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
