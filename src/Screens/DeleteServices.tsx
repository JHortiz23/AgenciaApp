import moment from 'moment'
import { Box, FormControl, Input, NativeBaseProvider, ScrollView, Text, View, Center, CloseIcon, Collapse, HStack, IconButton, VStack, Alert } from 'native-base'
import React, { useState } from 'react'
import { Button, Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
import { styles } from '../styles/GeneralStyles'
import axios from 'axios'

export const DeleteServices = () => {
  //ALERT
  const [show, setShow] = React.useState(false);
  //BACKGROUND IMG
  const { width, height } = Dimensions.get('window');
  //OBETENER CEDULA
  const [cedula, setCedula] = useState('');
  //LISTA
  const [MyReservations, setMyReservations] = useState([]);
  //OBTENER LISTA

  const GetHistory = () => {

    setMyReservations([]);
    
    if (cedula === '') {

      setShow(false);
      return;

    } else {
      if (cedula === '') {
        return;

      } else {
        axios
          .get('http://192.168.8.102:3000/GetHistory?cedula=' + cedula)
          .then(response => {

            const contador = response.data;

            if (contador.length === 0) {

              console.log('No tiene históricos registrados');
              setShow(true);

            } else {
              setShow(false);
              setMyReservations(response.data);
              console.log(response.data);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

    }
  };
  return (
    <NativeBaseProvider>
      <Box>
        <ImageBackground
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIm07dhGsOoU_Qb8lPWRlFEzdiWl9tcli9ag&usqp=CAU' }}

          style={{ width: width, height: height, paddingTop: 20 }}
        >
          <Collapse isOpen={show}>
            <Center>
              <Alert maxW="400" status="info" colorScheme="info">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                        Lo sentimos!
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
                    Esta identificación no posee histórico de reservaciones.
                  </Box>
                </VStack>
              </Alert>
            </Center>
          </Collapse>
          <Box style={styles.BoxReservaConfirmadas}>
            <FormControl>
              <FormControl.Label><Text style={styles.txtBuscarReserva}>IDENTIFICACIÓN</Text>
              </FormControl.Label>
              <Input
                value={cedula}
                onChangeText={text => setCedula(text)}
                style={styles.InputsLogin}
                type='text'
              />
            </FormControl>

            <Text style={styles.txtSpace}></Text>
            <TouchableOpacity
              style={styles.btnMisReservas}
              onPress={GetHistory}
            >
              <Text style={styles.txtBtnBuscar}>Buscar históricos</Text>
            </TouchableOpacity>
          </Box>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 200 }}>

            {MyReservations.map((item, index) => (

              <View key={index} style={styles.ViewItemsHistory}>
                <ScrollView>
                  <View style={styles.ImgItem}>
                    <View>
                      <Text style={{ fontSize: 16 }}>N° reserva: <Text style={{ fontSize: 16, fontWeight: 'bold' }}> {item.Codigo_Reserva}</Text></Text>
                      <Text style={{ fontSize: 16 }}>Paquete: {item.Nombre_Servcio}</Text>
                      <Text style={{ fontSize: 16 }}>Guia: {item.Guia}</Text>
                      <Text style={{ fontSize: 16 }}>Nombre: {item.Nombre_Cliente}</Text>
                      <Text style={{ fontSize: 16 }}>Apellidos: {item.Apellidos_Cliente}</Text>
                      <Text style={{ fontSize: 16 }}>Salida: {moment(item.Fecha_Salida).format('MMMM Do, YYYY')}</Text>
                      <Text style={{ fontSize: 16 }}>Regreso: {moment(item.Fecha_Regreso).format('MMMM Do, YYYY')}</Text>
                    </View>
                    <View style={styles.ViewImg}>
                      <FastImage
                        source={{ uri: 'https://stampa.es/wp-content/uploads/2020/03/sello-automatico-facturado.jpg' }}
                        style={{ width: 170, height: 150, borderRadius: 100 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontSize: 16 }}>
                      Monto a pagar:
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}> ₡ {item.Valor_Cupo}</Text>
                    </Text>
                    <Text style={{ textAlign: 'center', backgroundColor: '#ece5ce', flex: 1, margin: 10 }}>{item.Estado_Reserva}</Text>
                  </View>
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>
      </Box>
    </NativeBaseProvider>
  )
}
