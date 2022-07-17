import React from 'react';
import { Component, useState, useEffect, useRef } from 'react';
import {
  Platform,
  AppRegistry,
  Text,
  View,
  Image,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from './styles'
import { EnviarUbidots, ReceberUbidotsMPU1 } from '../../Helpers/scriptUbidots'

import profilePicture from '../../Images/doctor.png'

import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function CollectData({ route }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");
  const [link1, setGraph1] = useState("");
  const [link2, setGraph2] = useState("");
  const [link3, setGraph3] = useState("");
  const [modalVisible, setModalVisible] = useState(false);



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
      setGraph1(dataQuery.link1)
      setGraph2(dataQuery.link2)
      setGraph3(dataQuery.link3)

      const weekday = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
      const d = new Date();
      let day = weekday[d.getDay()];

      console.log(dataQuery.dayWeek)

      if(day == dataQuery.dayWeek){
        Notifications.scheduleNotificationAsync({
          content: {
            title: "Alerta - Align U ⚠️",
            body: 'Não se esqueça, hoje tem medição🧑‍⚕️',
            data: { data: 'goes here' },
          },
          trigger: {
           seconds:1,
           repeats: false,
         },
       
        })
      }
      
      return dataQuery;
    })
  }



  useEffect(async () => {
   
    
    const user = await firebaseAuth.currentUser.email;
    const docRef = collection(db, "Users");
    const q = query(docRef, where("email", "==", user));
    const data = await getDocsFirebase(q);

      ;

  


  

  
  }, [])

  const handleReceiveUbidots = () => {
    ReceberUbidotsMPU1();
    setModalVisible(!modalVisible);
  }

  const handleSendUbidots = () => {
    EnviarUbidots();
    setModalVisible(!modalVisible);
  }

  return (


    <View style={styles.container}>
      <View style={styles.TopView}></View>

      <View style={styles.separateInfoContainer} >
        <View style={styles.LabelContainer}>
          <Image source={profilePicture} style={styles.Icons} />
          <View style={styles.containerText}>
            <Text style={styles.title}>
              Bem-vindo(a) {name},
            </Text>
            <Text style={styles.title}>
              pressione o botão para coleta de dados.
            </Text>
          </View>
        </View>
        <Text style={styles.title}>{name}</Text>
      </View>


      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textStyleLabel}>Confirma a medição?</Text>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => handleSendUbidots()}
              >
                <Text style={styles.textStyle}>SIM</Text>
              </Pressable>
              <Pressable
                style={[styles.buttonModal]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>NÃO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[styles.buttonCollect]}
          onPress={() => handleReceiveUbidots()}
        >
          <Text style={styles.titleBtn}>Medir Coluna</Text>
        </TouchableOpacity>
      </View>
    </View>


  )
}

{/* <TouchableOpacity style={styles.buttonCollect}>
<Text style={styles.titleBtn}>Iniciar</Text>
</TouchableOpacity>
 */}