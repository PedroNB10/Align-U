
import {
  Text,
  View,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';

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
import weekday_img from './week-day-img.png/'

export default function Profile({ navigation }) {
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
    <View>
      <View style={styles.TopView}></View>
      <ScrollView>
        <View style={styles.bodyContainer}>


          <Text style={styles.Toptitle}>Perfil</Text>
          <Image source={top_profile_img} style={styles.profileImage} />
          <View style={styles.mainContainer}>

            <View style={styles.bottomContainer}>

              <View style={styles.LabelContainer}>
                <Image source={user_img} style={styles.Icons} />
                <Text style={styles.LabelText} >Usuário</Text>
              </View>

              <Text style={styles.title}>{name}</Text>

              <View style={styles.LabelContainer}>
                <Image source={email_user_img} style={styles.Icons} />
                <Text style={styles.LabelText}>Email</Text>
              </View>

              <Text style={styles.title}>{email}</Text>

              <View style={styles.LabelContainer}>
                <Image source={age_img} style={styles.Icons} />
                <Text style={styles.LabelText}>Idade</Text>
              </View>

              <Text style={styles.title}>{age} anos</Text>

              <View style={styles.LabelContainer}>
                <Image source={treatment_img} style={styles.Icons} />
                <Text style={styles.LabelText}>Tratamento</Text>
              </View>

              {
                (describe === "" || describe === undefined) ?

                  <Text style={styles.title}>não está em tratamento</Text>
                  :
                  <Text style={styles.title}>{describe}</Text>
              }

              <View style={styles.LabelContainer}>
                <Image source={weekday_img} style={styles.Icons} />
                <Text style={styles.LabelText}>Dia da semana</Text>

              </View>

              <Text style={styles.title}>{dayWeek}</Text>


              <Button 
                title="Logout"
                onPress={() => navigation.navigate('login')}
              />


            </View>


          </View>




        </View>




      </ScrollView>

    </View>
  );
}