import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

// Dữ liệu đơn hàng (giả sử bạn đã có thông tin đơn hàng)
const orders = [
  {
    id: '1',
    items: [
      { name: 'Laptop MSI Gaming Stealth 16', quantity: 1, image: require("../../../assets/images/p2.png") },
      { name: 'Chuột Gaming', quantity: 2, image: require("../../../assets/images/icon.png") },
    ],
    orderDate: '2024-09-20',
    status: 'Đang giao hàng',
  },
  {
    id: '2',
    items: [
      { name: 'Laptop Lenovo Gaming Legion 9', quantity: 1, image: require("../../../assets/images/p3.png") },
    ],
    orderDate: '2024-09-18',
    status: 'Đang đợi duyệt',
  },
];

const Notifications = () => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <TouchableOpacity onPress={() => toggleOrderDetails(item.id)}>
        <Text style={styles.orderTitle}>Đơn hàng #{item.id}</Text>
        <Text>Ngày đặt: {item.orderDate}</Text>
        <Text>Trạng thái: {item.status}</Text>
      </TouchableOpacity>

      {expandedOrderId === item.id && (
        <View style={styles.details}>
          {item.items.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text>{product.name}</Text>
                <Text>Số lượng: {product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn hàng của bạn</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    paddingTop: 10,
    paddingLeft: 10,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  productImage: {
    width: 50, // Set the desired width
    height: 50, // Set the desired height
    borderRadius: 5, // Optional: for rounded corners
    marginRight: 10, // Space between image and text
  },
  productInfo: {
    flex: 1,
  },
});
