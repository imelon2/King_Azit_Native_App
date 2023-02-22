import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../AppInner';
import MainPage from './MainPage';
import GamePage from './GamePage';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainPageHome() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{headerShown: false}}
      />
     <Stack.Screen
        name="GamePage"
        component={GamePage}
        options={{headerShown: false}}
      />
      
    </Stack.Navigator>
  );
}



export default MainPageHome;
