import { Box, Button, Center, FormControl, Input, Modal, NativeBaseProvider, VStack, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GeneralStyles';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

export const ServicesList = () => {
  //modal
  const [showModal, setShowModal] = useState(false);
  const { width, height } = Dimensions.get('window');
  const [servicesList, setServicesList] = useState([]);
  //OBTENER DATOS RESERVA
  const [codigoServicio, setCodigoServicio] = useState(null)
  const [nombreServicio, setNombreServicio] = useState(null)
  const [precioServicio, setPrecioServicio] = useState(null)


  const [cedulaClient, setCedulaClient] = useState("")
  const [nombreClient, setNombreClient] = useState("")
  const [apellidosClient, setApellidosClient] = useState("")
  const [telefono, setTelefono] = useState(null)
  const [correo, setCorreo] = useState("")
  const [fechaReserva, setFechaReserva] = useState("")

  useEffect(() => {
    GetList();
  }, []);

  const GetList = () => {
    axios
      .get('http://192.168.8.102:3000/GetGeneralData')
      .then(response => {
        setServicesList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderButton = (cuposDisponibles: number) => {
    let btnText = '';
    let isButtonDisabled = false;
    let btnTextColor = '';

    if (cuposDisponibles === 0) {
      btnText = 'NO DISPONIBLE';
      isButtonDisabled = true;
      btnTextColor = '#FC8374';
    } else {
      btnText = 'RESERVAR';
      isButtonDisabled = false;
      btnTextColor = '#028f76';
    }

    return (
      <TouchableOpacity style={[styles.btnReservar, { backgroundColor: btnTextColor }]} disabled={isButtonDisabled} onPress={() => {
        setShowModal(true);
      }}>
        <Text style={styles.txtReservar}>{btnText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <NativeBaseProvider>
      <Box>
        <ImageBackground
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_krMvZnNY6JCJOrZrz1FCMix1VU10Y5DlAA&usqp=CAU' }}
          style={{ width: width, height: height, paddingTop: 20 }}
        >
          <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 200 }}>
            {servicesList.map((item, index) => (
              <View key={index} style={styles.ViewItems}>
                <ScrollView>
                  <View style={styles.ImgItem}>
                    <View>
                      <Text style={{ fontSize: 16 }}>Codigo: {item.Codigo_Servicio}</Text>
                      <Text style={{ fontSize: 16 }}>Tour: {item.Nombre_Servcio}</Text>
                      <Text style={{ fontSize: 16 }}>Disponibles: {item.Cupos_Disponibles}</Text>
                      <Text style={{ fontSize: 16 }}>Salida: {moment(item.Fecha_Salida).format('MMMM Do, YYYY')}</Text>
                      <Text style={{ fontSize: 16 }}>Regreso: {moment(item.Fecha_Regreso).format('MMMM Do, YYYY')}</Text>
                    </View>
                    <View style={styles.ViewImg}>
                      <FastImage
                        source={{ uri: 'https://www.gamcaappointment.org/images/book-now.gif' }}
                        style={{ width: 180, height: 180 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={{ fontSize: 16 }}>
                      Precio:
                      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>₡{item.Valor_Cupo}</Text>
                    </Text>
                    {renderButton(item.Cupos_Disponibles)}

                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                      <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>SOLICITAR RESERVA</Modal.Header>
                        <Modal.Body>
                          <FormControl>
                            <FormControl.Label>Codigo de reserva</FormControl.Label>
                            <Input

                            />
                          </FormControl>

                          <FormControl mt="3">
                            <FormControl.Label>Servicio</FormControl.Label>
                            <Input

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
                            <Button>
                              Guardar cambios
                            </Button>
                          </Button.Group>
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>

                  </View>
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </ImageBackground>
      </Box>
    </NativeBaseProvider>
  );
};
