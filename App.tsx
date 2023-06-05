import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { Home} from './src/Screens/Home';
import { Login } from './src/Screens/Login';
import MyStack from './src/Navegacion/stackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}