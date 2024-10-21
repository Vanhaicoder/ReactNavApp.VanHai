import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { dataProvider } from '../../api/DataProvide'; 
import { color } from './listdanhmuc'; 

const DanhMuc = ({ onCategorySelect }) => { // Nhận hàm callback từ props
  const [selectedCategory, setSelectedCategory] = useState(null); // Cập nhật thành null
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true); 

  // Hàm gọi danh sách danh mục từ API
  const fetchCategories = async () => {
    try {
      const data = await dataProvider.getCategories();
      console.log("Dữ liệu danh mục:", data); 
      setCategories(data.content); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Hàm bấm vào danh mục
  const handlePress = (index) => {
    const category = categories[index]; // Lấy danh mục được chọn
    setSelectedCategory(category.categoryId); // Cập nhật selectedCategory
    onCategorySelect(category.categoryId); // Gọi hàm callback
    console.log(`Bạn đã bấm vào danh mục: ${category.categoryName}`); 
  };
  
  if (loading) {
    return <Text>Đang tải danh mục...</Text>;
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.isArray(categories) && categories.length > 0 ? ( 
          categories.map((category, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.categoryContainer,
                  { 
                    backgroundColor: selectedCategory === category.categoryId ? color.COLOR_PRIMARY : color.COLOR_LIGHT 
                  }
                ]}
                onPress={() => handlePress(index)} 
              >
                <Text style={[styles.categoryText, { color: selectedCategory === category.categoryId ? color.COLOR_LIGHT : '#000' }]}>
                  {category.categoryName} 
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text>Không có danh mục nào.</Text> 
        )}
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
