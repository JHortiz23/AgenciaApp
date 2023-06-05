import moment from 'moment'
import { Box, FormControl, Input, NativeBaseProvider, ScrollView, Text, View, Center, CloseIcon, Collapse, HStack, IconButton, VStack, Alert, Modal, Button } from 'native-base'
import React, { useState } from 'react'
import { Dimensions, ImageBackground, TouchableOpacity } from 'react-native'
import { styles } from '../styles/GeneralStyles'
import axios from 'axios'

export const UpdateServcies = () => {
  //ALERT
  const [show, setShow] = React.useState(false);
  //BACKGROUND IMG
  const { width, height } = Dimensions.get('window');
  //OBETENER CEDULA
  const [cedula, setCedula] = useState('');
  //LISTA
  const [MyReservations, setMyReservations] = useState([]);
  //OBTENER LISTA

  //VARIABLES PARA ACTUALIZAR
  const [nombreAct, setNombreAct] = useState("");
  const [ApellidosAct, setApellidosAct] = useState("");
  const [CedulaAct, setCedulaAct] = useState("");
  const [codi, setCodi] = useState(null);

  //UPDATE DATA
  const UpdateData = (item1:any, item2: string, item3: string, item4: string) => {
    setNombreAct(item3);
    setApellidosAct(item4);
    setCedulaAct(item2);
    setCodi(item1);
  }

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
          .get('http://192.168.8.102:3000/ModifyReservation?cedula=' + cedula)
          .then(response => {

            const contador = response.data;

            if (contador.length === 0) {

              console.log('SIN RESERVAS MODIFICABLES');
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
  //ELIMINAR
  const Eliminar = (code: number) => {
    axios
      .get('http://192.168.8.102:3000/Delete?code=' + code)
      .then(response => {

        console.log('Cancelado correctamente');
        GetHistory();

      })
      .catch(error => {
        console.log(error);
      });
  };

  // ACTUALIZAR
  // ELIMINAR
  const Update = () => {
    console.log(codi,CedulaAct,nombreAct,ApellidosAct);
    if (CedulaAct === "" || nombreAct === "" || ApellidosAct === "") {
      return;
    } else {
      axios
      .put("http://192.168.8.102:3000/UpdateReserv?codi=" +
          codi +
          "&cedu=" +
          CedulaAct +
          "&nombre=" +
          nombreAct +
          "&apellidos=" +
          ApellidosAct
      )
      .then(response => {
          console.log('Item updated successfully');
          setShowModal(false);
          GetHistory();

      })
      .catch(error => {
          console.log(error);
      });
    }
  }

  const [showModal, setShowModal] = useState(false);
  return (
    <NativeBaseProvider>
      <Box>
        <ImageBackground
          source={{ uri: 'https://img.freepik.com/foto-gratis/fondo-abstracto-textura_1258-30471.jpg' }}

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
                    No hemos encontrado tu reserva. Recuerda que unicamente pueden ser modificas la reservas en estado de espera, de lo contrario debes comunicarte con nuestra oficina, para conocer las politicas de cambios.

                    Generalmente las reservaciones tienen un tiempo de 24 horas para ser modificadas sin recargos.
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
              <Text style={styles.txtBtnBuscar}>Buscar reservas</Text>
            </TouchableOpacity>
          </Box>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 200 }}>

            {MyReservations.map((item, index) => (

              <View key={index} style={styles.ViewItemOnProcess}>
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
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontSize: 16 }}>
                      Monto a pagar:
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}> ₡ {item.Valor_Cupo}</Text>
                    </Text>
                    <Text style={{ textAlign: 'center', backgroundColor: '#ece5ce', flex: 1, margin: 10, borderRadius: 10 }}>{item.Estado_Reserva}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <TouchableOpacity
                      style={styles.btnActualizar}
                      onPress={() => {
                        setShowModal(true);
                        UpdateData(item.Codigo_Reserva, item.Cedula_Cliente, item.Nombre_Cliente, item.Apellidos_Cliente,);
                      }}
                    >
                      <Text style={styles.txtBtnBuscar}>Actualizar</Text>
                    </TouchableOpacity>


                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                      <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Actualizar Informacion personal</Modal.Header>
                        <Modal.Body>
                          <FormControl>
                            <FormControl.Label>Nombre completo</FormControl.Label>
                            <Input
                              value={nombreAct}
                              onChangeText={text => setNombreAct(text)}
                            />
                          </FormControl>

                          <FormControl mt="3">
                            <FormControl.Label>Apellidos</FormControl.Label>
                            <Input
                              value={ApellidosAct}
                              onChangeText={text => setApellidosAct(text)}
                            />
                          </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                              setShowModal(false);
                            }}>
                              Cancelar
                            </Button>
                            <Button onPress={Update}>
                              Guardar cambios
                            </Button>
                          </Button.Group>
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>
                    <TouchableOpacity
                      style={styles.btnEliminar}
                      onPress={() => Eliminar(item.Codigo_Reserva)}
                    >
                      <Text style={styles.txtBtnBuscar}>Cancelar</Text>
                    </TouchableOpacity>
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