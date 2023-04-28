import React, { useEffect } from 'react';
import {NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppInner from './AppInner';
import store from './src/store/index';
import linking from './src/modules/Linking';


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
