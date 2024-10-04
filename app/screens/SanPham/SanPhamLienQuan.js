import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { color, products } from './ListSanPham';
import { FontAwesome } from '@expo/vector-icons';

// Lấy chiều rộng màn hình
const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.4; 

const SanPham = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={products} 
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => navigation.navigate('DetailSanPham', { sanPham: item })}
        >
          <Image source={item.image} style={styles.image} />
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text>{item.color}</Text>
            <Text> | </Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <FontAwesome
                name="star"
                size={16}
                color={color.COLOR_PRIMARY}
              />
            </View>
          </View>
          <Text style={styles.price}>{item.price}</Text>
        </TouchableOpacity>
      )}
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.listContainer}
    />
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
