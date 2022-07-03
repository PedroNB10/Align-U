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
  const [link3, setGraph3] = useState("");   

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
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto:ital,wght@0,300;0,400;1,900&display=swap" rel="stylesheet">
        <style>
            body {
                background-color: #0E405B;
                margin: 0;
            }
    
            #value_iframe_ubidots {
                width: 40vw;
                height: 10vh;
                border: none;
                border-radius: 40px;
    
    
            }
    
    
            #data_ubidots {
                width: 70%;
                height: 30vh;
                border-radius: 40px;
            }
    
            #container_info {
                display: block;
                align-items: center;
                justify-content: center;
            }
    
            .container_data {
                position: relative;
                width: 95vw;
                height: 25vh;
    
    
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
    
            .topview {
                width: '100%';
                background-color: #00afff;
                height: 4vh;
            }
    
            .titles {
                color: white;
                font-size: 60px;
                font-family: 'Roboto', sans-serif;
              
            }
        </style>
    </head>
    <div class="topview"> </div>
    
    <body>
    
      
    
        <div id="container_info">
    
            <center>
                <div id="container_last_value">
                    <center><h1 class="titles">Último Valor Medido <h1/></center>
    
                    <iframe id="value_iframe_ubidots" frameborder="0"
                    src=${link1}>
    
                    </iframe>
                </div>
            </center>
    
    
    
            <div>
                <div class="graphic_title">
                    <center><h1 class="titles">Gráfico<h1/></center>
                </div>
               
                <center>
                    <div class="container_data">
                        
                        
                        <iframe class="graph_ubidots" frameborder="0"
                        src=${link2}></iframe>
                        <div class=" graph_ubidots overlay" onclick="AmpliarGrafico()"> </div>
        
        
                    </div>
        
                </center>
            </div>
            
    
    
    
    
            <center>
                <div id="container_historic">
                    <center><h1 class="titles">Histórico de dados<h1/></center>
                    <iframe id="data_ubidots" frameborder="0"
                    src=${link3}></iframe>
                </div>
            </center>
    
    
        </div>
    
    
    
        <script>
    
            let amplify_graph = false;
        
            
            function AmpliarGrafico() {
                
    
                if (amplify_graph == false) {// ampliação detectada
                   // body.style.marginBottom = '30vw'; 
                    
                    document.querySelector('.container_data').style.marginTop = '53%';
                    
                    document.querySelector('.container_data').style.marginLeft = '-32%'; //substitui o marginRight
    
                    document.querySelector('.container_data').style.width = '165vw'; 
                    document.querySelector('.container_data').style.height = '40vh'; 
    
    
                   
                    document.querySelector('.container_data').style.transform = 'rotate(90deg)';
                    document.querySelector('#container_last_value').style.display = 'none';
                    document.querySelector('#container_historic').style.display = 'none';
                    document.querySelector('.topview').style.display = 'none';
                    document.querySelector('.graphic_title').style.display = 'none';
                
    
                   
    
    
                    amplify_graph = !amplify_graph
                    
                     setTimeout(() => {
                         alert('Para minimizar o gráfico clique novamente sobre ele!')
                         }, 500)
    
                   
                }
    
                else {
    
    
    
                    document.querySelector('.container_data').style.marginTop = '0vh'; 
                    document.querySelector('.container_data').style.marginLeft = '0vh'; 
    
                    document.querySelector('.container_data').style.width = '95vw'; 
                    document.querySelector('.container_data').style.height = '25vh'; 
    
                    document.querySelector('.container_data').style.transform = 'rotate(0deg)';
                    document.querySelector('#container_last_value').style.display = 'block'; 
                    document.querySelector('#container_historic').style.display = 'block'; 
                    document.querySelector('.topview').style.display = 'block';
                    document.querySelector('.graphic_title').style.display = 'block';
    
                   
                    
                    
    
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

