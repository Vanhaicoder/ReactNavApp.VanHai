import { Text, View, TextInput, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './signUp.style';
import { API_BASE_URL } from '@env';
import RNPickerSelect from 'react-native-picker-select'; // Thêm import cho picker
import { QuocGia,ThanhPho,Tinh } from '../DanhMuc/map';
// Danh sách tỉnh, thành phố và quốc gia

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [street, setStreet] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [city, setCity] = useState(''); 
  const [state, setState] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [pincode, setPincode] = useState('');

  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và mật khẩu nhập lại không khớp');
      return;
    }

    const data = {
      userId: 0,
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: username,
      password: password,
      roles: [{ roleId: 102, roleName: "USER" }],
      address: {
        addressId: 0,
        street: street,
        buildingName: buildingName,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      },
      cart: { cartId: 0, totalPrice: 0, products: [] }
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      const token = response.data["jwt-token"];
      await AsyncStorage.setItem("jwt-token", token);
      await AsyncStorage.setItem("username", username);
      Alert.alert('Đăng ký thành công!', 'Bạn đã đăng ký thành công!');
      navigation.replace("SignIn");
    } catch (error) {
      Alert.alert('Đăng ký thất bại', 'Đăng ký không thành công. Vui lòng thử lại.');
      console.error("Error during sign up:", error.response ? error.response.data : error.message);
    }
  };

  const handleSignIn = () => {
    navigation.replace("SignIn");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>Đăng ký</Text>
      <View style={styles.view}>
        {/* Last Name and First Name on the same row */}
        <View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Họ"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Tên"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

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
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Số nhà"
          value={buildingName}
          onChangeText={setBuildingName}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên đường"
          value={street}
          onChangeText={setStreet}
        />       

<RNPickerSelect
  placeholder={{ label: "Chọn thành phố...", value: null }}
  items={ThanhPho.map(city => ({ label: city, value: city }))}
  onValueChange={(value) => setCity(value)}
  style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
/>

<RNPickerSelect
  placeholder={{ label: "Chọn tỉnh...", value: null }}
  items={Tinh.map(state => ({ label: state, value: state }))}
  onValueChange={(value) => setState(value)}
  style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
/>

<RNPickerSelect
  placeholder={{ label: "Chọn quốc gia...", value: null }}
  items={QuocGia.map(country => ({ label: country, value: country }))}
  onValueChange={(value) => setCountry(value)}
  style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
/>
        <TextInput
          style={styles.input}
          placeholder="Mã bưu chính"
          value={pincode}
          onChangeText={setPincode}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupButton}>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={{ color: '#007bff', textAlign: 'center' }}>Bạn đã có tài khoản?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
