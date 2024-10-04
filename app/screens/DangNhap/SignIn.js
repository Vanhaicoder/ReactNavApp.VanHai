import { StyleSheet, Text, View,Button, TextInput,Image } from 'react-native'
import React ,{useState}from 'react'

import styles from './signIn.style';

const SignIn = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

const handleSignIn = () => {
  //hàm xử lí
    navigation.replace("Home")
}
const handleSignUp = () => {
  //hàm xử lí
    navigation.replace("SignUp")
}


  return (
    <View style={styles.container}>
        {/* <Image source={require("../../../assets/images/slide1.jpg")} resizeMode='cover' style={{width: 450, height: 200}} /> */}
        <Image source={require("../../../assets/images/1.jpg")} resizeMode='cover' style={{width: 400, height: 250,marginBottom:30}} />
        <Text style={{fontWeight:'bold', fontSize:30,color:'black',marginBottom:30}}>Đăng nhập</Text>
        <View style={styles.view}>
              <TextInput style={styles.input}
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
            />
            
            <TextInput style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              onPress={()=>handleSignIn()}
              title='Đăng nhập'
            />
        </View>
        <View style={{}}>
        <Button style={{color:'white'}}
              onPress={()=>handleSignUp()}
              title='Bạn chưa có tài khoản ? '
            />
        </View>
    
    </View>
    
)}

export default SignIn
