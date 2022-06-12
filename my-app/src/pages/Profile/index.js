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
      <View style={styles.topContainer}>
        <FontAwesome style={styles.profileImage} name="user-circle" size={180} color="black" />
      </View>
      <View style={styles.bottomContainer}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.title}><b>Email:</b> {email}</Text>
          <Text style={styles.title}><b>Idade:</b>{age} anos</Text>
          {
          (describe === "" || describe === undefined) ?
            <Text style={styles.title}><b>Tratamento:</b> não está em tratamento</Text>
          :
            <Text style={styles.title}><b>Tratamento:</b>{describe}</Text>
          }
          <Text style={styles.title}><b>Dia da semana:</b>{dayWeek}</Text>
          <Text style={styles.linkEdit}>Editar Perfil</Text>
      </View>
  </View>
  );
}