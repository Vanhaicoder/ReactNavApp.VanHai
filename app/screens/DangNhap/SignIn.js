import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { authProvider } from '../../api/AuthProvide'; 

import styles from './signIn.style';
import { ImageBackground } from 'react-native-web';

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  

  const handleSignIn = async () => {
    try {
      await authProvider.login({ username, password });
      navigation.replace("Home");
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  const handleSignUp = () => {
    navigation.replace("SignUp");
  };

  return (
    // <ImageBackground 
    //   source={require('../../../assets/images/back.png')} // Thay thế bằng đường dẫn hình ảnh của bạn     
    // >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      
      <Text style={styles.title}>Đăng nhập</Text>
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={{ color: '#007bff' }}>Bạn chưa có tài khoản ?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>

  );
};

export default SignIn;
