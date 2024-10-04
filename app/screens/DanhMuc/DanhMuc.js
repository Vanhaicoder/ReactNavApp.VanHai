import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { categories, color } from './listdanhmuc';

const DanhMuc = () => {
  const [selectedCategory, setSelectedCategory] = useState(0); 

  // Hàm bấm vào danh mục
  const handlePress = (index) => {
    setSelectedCategory(index); 
    console.log(`Bạn đã bấm vào danh mục: ${categories[index].category}`);
    // thao tác
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryContainer,
                { 
                  backgroundColor: selectedCategory === index ? color.COLOR_PRIMARY : color.COLOR_LIGHT 
                }
              ]}
              onPress={() => handlePress(index)} // Gọi hàm khi bấm vào danh mục
            >
              <Text style={[styles.categoryText, { color: selectedCategory === index ? color.COLOR_LIGHT : '#000' }]}>
                {category.category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DanhMuc;

const styles = StyleSheet.create({
  categoryContainer: {
    marginRight: 20,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
  categoryText: {
    fontSize: 18,
  },
});
