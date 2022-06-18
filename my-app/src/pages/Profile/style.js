import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  Icons: {
 
    width: 30,
    height: 30,
   left:10,

  },
  
    bodyContainer: {
      backgroundColor: '#00008b',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      fontFamily: "Roboto",

    },

    TopView: {
      
      width:'100%',
      backgroundColor: '#a9b8f4',
      height: '4.2%',
      fontFamily: "Roboto",
     
    },
    
    mainContainer: {
      
      marginTop: '9%',
      height: '70%',
   
      backgroundColor: 'orange',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      fontFamily: "Roboto",
      
    },
    
    topContainer: {
      width: '100%',
      height: 120,
      borderRadius: 6,
      backgroundColor: '#00cec9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: '0.5',
     
      
    },
    
    profileImage: {
      
      height: 100,
      width: 100,
      
      
    },

    bottomContainer: { // container das informações de login
    
      marginTop: '9%',
      width: '100%',
    
      marginBottom: '30%',
    },

  

    LabelContainer: {
      marginLeft: '9%',
      width: '100%',
      flexDirection: "row",
      flexWrap: "wrap",
      
    },

    LabelText: {
  
      paddingTop: '1%',
      paddingLeft: '7.4%',
      flexDirection: "row",
      flexWrap: "wrap",
      fontSize: 17,
      color: 'white', 
      fontWeight: 'bold',
      
    },

    profileName: {
    
      color: '#6c5ce7',
      fontWeight: 'bold',
    },

    Toptitle: {
      fontSize: 20,
      color: 'white', 
      paddingBottom: '13%',

    },

    title: {
      width: '100%',
      paddingLeft: '25%',
      alignContent: 'flex-start',
      
      fontSize: 17,
      color: 'white', 
    },

    linkEdit: {
     
      fontSize: 12, 
    },
})

export default styles