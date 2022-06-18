import { View, Image, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import styles from './style';
import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, doc, setDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';

import top_profile_img from './profile-picture.png/'

import user_img from './bottom-profile-img.png/'
import email_user_img from './email-img.png/'
import age_img from './age-img.png/'
import treatment_img from './treatment-img.png/'

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
    //É nesse view  mainContainer que está com problema de css
    
    <View style={styles.bodyContainer}>
       <View style={styles.TopView}></View>
        <Text style={styles.Toptitle}>Perfil</Text>
        <Image source={top_profile_img} style={styles.profileImage} />
      <View style={styles.mainContainer}>

        <View style={styles.bottomContainer}>

           <View style={styles.LabelContainer}>
           <Image source={user_img} style={styles.Icons} />
          <Text style={styles.LabelText} >Usuário</Text>
          </View>

          <Text style={styles.title}>{name}</Text>
          <Image source={email_user_img} style={styles.Icons} />
          <Text style={styles.title}>Email: {email}</Text>
          <Image source={age_img} style={styles.Icons} />
          <Text style={styles.title}>Idade:{age} anos</Text>
          <Image source={treatment_img} style={styles.Icons} />
          {
            (describe === "" || describe === undefined) ?
            
              <Text style={styles.title}>Tratamento: não está em tratamento</Text>
              :
              <Text style={styles.title}>Tratamento:{describe}</Text>
          }
          <Text style={styles.title}>Dia da semana:{dayWeek}</Text>
  
        </View>
      </View>
    </View>
  );
}