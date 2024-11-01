import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { dataProvider } from '../../api/DataProvide';
import { API_BASE_URL } from '@env';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width / 2) - 20;

const SanPham = ({ selectedCategory ,searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(0); 
  const [totalPages, setTotalPages] = useState(0); 
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = selectedCategory !== null
          ? await dataProvider.getProductsByCategory(selectedCategory, pageNumber + 1, 6) 
          : await dataProvider.getProducts(pageNumber + 1, 6); 

        setProducts(data.content);
        setTotalPages(data.totalPages); 
      } catch (err) {
        console.error("Error fetching products:", err);
      //   // setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, pageNumber]); 

  const handleNextPage = () => {
    if (pageNumber < totalPages - 1) {
      setPageNumber(prev => prev + 1); 
    }
  };
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VND";
  };
  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(prev => prev - 1); 
    }
  };

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
              // onError={() => setError("Không thể tải hình ảnh")}
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
            <Text style={styles.price}>{formatPrice(item.specialPrice)}</Text>
          </TouchableOpacity>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.productId.toString()}
      />
      <View style={styles.pagination}>
        <Button title="Trước" onPress={handlePreviousPage} disabled={pageNumber === 0} />
        <Text>{`Trang ${pageNumber + 1} / ${totalPages}`}</Text>
        <Button title="Tiếp" onPress={handleNextPage} disabled={pageNumber >= totalPages - 1} />
      </View>
    </View>
  );
};

export default SanPham;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 0 },
  itemContainer: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 16,
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
    width: ITEM_WIDTH,
    marginRight: 10,
  },
  image: { width: 150, height: 150, resizeMode: "contain" },
  productName: { fontWeight: 'bold', marginVertical: 5 },
  ratingContainer: { flexDirection: "row", marginVertical: 5 },
  rating: { flexDirection: "row" },
  ratingText: { marginRight: 4 },
  price: { fontWeight: 'bold', marginTop: 5 },
  columnWrapper: { justifyContent: "space-between" },
  pagination: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
});
