import React from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@env'; // Thay thế bằng đường dẫn API của bạn

// Nhập logo cho từng phương thức thanh toán
import momoLogo from '../../../assets/images/momologo.png';
import zaloPayLogo from '../../../assets/images/zalopaylogo.png';
import atmLogo from '../../../assets/images/atmlogo.jpg';
import applePayLogo from '../../../assets/images/applepay.png';

const PaymentScreen = ({ navigation }) => {
  const handlePayment = async (method) => {
    try {
        const emailId = await AsyncStorage.getItem('emailId'); 
        const cartId = await AsyncStorage.getItem('cartId');           

        // Kiểm tra emailId và cartId có tồn tại không
        if (!emailId || !cartId) {
            Alert.alert("Thông báo", "Không tìm thấy thông tin giỏ hàng.");
            return;
        }

        // Gọi API với paymentMethod là phần của URL
        const response = await axios.post(`${API_BASE_URL}/public/users/${emailId}/carts/${cartId}/payments/${method}/order`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Thêm header xác thực
            }
        });

        if (response.data.success) {
            Alert.alert("Thành công", "Thanh toán thành công!");
            navigation.navigate('Success');
        } else {
            Alert.alert("Thất bại", response.data.message || "Có lỗi xảy ra, vui lòng thử lại.");
        }
    } catch (error) {
        console.error("Lỗi thanh toán:", error);
        Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình thanh toán.");
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
        <Button title="ATM" onPress={() => handlePayment('ATM')} color="#FFAA00" />
      </View>

      <View style={styles.paymentOption}>
        <Image source={applePayLogo} style={styles.logo} />
        <Button title="Apple Pay" onPress={() => handlePayment('ApplePay')} color="#000000" />
      </View>

      <Button
        title="Quay lại"
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9', // Màu nền nhẹ nhàng
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Màu chữ đậm
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    padding: 10, // Thêm padding để có khoảng cách với viền
    borderRadius: 8, // Góc bo cho các lựa chọn thanh toán
    backgroundColor: '#FFFFFF', // Màu nền cho từng lựa chọn
    shadowColor: '#000', // Đổ bóng cho các lựa chọn
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // Hiệu ứng đổ bóng cho Android
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
