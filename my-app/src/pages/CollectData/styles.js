import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#4169E1',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    containerText: {
      height: '30%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '99%',
      borderRadius: 10,
      backgroundColor: '#dfe6e9',
      marginTop: 5,
    },

    title: {
      color: '#6c5ce7',
      fontSize: 23,
    },

    titleBtn: {
      fontSize: 35,
      color: '#6c5ce7',
      
    },

    buttonCollect: {
      border: '5 solid #ffff',
      boxshadow: '10 10 5 #aaaaaa',
      alignItems: 'center',
      justifyContent: 'center',
      width: 300,
      height: 300,
      backgroundColor: '#00cec9',
      borderRadius: 500,
      marginBottom: 100,
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },

    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonModal: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      width: 200,
      height: 'auto',
      backgroundColor: "#dfe6e9",
    },
    textStyle: {
      color: '#6c5ce7',
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      color: '#6c5ce7',
      marginBottom: 15,
      textAlign: "center"
    },

    textStyleLabel: {
      color: '#ff7675',
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 20,
    },
    
    
})

export default styles