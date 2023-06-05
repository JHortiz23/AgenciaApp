import { StyleSheet } from 'react-native';
//AQUI DEFINIMOS TODOS NUESTROS ESTILOS DE FORMA GLOBAL

export const styles = StyleSheet.create({
    //LOGIN STYLES
    LoginBox: {
        padding: 20,
        paddingTop: 70
    },
    txtSpace: {
        height: 30,
    },
    txtLogin: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    InputsLogin: {
        backgroundColor: 'white',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 15,
    },
    btnLogin: {
        backgroundColor: '#79b5ac',
    },
    MainBoxManu: {
        paddingRight: 20,
        paddingLeft: 20,
        flex: 1,
        paddingTop: 70
    },
    SpaceBetween: {
        height: 10
    },
    btnReservar: {
        borderRadius: 10,
        height: 30,
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    txtReservar: {
        textAlign: 'center',
    },
    ViewItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#c6d6b8',
        borderRadius: 10,
        padding: 8
    },
    ViewItemsHistory: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fbe2b9',
        borderRadius: 10,
        padding: 8
    },
    ViewItemOnProcess:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#68baab',
        borderRadius: 10,
        padding: 8
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    ImgItem: {
        flex: 1,
        flexDirection: 'row'
    },
    ImgReserva: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    ViewImg:{
        paddingLeft:5
    },
    BoxReservaConfirmadas:{
        padding:20,
        alignItems: 'center'
    },
    txtBuscarReserva:{
        textAlign:'center',
        flex:1,
        color:'white',
        fontSize:17,
        fontWeight:'bold'

    },
    btnMisReservas:{
        backgroundColor:'#72bca5',
        width:'50%',
        height:35,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    btnActualizar:{
        backgroundColor:'#7ab317',
        width:'40%',
        height:35,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        margin:3
    },
    btnEliminar:{
        backgroundColor:'#fea887',
        width:'40%',
        height:35,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        margin:3
    },
    txtBtnBuscar:{
        alignItems: 'center',
        color:'white',
        fontSize:17,
        fontWeight:'bold',

    }

    //MAIN MENU STYLES

});