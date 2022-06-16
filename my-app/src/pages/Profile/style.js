import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    body: {
      backgroundColor: 'black',
      margin: '250 200',
      padding: 0,
      fontSize: 16,
    },
    
    mainContainer: {
      marginTop: 75,
      marginLeft: 95,
      height: '80%',
      backgroundColor: 'black',
      borderRadius: 10,
      width: '50%',
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
      backgroundColor: '#ffff',
      height: 240,
      padding: 5,
      borderRadius: '50%',
      borderBottomColor: '#6c5ce7',
      marginTop: 125,
    },

    bottomContainer: {
    
      
      
      backgroundColor: 'blue',
     
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