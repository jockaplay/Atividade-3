import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo'
import * as yup from 'yup'

export default function App() {
  const [passError, setErro] = useState(false)
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [visiblePass, setVisible] = useState(true);
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).required()
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={{fontSize: 30, fontFamily: fontsLoaded ? 'Poppins-Bold' : "", textAlign: 'center', color: '#333'}}>Entrar</Text>
        <Text style={styles.label}>Usuário:</Text>
        <View style={styles.input}><TextInput onChangeText={setLogin} value={login} id='login' placeholder='Digite seu login'/></View>
        <Text style={styles.label}>Senha:</Text>
        <View style={styles.input}><TextInput onChangeText={setPass} value={pass} secureTextEntry={visiblePass} placeholder='Digite sua senha'/></View>
        <Pressable onPress={() => {(visiblePass == true) ? setVisible(false) : setVisible(true)}}><Text style={styles.label2}>Mostrar senha</Text></Pressable>
        <TouchableOpacity onPress={() => {
          schema.isValid({
            username: login,
            password: pass,
          }).then((isValid) => {
            setErro(!isValid)
          })
        }} 
        style={styles.botao}><Text style={{textAlign: 'center'}}>Login</Text></TouchableOpacity>
      </View>
      <Modal animationType='fade' transparent visible={passError}><View style={{flex: 1, backgroundColor: '#0000005f'}}></View></Modal>
      <Modal animationType='slide' transparent visible={passError}>
        <View style={styles.modalView}>
          <View style={styles.card}>
            { passError ? <Text style={styles.label3}>Usuário ou senha inválida.</Text> : null }
            <TouchableOpacity onPress={() => {setErro(false)}} style={styles.botao}><Text style={{textAlign: 'center'}}>Fechar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    backgroundColor: '#00000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card:{
    padding: 20,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f5f5ff',
    borderRadius: 5,
  },
  label: {
    color: '#aaa',
    paddingVertical: 5,
  },
  label2: {
    color: '#22d6d6',
    paddingVertical: 5,
    textAlign: 'center'
  },
  label3: {
    color: '#d62222',
    paddingVertical: 5,
    textAlign: 'center',
  },
  botao: {
    marginTop: 20,
    padding: 10, 
    width: '100%',
    backgroundColor: '#22d6d6',
    justifyContent: 'center',
    borderRadius: 5,
  },
});