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
      source={{ html: 
    
    `<!DOCTYPE html>
    <html lang="PT-BR">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" con tent="width=device-width, initial-scale=1.0">
        <title>History</title>
        <style>
            body {
                background-color: #00008b;
            }
    
            #value_iframe_ubidots {
                width: 40vw;
                height: 10vh;
                border: none;
                border-radius: 40px;
    
            }
    
    
            #data_ubidots {
                width: 70%;
                height: 931px;
                border-radius: 40px;
            }
    
            #container_info {
                display: block;
                align-items: center;
                justify-content: center;
            }
    
            .container_data {
                position: relative;
                width: 80vh;
                height: 600px;
    
    
            }
    
    
            .graph_ubidots {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
    
                border-radius: 40px;
            }
    
            .overlay {
                background-color: transparent;
    
            }

            .topview{
                width:'100%';
                background-color: #00afff;
           
                height: 2vh;
            }

        </style>
    </head>
    
    <body>
    <div class="topview"> </div>
    <center>  <h1 >Último Valor Medido</h1></center>
      
        <div id="container_info">
    
            <center>
                <div>
                    <iframe id="value_iframe_ubidots" frameborder="0"
                    src=${link1}>
    
                    </iframe>
                </div>
            </center>
    
    
    
            <center>
                <div class="container_data">
                    <iframe class="graph_ubidots" frameborder="0"
                    src=${link1}></iframe>
                    <div class=" graph_ubidots overlay" onclick="AmpliarGrafico()"> </div>
    
    
                </div>
    
            </center>
    
    
    
    
            <center>
                <div>
                    <iframe id="data_ubidots" frameborder="0"
                        src=https://stem.ubidots.com/app/dashboards/public/widget/Pvi4OzloJy3FNgaKuq1E7-Q8PcwTkoxWc-JooTrY61U?embed=true></iframe>
                </div>
            </center>
    
    
        </div>
    
    
    
        <script>
    
            let amplify_graph = false;
            function AmpliarGrafico() {
    
                if (amplify_graph == false) {
                    document.querySelector('.container_data').style.transform = 'rotate(90deg)';
             
                    amplify_graph = !amplify_graph
                }
    
                else {
                    document.querySelector('.container_data').style.transform = 'rotate(0deg)';
                
                    amplify_graph = !amplify_graph
                }
    
            }
    
        </script>
    
    </body>
    
    </html>
    `}}
    />


  
  );
}

