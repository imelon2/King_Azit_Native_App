import React, { useEffect } from 'react';
import {NavigationContainer, NavigationProp, useNavigation} from '@react-navigation/native';
import {Provider} from 'react-redux';
import AppInner, { HomeRootStackParamList } from './AppInner';
import store from './src/store/index';
import linking from './src/modules/Linking';
import { Alert, Linking } from 'react-native';

function App() {
  useEffect(() => {
    Linking.getInitialURL()			// 최초 실행 시에 Universal link 또는 URL scheme요청이 있었을 때 여기서 찾을 수 있음 
      .then((value:any) => {
          Alert.alert('getInitialURL', value);
    })
     
      Linking.addEventListener('url', (e) => {		// 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
        Alert.alert(e.url);
        
   });
//    return () => {	
//     Linking.removeEventListener('url', (e) => {	
//       Alert.alert('remove e.url', e.url);
//   });
// };
 })
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
