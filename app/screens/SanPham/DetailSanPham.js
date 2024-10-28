import React, { useState,useContext,useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { color } from './ListSanPham';
import { API_BASE_URL } from '@env';
import SanPham from './SanPham';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataProvider } from '../../api/DataProvide';
// import SanPham from './SanPhamLienQuan';

const DetailSanPham = ({ route,navigation }) => {
  const { sanPham } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  if (!sanPham) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy sản phẩm.</Text>
      </View>
    );
  }
  
  const handleAddToCart = async () => {
    try {
      const cartId = await AsyncStorage.getItem("cartId");
      if (!cartId) {
        Alert.alert("Lỗi", "Giỏ hàng không tồn tại. Vui lòng đăng nhập lại.");
        return;
      }

      const productId = sanPham.productId;
      await dataProvider.addProductToCart(cartId, productId, quantity);
      Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng.");
      navigation.navigate("Cart", { refresh: true });
    } catch (error) {
      console.error("Không thể thêm sản phẩm vào giỏ hàng:", error);
      Alert.alert("Thông báo", "Sản phẩm đang tạm hết. Xin lỗi vì sự bất tiện này!.");
    }
  };

  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };
  const data = [
    { key: 'image', content: 
      <Image
              source={{ uri: `${API_BASE_URL}/public/products/image/${sanPham.image}` }}
              style={styles.image}
              // onError={() => setError("Không thể tải hình ảnh")}
            />
  },
    { key: 'title', content: <Text style={styles.title}>{sanPham.productName}</Text> },
    { key: 'info', content: <Text style={styles.info}>{sanPham.description}</Text> },
    { key: 'price', content: <Text style={styles.price}>{formatPrice(sanPham.specialPrice)}</Text> },
    {
      key: 'color',
      content: (
        <View>
          <Text style={styles.color}>
            Màu sắc: Đen xám | 
            <Text style={styles.rating}> {sanPham.rating}
              <FontAwesome name="star" size={16} color={color.COLOR_PRIMARY} />
            </Text>
          </Text>
        </View>
      )
    },
    {
      key: 'quantity',
      content: (
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            keyboardType="numeric"
            onChangeText={text => setQuantity(Math.max(1, parseInt(text) || 1))}
          />
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      )
    },
    {
      key: 'specs', 
      content: (
        <View style={styles.specsContainer}>
          <Text style={styles.specTitle}>Thông số kỹ thuật</Text>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>CPU:</Text>
            <Text style={styles.specValue}>{sanPham.cpu}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>RAM:</Text>
            <Text style={styles.specValue}>{sanPham.ram}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Lưu trữ:</Text>
            <Text style={styles.specValue}>{sanPham.storage}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Màn hình:</Text>
            <Text style={styles.specValue}>{sanPham.screen}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>GPU:</Text>
            <Text style={styles.specValue}>{sanPham.gpu}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Trọng lượng:</Text>
            <Text style={styles.specValue}>{sanPham.weight}</Text>
          </View>
        </View>
      )
    }, 
    {
      key: 'infomore', 
      content: (
        <View style={styles.infomoreContainer}>
          <Text style={styles.infomoreTitle}>Thông tin đi kèm</Text>
          <View style={styles.infomoreItem}>
            <Text style={styles.infomoreLabel}>Phụ kiện:</Text>
            <Text style={styles.infomoreValue}>{sanPham.pkien}</Text>
          </View>
          <View style={styles.infomoreItem}>
            <Text style={styles.infomoreLabel}>Bảo hành:</Text>
            <Text style={styles.infomoreValue}>{sanPham.bhanh}</Text>
          </View>
          <View style={styles.infomoreItem}>
            <Text style={styles.infomoreLabel}>Ưu đãi:</Text>
            <Text style={styles.infomoreValue}>{sanPham.udai}</Text>
          </View>
        </View>
      )
    }, 
    {
      key: 'relatedProducts',
      content: (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sản phẩm tương tự</Text>
          {/* <SanPham/> */}
        </View>
      )
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => item.content}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.fixedButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart()}>
    <Text style={styles.addButtonText}>Thêm vào giỏ hàng</Text>
    </TouchableOpacity>

      </View>
    </View>
  );
};  

export default DetailSanPham;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: '100%', // Đặt chiều rộng bằng 100% của container
    height: 300, // Đặt chiều cao cố định là 300
    borderRadius: 10, // Bo tròn các góc
    marginBottom: 20, // Khoảng cách dưới ảnh
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  rating: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    marginRight: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
    textAlign: 'center',
  },
  color: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    fontSize: 24,
    color: '#333',
    paddingHorizontal: 10,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    padding: 15,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  specsContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  specTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  specLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  specValue: {
    fontSize: 16,
    color: '#555',
  },
  //thong tin di kem
  infomoreContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  infomoreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infomoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infomoreLabel: {
    fontWeight: '500',
    fontSize: 16,
    color: '#333',
  },
  infomoreValue: {
    fontSize: 16,
    color: '#555',
  },
});
