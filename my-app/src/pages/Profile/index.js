import { View, Image, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import styles from './style';
import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, doc, setDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

export default function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");    

  const getDocsFirebase = async (q) => {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const dataQuery = doc.data();
    console.log(dataQuery);
    setName(dataQuery.name)
    setEmail(dataQuery.email)
    setAge(dataQuery.age)
    setDescribe(dataQuery.describe)
    setDayWeek(dataQuery.dayWeek)
    return dataQuery;
  })
}

  useEffect(() => {
  const user = firebaseAuth.currentUser.email;
  const docRef = collection(db, "Users");
  const q = query(docRef, where("email", "==", user));
  const data = getDocsFirebase(q);
}, [])
  
  return (
  <View style={styles.mainContainer}>
      
      <View style={styles.bottomContainer}>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.title}>Email: {email}</Text>
            <Text style={styles.title}>Idade:{age} anos</Text>
            {
            (describe === "" || describe === undefined) ?
              <Text style={styles.title}>Tratamento: não está em tratamento</Text>
            :
              <Text style={styles.title}>Tratamento:{describe}</Text>
            }
            <Text style={styles.title}>Dia da semana:{dayWeek}</Text>
            <Text style={styles.linkEdit}>Editar Perfil</Text>
        </View>
  </View>
  );
}