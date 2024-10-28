import * as React  from 'react';
import { View, useWindowDimensions, Text, StyleSheet, TextInput, Button, Image, Picker,FlatList,ScrollView ,Alert} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import SanPham from '../SanPham/SanPham';import { color } from '../SanPham/ListSanPham';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authProvider } from '../../api/AuthProvide'; 
import { API_BASE_URL } from '@env';
import Swal from 'sweetalert2';
// const accountData = {
//   avatar: require('../../../assets/images/avt.jpg'),
//   ten: 'Van Hai',
//   email: 'vanhai@gmail.com',
//   diachi: '8/15/15 đường 147, Phước Long B, Quận 9',
//   thanhpho: 'Hcm',
//   sdt: '0981487674',
//   gioitinh: 'Nam',  
// };
const notifications = [
  { id: '1', title: 'Khuyến mãi', description: 'Đại hạ giá, sale toàn cầu!', count: 18 },
  { id: '2', title: 'Live & Video', description: 'Săn mã 50k đơn 0đ', count: 13 },
  { id: '3', title: 'Thông tin Tài chính', description: 'DEAL ĐỘC QUYỀN TRẢ GÓP 0%!', count: 12 },
  { id: '4', title: 'Cập nhật Đơn hàng', description: 'van.hai04 ơi! Nhớ điện Ngày Sinh chính...', count: 12 },
  { id: '5', title: 'Giải Thưởng Khách hàng', description: 'Duy nhất hôm nay tại Quà tặng  Xu', count: 13 },
];
const NotificationItem = ({ title, description, count }) => (
  <View style={styles.notificationItem}>
    <View style={styles.notificationContent}>
      <Text style={styles.notificationTitle}>{title}</Text>
      <Text style={styles.notificationDescription}>{description}</Text>
    </View>
    <View style={styles.notificationCount}>
      <Text style={styles.notificationCountText}>{count}</Text>
    </View>
  </View>
);
const FirstRoute = () => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const loadUserInfo = async () => {
      const userData = await AsyncStorage.getItem("userInfo");
      if (userData) {
        setUserInfo(JSON.parse(userData));
      }
    };

    loadUserInfo();
  }, []);

  const handleInputChange = (key, value) => {
    if (key === 'address') {
      setUserInfo({
        ...userInfo,
        address: { ...userInfo.address, ...value }, // Cập nhật địa chỉ
      });
    } else {
      setUserInfo({ ...userInfo, [key]: value });
    }
  };

  if (!userInfo) return <Text>Loading...</Text>; // Hiển thị loading trong lúc lấy dữ liệu
  // const updateUserInfo = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("jwt-token");
  //     const response = await axios.put(`${API_BASE_URL}/public/users`, userInfo, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     console.log("Cập nhật thành công:", response.data);
  //     // Bạn có thể cập nhật lại thông tin người dùng sau khi cập nhật thành công
  //     await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  //   } catch (error) {
  //     console.error("Cập nhật không thành công:", error);
  //   }
  // };

  const handleSwitchAccount = () => {
    navigation.navigate('SignIn');  
  };

  const handleLogout = async () => {
    Alert.alert(
        "Xác nhận",
        "Bạn có chắc chắn muốn đăng xuất không?",
        [
            {
                text: "Hủy",
                style: "cancel",
            },
            {
                text: "Đồng ý",
                onPress: async () => {
                    try {
                        await authProvider.logout();
                        Alert.alert("Đăng xuất thành công!");
                        navigation.navigate('SignIn');
                    } catch (error) {
                        console.error('Đăng xuất không thành công:', error);
                    }
                },
            },
        ]
    ); 
};
  return (
    <ScrollView style={styles.container}>
      <Image source={userInfo.avatar ? { uri: userInfo.avatar } : require('../../../assets/images/avt.jpg')} style={styles.avatar} />
      <View style={styles.inputRow}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Họ</Text>
          <TextInput
            style={styles.input}
            value={userInfo.firstName}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.label}>Tên</Text>
          <TextInput
            style={styles.input}
            value={userInfo.lastName}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={userInfo.email}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={userInfo.mobileNumber}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('mobileNumber', value)}
      />
      <Text style={styles.label}>Đường</Text>
      <TextInput
        style={styles.input}
        value={userInfo.address ? `${userInfo.address.street}` : ''} 
        editable={isEditing}
        onChangeText={(value) => handleInputChange('address', { street: value })} 
      />
      <Text style={styles.label}>Thành Phố</Text>
      <TextInput
        style={styles.input}
        value={userInfo.address ? `${userInfo.address.city}` : ''} 
        editable={isEditing}
        onChangeText={(value) => handleInputChange('address', { street: city })} 
      />
      <View style={styles.inputRow}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Tỉnh</Text>
          <TextInput
            style={styles.input}
            value={userInfo.address ? `${userInfo.address.state}` : ''} 
            editable={isEditing}
            onChangeText={(value) => handleInputChange('address', { state: value })} 
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.label}>Mã bưu chính</Text>
          <TextInput
            style={styles.input}
            value={userInfo.address ? `${userInfo.address.pincode}` : ''} 
            editable={isEditing}
            onChangeText={(value) => handleInputChange('address', { pincode: value })} 
          />
        </View>
      </View>
      {/* <Text style={styles.label}>Quốc gia</Text>
      <TextInput
        style={styles.input}
        value={userInfo.address ? `${userInfo.address.country}` : ''} 
        editable={isEditing}
        onChangeText={(value) => handleInputChange('address', { country: value })} 
      /> */}
      <View style={styles.buttonRow}>
      <Button title={isEditing ? "Lưu" : "Chỉnh sửa"} onPress={() => { 
            if (isEditing) {
              // updateUserInfo(); // Gọi hàm cập nhật thông tin
            }
            setIsEditing(!isEditing);
          }} 
        />
        <Button title='Đăng xuất' onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};
const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Đã xem gần đây</Text>
          {/* <SanPham /> */}
        </View>
        <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold',padding: 5 }}>Thông báo</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            title={item.title}
            description={item.description}
            count={item.count}
          />
        )}
      />
    </View>
  </View>
  
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Tài khoản' },
    { key: 'second', title: 'Hoạt động' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 7,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  flex1: {
    flex: 1,
    marginRight: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555',
  },
  notificationCount: {
    backgroundColor: '#f44',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
