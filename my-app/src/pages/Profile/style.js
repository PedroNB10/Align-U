import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    body: {
      backgroundColor: '#0984e3',
      margin: '250 200',
      padding: 0,
     
      fontSize: 16,
    },
    
    mainContainer: {
      height: '100%',
      backgroundColor: '#0984e3',
      borderRadius: 6,
      boxShadow: '1px 5px 1px rgba(0, 0, 0, 0.3',
      display: 'flex',
      flexDirection: 'colum',
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
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'colum',
      justifyContent: 'space-around',
      flexWrap: 'warp',
      alignItems: 'center',
      width: '60%',
      height: '50%',
      backgroundColor: '#dfe6e9',
      textAlign: 'center',
    },

    profileName: {
    
      color: '#6c5ce7',
      fontSize: '1.5em',
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