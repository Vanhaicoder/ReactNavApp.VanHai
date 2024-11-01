import React, { useEffect, useState, useCallback,useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { dataProvider } from '../../api/DataProvide';
import { API_BASE_URL } from '@env';
import { CartContext } from './CartContext';

const Carts = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailId, setEmailId] = useState('');
  const [cartId, setCartId] = useState('');
  const { setProductCount } = useContext(CartContext);


  const fetchCartData = async () => {
    try {
      const storedEmailId = await AsyncStorage.getItem('emailId');
      const storedCartId = await AsyncStorage.getItem('cartId');

      if (!storedEmailId || !storedCartId) {
        console.error("No emailId or cartId found in AsyncStorage");
        return;
      }

      setEmailId(storedEmailId);
      setCartId(storedCartId);

      const jwtToken = await AsyncStorage.getItem("jwt-token");
      if (!jwtToken) {
        console.error("No JWT token found");
        return;
      }

      const cartData = await dataProvider.getCartById(storedEmailId, storedCartId);
      setCartItems(cartData.products || []);
    } catch (error) {
      console.error("Error fetching cart data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setProductCount(cartItems.length); // Đếm số sản phẩm duy nhất
  }, [cartItems]);
  
  useFocusEffect(
    useCallback(() => {
      fetchCartData();
    }, [])
  );

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.specialPrice * item.quantity, 0);
  };

  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.productId === id);
    if (!item) return;

    try {
        const updatedCart = await dataProvider.updateCartQuantity(cartId, id, item.quantity + 1);
        setCartItems(updatedCart.products || []);
    } catch (error) {
        console.error("Lỗi khi tăng số lượng:", error.message);
    }
};

const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.productId === id);
    if (!item || item.quantity <= 1) return; 

    try {
        const updatedCart = await dataProvider.updateCartQuantity(cartId, id, item.quantity - 1);
        setCartItems(updatedCart.products || []);
    } catch (error) {
        console.error("Lỗi khi giảm số lượng:", error.message);
    }
};
const deleteProductFromCart = async (productId) => {
  Alert.alert(
    "Xác nhận",
    "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
    [
      {
        text: "Hủy",
        style: "cancel"
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            console.log(`Attempting to remove product ${productId} from cart ${cartId}`);
            await dataProvider.deleteProductFromCart(cartId, productId);
            fetchCartData(); 
          } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error.message);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại.");
          }
        }
      }
    ]
  );
};
const handlePayment = async () => {
  try {
    const emailId = await AsyncStorage.getItem('emailId');
    const cartId = await AsyncStorage.getItem('cartId');

    
    if (!emailId || !cartId) {
      Alert.alert("Thông báo", "Không tìm thấy thông tin giỏ hàng.");
      return;
    }

    
    navigation.navigate('Payment', { emailId, cartId });
  } catch (error) {
    console.error("Lỗi khi chuyển hướng đến màn hình thanh toán:", error);
    Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình chuyển hướng.");
  }
};
const renderCartItem = ({ item }) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: `${API_BASE_URL}/public/products/image/${item.image}` }} style={styles.productImage} 

  />
    <View style={styles.productDetails}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text>Giá: {(item.specialPrice * item.quantity).toLocaleString()}₫</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.productId)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.productId)} style={styles.quantityButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={() => deleteProductFromCart(item.productId)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
  </View>
);

  if (loading) {
    return <Text>Đang tải giỏ hàng...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.productId}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {calculateTotal().toLocaleString()}₫</Text>
        <Button title="Thanh toán" onPress={(handlePayment)} />
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
