import { Box, NativeBaseProvider, View } from 'native-base'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Button, ImageBackground } from 'react-native'
import { styles } from '../styles/GeneralStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-svg';

//interfaz de navegacion
interface Props extends StackScreenProps<any, any> { }

export const Home = ({ navigation }: Props) => {
  return (
    <NativeBaseProvider>
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80' }} style={{ flex: 1 }}>
        <Box style={styles.MainBoxManu}>
          <Button
            title="Tours disponibles"
            onPress={() => navigation.navigate('Disponibilidad')}
          />
          <View style={styles.SpaceBetween}></View>
          <Button
            title="Mis reservas"
            onPress={() => navigation.navigate('Mis reservas')}
          />
          
          <View style={styles.SpaceBetween}></View>
          <Button
            title="Actualizar reserva"
            onPress={() => navigation.navigate('Actualizar reserva')}
          />

          <View style={styles.SpaceBetween}></View>
          <Button
            title="Historicos de reservas"
            onPress={() => navigation.navigate('Mis reservas anteriores')}
          />
        </Box>
      </ImageBackground>
    </NativeBaseProvider>
  )
}
