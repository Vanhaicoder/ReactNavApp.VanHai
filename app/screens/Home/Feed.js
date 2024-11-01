import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimKiem from '../../../components/TimKiem';
import FeedHeader from '../../../components/feedHeader';
import DanhMuc from '../DanhMuc/DanhMuc';
import Banner from '../Slider/Banner';
import SanPham from '../SanPham/SanPham';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Feed = ({ navigation }) => {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchUserInfo = async () => {
    
    try {
      
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setLastName(user.lastName || 'Người dùng'); 
        setFirstName(user.firstName || 'Người dùng')
      }
      
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []); 
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUserInfo();
    } catch (error) {
      console.error("Lỗi khi làm mới dữ liệu:", error);
    }
    setRefreshing(false);
  };

  const data = [
    { key: 'banner' },
    { key: 'danhmuc' },
    { key: 'sanpham' }
  ];

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    ); 
  }

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <FeedHeader feedText={`Chào, ${lastName}`} feedIcon={"user"} notificationCount={0} />
      <TimKiem icon="search" placeholder={"nhập sản phẩm muốn tìm"} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          switch (item.key) {
            case 'banner':
              return <Banner />;
            case 'danhmuc':
              return (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.title}>Danh mục</Text>
                  <DanhMuc onCategorySelect={handleCategorySelect} />
                </View>
              );
            case 'sanpham':
              return (
                <View style={{ marginTop: 10, flex: 1 }}>
                  <Text style={styles.title}>Sản phẩm</Text>
                  <SanPham selectedCategory={selectedCategory} />
                </View>
              );
            default:
              return null;
          }
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default Feed;
