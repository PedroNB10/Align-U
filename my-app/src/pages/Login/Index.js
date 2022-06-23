import React from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth'
import { firebaseAuth } from '../../Helpers/firebaseConfig'
import { useState, useEffect } from 'react';


import {
    Text, 
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import styles from './styles'
import { Platform } from 'react-native';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    //server para caso a pessoa feche o app, daí ele loga com os dados armazenados anteriores
    if (firebaseAuth.currentUser) {
        navigation.navigate('home');
      } else {
        onAuthStateChanged(firebaseAuth, (user) => {
          if (user) {
            navigation.navigate('home');
          }
        });
      }


    const loginFirebase = () => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const { uid } = user; 
            // console.log(uid);
            navigation.navigate('home', { uid })
        })
        .catch((error) => {
            setErrorLogin(true)
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    useEffect(() => {

    }, [])

    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Text
                style={styles.title}
            >
              Login
            </Text>
            <TextInput
              id="inputname"
              style={styles.input}
              placeholder="enter your email"
              type="text"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="enter your password"
              secureTextEntry={true}
              type="text"
              onChangeText={(password) => setPassword(password)}
              value={password}
            />
            {(errorLogin)
            ?
            <View style={styles.contentAlert}>
                <MaterialCommunityIcons
                    name='alert-circle'
                    size={24}
                    color='#bdbdbd'
                />
                <Text style={styles.warningAlert}>
                    invalid email or password !!!
                </Text>
            </View>
            :
            <>
            </>
            }
            { (email === "" || password === "")
            ?
            <TouchableOpacity
                style={styles.buttonLoginDisabled}
                disabled={true}
            >
                <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                style={styles.buttonLogin}
                onPress={loginFirebase}
            >
                <Text style={styles.textButtonLogin}>Entrar</Text>
            </TouchableOpacity>
            }
            <Text style={styles.registration}>
                Não é cadastrado ainda?
                <Text
                    style={styles.linkSubscribe}
                    onPress={() => navigation.navigate('createUser')}
                >
                    criar perfil
                </Text>
            </Text>
            <View style={{height: 100}}/>
        </KeyboardAvoidingView>
  );
}
