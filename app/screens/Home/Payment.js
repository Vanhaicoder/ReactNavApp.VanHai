import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@env';

import momoLogo from '../../../assets/images/momologo.png';
import zaloPayLogo from '../../../assets/images/zalopaylogo.png';
import atmLogo from '../../../assets/images/atmlogo.jpg';
import applePayLogo from '../../../assets/images/applepay.png';

const PaymentScreen = ({ navigation, route }) => {
  const { emailId, cartId } = route.params;

  const handlePayment = async (paymentMethod) => {
    try {
      const token = await AsyncStorage.getItem('jwt-token');
      console.log("Token:", token);
      console.log("Email ID:", emailId);
      console.log("Cart ID:", cartId);
      console.log("Payment Method:", paymentMethod);
      
      if (!token || !emailId || !cartId) {
        Alert.alert("Thông báo", "Không tìm thấy thông tin giỏ hàng hoặc token.");
        return;
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/public/users/${emailId}/carts/${cartId}/payments/${paymentMethod}/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("API Response:", response.data);
  
      if (response.data?.orderStatus === "Order Accepted!") {
        Alert.alert("Thành công", "Thanh toán thành công!", [
          { text: "OK", onPress: () => navigation.navigate('Cart') }
        ]);
      } else {
        Alert.alert("Thất bại", response.data.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      // console.error("Lỗi thanh toán:", error);
      const errorMessage = error.response?.data?.message || "Đã xảy ra lỗi trong quá trình thanh toán.";
      Alert.alert("Lỗi", errorMessage);
    }
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn phương thức thanh toán</Text>
      <View style={styles.paymentOption}>
        <Image source={momoLogo} style={styles.logo} />
        <Button title="Momo" onPress={() => handlePayment('Momo')} color="#4D4DFF" />
      </View>
      <View style={styles.paymentOption}>
        <Image source={zaloPayLogo} style={styles.logo} />
        <Button title="ZaloPay" onPress={() => handlePayment('ZaloPay')} color="#00C800" />
      </View>
      <View style={styles.paymentOption}>
        <Image source={atmLogo} style={styles.logo} />
        <Button title="ATM" onPress={() => handlePayment('ATM Bank')} color="#FFAA00" />
      </View>
      <View style={styles.paymentOption}>
        <Image source={applePayLogo} style={styles.logo} />
        <Button title="Apple Pay" onPress={() => handlePayment('ApplePay')} color="#000000" />
      </View>
      <Button title="Quay lại" onPress={() => navigation.goBack()} style={styles.backButton} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  backButton: {
    marginTop: 20,
  },
});
