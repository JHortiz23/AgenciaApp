import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../Screens/Home';
import { Login } from '../Screens/Login';
import { styles } from '../styles/GeneralStyles';
import { ImageBackground } from 'react-native';
import { ServicesList } from '../Screens/ServicesList';
import { AddServices } from '../Screens/AddServices';
import { DeleteServices } from '../Screens/DeleteServices';
import { UpdateServcies } from '../Screens/UpdateServcies';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Disponibilidad" component={ServicesList} />
      <Stack.Screen name="Mis reservas" component={AddServices} />
      <Stack.Screen name="Actualizar reserva" component={UpdateServcies} />
      <Stack.Screen name="Mis reservas anteriores" component={DeleteServices} />
    </Stack.Navigator>
  );
}

export default MyStack;