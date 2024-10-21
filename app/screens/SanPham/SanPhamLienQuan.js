import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { dataProvider } from '../../api/DataProvide';
import { API_BASE_URL } from '@env';
import { color, products } from './ListSanPham';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width / 2) - 20;

const SanPham = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await dataProvider.getProducts();
        console.log("Fetched Products:", data);  // Kiểm tra dữ liệu trả về       
        setProducts(data.content);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);  // In lỗi ra console
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('DetailSanPham', { sanPham: item })}
          >
            <Image
              source={{ uri: `${API_BASE_URL}/public/products/image/${item.image}` }}
              style={styles.image}
              onError={() => setError("Không thể tải hình ảnh")}

            />

            <Text style={styles.productName}>{item.productName}</Text>
            <View style={styles.ratingContainer}>
              <Text>{item.categoryName}</Text>
              <Text> | </Text>
              <View style={styles.rating}>
                <Text style={styles.ratingText}>{item.rating}</Text>
                <FontAwesome name="star" size={16} color="#FFD700" />
              </View>
            </View>
            <Text style={styles.price}>{item.price} đ</Text>
          </TouchableOpacity>
        )}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.listContainer}
        keyExtractor={item => item.productId.toString()}
      />
    </View>
  );
};

export default SanPham;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: color.COLOR_LIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
    width: ITEM_WIDTH, // Điều chỉnh chiều rộng cho phù hợp cuộn ngang
    marginRight: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  productName: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    marginRight: 4,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  listContainer: {
    paddingLeft: 10, // Tạo khoảng cách bên trái
  },
});
