import { Text, View,Button ,Image,TextInput} from 'react-native'
import React ,{useState}from 'react'

import styles from './signUp.style';

const SignUp = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Repeatpassword, setRepeatPassword] = useState('');

  const handleSignIn = () => {
    //hàm xử lí
      navigation.replace("SignIn")
  }
  
  return (
    <View style={styles.container}>
        <Image source={require("../../../assets/images/1.jpg")} resizeMode='cover' style={{width: 400, height: 250,marginBottom:30}} />
        <Text style={{fontWeight:'bold', fontSize:30,color:'black',marginBottom:30}}>Đăng kí</Text>
        <View style={styles.view}>
              <TextInput 
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={(e)=>setUsername(e.value)}
              />
            
            <TextInput style={styles.input}
              placeholder="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
             <TextInput style={styles.input}
              placeholder="Nhập lại mật khẩu"
              value={Repeatpassword}
              onChangeText={Repeatpassword}
              secureTextEntry
            />
            <Button
              onPress={()=>handleSignIn()}
              title='Đăng kí'
            />
        </View>
        <View style={{}}>
        <Button style={{color:'white'}}
              onPress={()=>handleSignIn()}
              title='Bạn đã có tài khoản ? '
            />
        </View>
    
    </View>
    
)}

export default SignUp