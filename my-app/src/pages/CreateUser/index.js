import React from 'react';
import { Platform } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth'
import { firebaseAuth, db } from '../../Helpers/firebaseConfig'
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    ScrollView,
} from 'react-native';
import styles from './styles'
import { collection, doc, setDoc } from "firebase/firestore";



  
export default function CreateUser({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");
  const [isChecked, setCheck] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const days = ["Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira","Sábado","Domingo"]

  


  const handleDayOfWeek = (day) => {
    setModalVisible(!modalVisible);
    setDayWeek(day);
  }
   
  const addFirestore = async () => {
    const data = { 
      email,
      password,
      name,
      age,
      describe,
      dayWeek,
      link1: 'https://stem.ubidots.com/app/dashboards/public/widget/7LXFrLIuGF1RaOSPTESBl_hMku8GJvLJRv5588cACpg?embed=true',    
      link2: 'https://stem.ubidots.com/app/dashboards/public/widget/E691OZOxbtF3EaPN-G2NZXfmHbJiXMm8n7x7OUK9zvw?embed=true',
      link3: 'https://stem.ubidots.com/app/dashboards/public/widget/Pvi4OzloJy3FNgaKuq1E7-Q8PcwTkoxWc-JooTrY61U?embed=true',
    }

    const newDocRef = doc(collection(db, "Users"));
    await setDoc(newDocRef, data);
  }

  const registerFirebase = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      addFirestore();
      navigation.navigate('home')
    })
    .catch((error) => {
      // setErrorLogin(true)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  function handleCheck() {
    setCheck(!check);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
      <Text
        style={styles.title}
      >
        Cadastro
      </Text>
        <Text style={styles.labels}>
            Digite seu nome completo :
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Seu nome"
            type="text"
            onChangeText={(text) => setName(text)}
            value={name}
        />
        <Text style={styles.labels}>
            Digite sua idade :
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Sua idade"
            type="text"
            onChangeText={(text) => setAge(text)}
            value={age}
        />
        <Text style={styles.labels}>
            Insira um email válido :
        </Text>
        <TextInput
            style={styles.input}
            placeholder="exemplo@email.com"
            type="text"
            onChangeText={(text) => setEmail(text)}
            value={email}
        />
        <Text style={styles.labels}>
            Insira uma senha :
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Crie uma senha forte com 6 ou mais dígitos"
            secureTextEntry={true}
            type="text"
            onChangeText={(password) => setPassword(password)}
            value={password}
        />
         
        <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Faz algum tratamento médico?</Text>
          <Checkbox
            value={isChecked}
            onValueChange={setCheck}
            style={styles.checkbox}
          />
         
          <Text style={styles.label}>Sim</Text>
          </View>
          <View>
            {isChecked ?
            <TextInput
              style={styles.input}
              placeholder="describe here"
              type="text"
              onChangeText={(describe => setDescribe(describe))}
              value={describe}
            />
            :
            <></>
            }
          </View>
          <View>
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
                            { days.map((day) => (
                            <Pressable
                                key={day}
                                style={[styles.button, styles.buttonDayModal]}
                                onPress={() => handleDayOfWeek(day)}
                            >
                        <Text style={styles.textStyle}>{day}</Text>
                        </Pressable>
                        ))}
                        
                    </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Selecione o dia: {dayWeek} </Text>
                </Pressable>
                { (email === "" || password === "" || age === '' || name === '' || dayWeek ==='')
        ?
        <TouchableOpacity
          style={styles.buttonLoginDisabled}
          disabled={true}
        >
            <Text style={styles.textButtonLogin}>Cadastrar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={registerFirebase}
        >
            <Text style={styles.textButtonLogin}>Cadastrar</Text>
        </TouchableOpacity>
        }
          </View>

      </View>
       
        <Text style={styles.registration}>
            Já é cadastrado?
            <Text
              style={styles.linkSubscribe}
              onPress={() => navigation.navigate('login')}
            >
                login
            </Text>
        </Text>
        <View />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
