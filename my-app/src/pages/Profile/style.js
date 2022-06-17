import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    bodyContainer: {
      backgroundColor: '#00008b',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },
    
    mainContainer: {
      marginTop: '50%',
      height: '70%',
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
      
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
      padding: 5,
      
    },

    bottomContainer: {
      alignItems: 'center',
      backgroundColor: 'blue',
      marginBottom: 45,
    },

    profileName: {
    
      color: '#6c5ce7',
      
      fontWeight: 'bold',
    },

    title: {
      alignContent: 'flex-start',
      
      fontSize: 20,
      color: '#6c5ce7', 
    },

    linkEdit: {
     
      fontSize: 12, 
    },
})

export default styles