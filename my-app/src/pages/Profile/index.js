
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

import { signOut} from 'firebase/auth';

import profilePicture from '../../Images/profilePicture.png'
import bottomProfile from '../../Images/bottomProfile.png'
import emailImg from '../../Images/emailImg.png'
import age_img from '../../Images/age.png'
import treatmentImg from '../../Images/treatmentImg.png'
import weekDay from '../../Images/weekDay.png'

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

  let logout = () => {
    signOut( firebaseAuth).then(() => {
      navigation.navigate('login');
    });
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
          <Image source={profilePicture} style={styles.profileImage} />
          <View style={styles.mainContainer}>

            <View style={styles.bottomContainer}>

              <View style={styles.separateInfoContainer} >
                <View style={styles.LabelContainer}>
                  <Image source={profilePicture} style={styles.Icons} />
                  <Text style={styles.LabelText} >Usuário</Text>
                </View>
                <Text style={styles.title}>{name}</Text>
              </View>

              <View style={styles.separateInfoContainer} >
                <View style={styles.LabelContainer}>
                  <Image source={emailImg} style={styles.Icons} />
                  <Text style={styles.LabelText}>Email</Text>
                </View>
                <Text style={styles.title}>{email}</Text>
              </View>


              <View style={styles.separateInfoContainer} >
                <View style={styles.LabelContainer}>
                  <Image source={age_img} style={styles.Icons} />
                  <Text style={styles.LabelText}>Idade</Text>
                </View>
                <Text style={styles.title}>{age} anos</Text>
              </View>

              <View style={styles.separateInfoContainer} >
                <View style={styles.LabelContainer}>
                  <Image source={treatmentImg} style={styles.Icons} />
                  <Text style={styles.LabelText}>Tratamento</Text>
              
        
        
                </View>
                {
        (describe === "" || describe === undefined) ?
          <Text style={styles.title}>não está em tratamento</Text>
        :
         <Text style={styles.title}>{describe}</Text>
        }
              
              </View>

              <View style={styles.separateInfoContainer} >
                <View style={styles.LabelContainer}>
                  <Image source={weekDay} style={styles.Icons} />
            
                  <Text style={styles.LabelText}>Dia da semana</Text>
                </View>
                <Text style={styles.title}>{dayWeek}</Text>
              </View>

              <Button color="#fc447a"
                title="Logout"
            

                onPress={logout}
              />


            </View>


          </View>




        </View>




      </ScrollView>

    </View>
  );
}