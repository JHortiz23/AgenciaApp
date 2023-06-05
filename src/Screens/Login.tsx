import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Button, Image, View, ImageBackground, Linking } from 'react-native'
import { NativeBaseProvider, Box, Center, FormControl, Input, Link, HStack,Alert, Collapse, VStack, IconButton, CloseIcon,Text } from "native-base";
import { styles } from '../styles/GeneralStyles';
import axios from 'axios';

interface Props extends StackScreenProps<any, any> { }

export const Login = ({ navigation }: Props) => {

  const phoneNumber = "87474054"; // Mi phone number

  const openWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp abierto');
      })
      .catch((error) => {
        console.log('Error al abrir WhatsApp:', error);
      });
  }

  //CAPTURAR USUARIO
  const [username, setUsername] = useState("");
  //CAPTURAR PASSWORD
  const [userpassword, setUserpassword] = useState("");
  //ALERT
  const [show, setShow] = React.useState(false);

  //Limpiar form
  const Clear = () => {
    setUsername("");
    setUserpassword("");
  }

  const VerifyUser = () => {
    axios.get("http://192.168.8.102:3000/Verify?username=" + username + "&password=" + userpassword)
      .then(response => {

        const contador = response.data;

        if (contador.length === 0) {
          console.log('El usuario no existe');
          setShow(true);
        } else {
          console.log('Acceso concedido');
          setShow(false);
          Clear();
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <NativeBaseProvider>
      <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80' }} style={{ flex: 1 }}>
        <Collapse isOpen={show}>
          <Center>
            <Alert maxW="400" status="info" colorScheme="info">
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                  <HStack flexShrink={1} space={2} alignItems="center">
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                      Acceso denegado!
                    </Text>
                  </HStack>
                  <IconButton variant="unstyled" _focus={{
                    borderWidth: 0
                  }} icon={<CloseIcon size="3" />} _icon={{
                    color: "coolGray.600"
                  }}
                    onPress={() => setShow(false)}
                  />
                </HStack>
                <Box pl="6" _text={{
                  color: "coolGray.600"
                }}>
                  Nombre de usuario o contraseña no existe.
                </Box>
              </VStack>
            </Alert>
          </Center>
        </Collapse>
        <Center>
          <Text style={{ fontSize: 20, marginTop: 10, color: '#c6d4e1' }}>VIAJEROS SIN FRONTERAS</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>BIENVENIDO</Text>
        </Center>
        <Box style={styles.LoginBox}>
          <FormControl>
            <FormControl.Label><Text style={styles.txtLogin}>Nombre de usuario</Text></FormControl.Label>
            <Input
              style={styles.InputsLogin}
              value={username}
              onChangeText={text => setUsername(text)}
            />
          </FormControl>

          <Text style={styles.txtSpace}></Text>
          <FormControl>
            <FormControl.Label><Text style={styles.txtLogin}>Contraseña de usuario</Text></FormControl.Label>
            <Input
              value={userpassword}
              onChangeText={text => setUserpassword(text)}
              style={styles.InputsLogin}
              type='password'
            />
          </FormControl>

          <Text style={styles.txtSpace}></Text>
          <Button
            title="Iniciar sesión"
            onPress={VerifyUser}
          />
          <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "#c5f7f0"
          }} alignSelf="flex-end" mt="1">
            ¿Olvidó su contraseña?
          </Link>

          <HStack mt="6" justifyContent="center">
            <Text>
              Reportar un problema.{" "}
            </Text>
            <Link _text={{
              color: "#e3e0b3",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={openWhatsApp}>
              Whatsapp soporte
            </Link>
          </HStack>
        </Box>
      </ImageBackground>
    </NativeBaseProvider>
  )
}
