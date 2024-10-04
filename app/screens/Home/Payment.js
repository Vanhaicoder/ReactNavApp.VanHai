import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function Payment() {
  const handlePaymentMethodSelect = (method) => {
    Alert.alert(`Bạn đã chọn phương thức thanh toán: ${method}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang thanh toán</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentMethodSelect('MoMo')}
      >
        <Text style={styles.buttonText}>Thanh toán bằng MoMo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentMethodSelect('Ngân hàng')}
      >
        <Text style={styles.buttonText}>Thanh toán bằng Ngân hàng</Text>
      </TouchableOpacity>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
