import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '@env';

const Orders = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const emailId = await AsyncStorage.getItem('emailId');
      const jwtToken = await AsyncStorage.getItem("jwt-token");

      const response = await axios.get(`${API_BASE_URL}/public/users/${emailId}/orders`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error.message);
      Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedOrderId(selectedOrderId === item.orderId ? null : item.orderId)}>
      <View style={styles.orderItem}>
        <Text style={styles.orderId}>Đơn hàng ID: {item.orderId}</Text>
        <Text>Email: {item.email}</Text>
        <Text>Ngày đặt: {item.orderDate}</Text>
        <Text>Trạng thái: {item.orderStatus}</Text>
        <Text>Phương thức thanh toán: {item.payment.paymentMethod}</Text>
        <Text>Tổng số tiền: {item.totalAmount.toLocaleString()}₫</Text>

        {selectedOrderId === item.orderId && (
          <>
            <Text style={styles.itemTitle}>Sản phẩm:</Text>
            <FlatList
              data={item.orderItems}
              renderItem={renderOrderProduct}
              keyExtractor={(product) => product.orderItemId.toString()}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderOrderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: `${API_BASE_URL}/public/products/image/${item.product.image}` }} style={styles.productImage} 
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.product.productName}</Text>
        <Text>Giá: {item.orderedProductPrice.toLocaleString()}₫</Text>
        <Text>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Đơn hàng đã mua</Text>
    {orders.length === 0 ? (
      Alert.alert(
        "Thông báo",
        "Bạn chưa có đơn hàng, bạn có muốn tạo đơn hàng?",
        [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Đồng ý",
                onPress: async () => {                 
                  navigation.navigate('Feed');                   
                },
            },
        ]
    )
    ) : (
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(order) => order.orderId.toString()}
      />
    )}
  </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
