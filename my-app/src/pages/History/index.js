import { View, Text } from 'react-native'
import NavBarIcons from '../../Components/NavBar/index';
import styles from './style';
import { firebaseAuth, db } from '../../Helpers/firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';

import * as React from 'react';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

function onPressHome(){
  navigation.navigate('home')
}

export default function History() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [describe, setDescribe] = useState("")
  const [dayWeek, setDayWeek] = useState("");    
  const [link1, setGraph1] = useState("");    
  const [link2, setGraph2] = useState("");    

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
    const docRef = collection(db, "Users");//nome da coleção do firebase: Users
    const q = query(docRef, where("email", "==", user));
    const data = getDocsFirebase(q);
  }, [])

  return (
    

      <WebView
        style={styles.container}
        originWhitelist={['*']}
      source={{ html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" con
          tent="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
          body{
            background-color: aqua;
        }
          </style>
      </head>
      <body>
          <iframe width="100%" height="931" frameborder="0" src=${link1}></iframe>
          <iframe width="100%" height="931" frameborder="0" src=${link2}></iframe>
      </body>
      </html>` }}
    />


  
  );
}

