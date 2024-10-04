import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity } from 'react-native';

// Dữ liệu sản phẩm (giả sử bạn đã có sản phẩm trong giỏ hàng)
const initialCart = [
  {
    id: '01',
    name: 'Laptop MSI Gaming Stealth 16 Mercedes',
    image: require('../../../assets/images/p2.png'),
    quantity: 1,
    price: 67990000,
  },
  {
    id: '02',
    name: 'Laptop Lenovo Gaming Legion 9',
    image: require('../../../assets/images/p3.png'),
    quantity: 1,
    price: 135990000,
  },
  {
    id: '03',
    name: 'Laptop Acer Nitro 5 Tiger Gaming',
    image: require('../../../assets/images/3.jpg'),
    quantity: 2,
    price: 20990000,
  },
];

const Carts = ({navigation}) => {
  const [cartItems, setCartItems] = useState(initialCart);

  // Hàm tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hàm để tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm để giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>Giá: {(item.price * item.quantity).toLocaleString()}₫</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {calculateTotal().toLocaleString()}₫</Text>
        <Button title="Thanh toán" onPress={() => navigation.navigate('Payment')} />
      </View>
    </View>
  );
};

export default Carts;

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
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center', 
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontSize: 14,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
