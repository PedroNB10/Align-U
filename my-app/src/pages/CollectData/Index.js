import React from 'react';
import { useState, useEffect } from 'react';
import {
    Text, 
    View,
    Modal,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from './styles'
import { EnviarUbidots, ReceberUbidotsMPU1 } from '../../Helpers/scriptUbidots'

export default function CollectData({ route }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");    
  const [link1, setGraph1] = useState("");    
  const [link2, setGraph2] = useState("");
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
      return dataQuery;
    })
  }

  useEffect(() => {
    const user = firebaseAuth.currentUser.email;
    const docRef = collection(db, "Users");
    const q = query(docRef, where("email", "==", user));
    const data = getDocsFirebase(q);
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
      <View style={styles.containerText}>
        <Text style={styles.title}>
          Bem-vindo {name}
        </Text>
        <Text style={styles.title}>
          Pressione o botão para coleta de dados!!!
        </Text>
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
              <Text style={styles.textStyleLabel}>Confirma o envio?</Text>
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
          <Text style={styles.titleBtn}>Coletar Dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

{/* <TouchableOpacity style={styles.buttonCollect}>
<Text style={styles.titleBtn}>Iniciar</Text>
</TouchableOpacity>
 */}