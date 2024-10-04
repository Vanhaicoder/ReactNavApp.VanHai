import * as React from 'react';
import { View, useWindowDimensions, Text, StyleSheet, TextInput, Button, Image, Picker,FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { color } from '../SanPham/ListSanPham';
import SanPham from '../SanPham/SanPhamLienQuan';
const accountData = {
  avatar: require('../../../assets/images/avt.jpg'),
  ten: 'Van Hai',
  email: 'vanhai@gmail.com',
  diachi: '8/15/15 đường 147, Phước Long B, Quận 9',
  thanhpho: 'Hcm',
  sdt: '0981487674',
  gioitinh: 'Nam',
};
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
const FirstRoute = ({}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState(accountData);
  const navigation = useNavigation();

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handleSwitchAccount = () => {
    navigation.navigate('SignIn');  
  };

  const handleLogout = () => {
    
    navigation.navigate('SignIn');  
  };

  return (
    <View style={styles.container}>
      <Image source={formData.avatar} style={styles.avatar} />
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.label}>Tên khách hàng</Text>
          <TextInput
            style={styles.input}
            value={formData.ten}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('ten', value)}
          />
        </View>
        <View style={styles.flex1}>
          <Text style={styles.label}>Giới tính</Text>
          <TextInput
            style={styles.input}
            value={formData.gioitinh}
            editable={isEditing}
            onChangeText={(value) => handleInputChange('gioitinh', value)}
          />
        </View>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('email', value)}
      />

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={formData.diachi}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('diachi', value)}
      />

      <Text style={styles.label}>Thành phố</Text>
      <TextInput
        style={styles.input}
        value={formData.thanhpho}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('thanhpho', value)}
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={formData.sdt}
        editable={isEditing}
        onChangeText={(value) => handleInputChange('sdt', value)}
      />

      <Button title={isEditing ? "Lưu" : "Chỉnh sửa"} onPress={() => setIsEditing(!isEditing)} />
      <View style={styles.buttonRow}>
        <Button
          onPress={handleSwitchAccount}
          title='Đổi tài khoản'
          // style={{}}
        />
        <Button
          title='Đăng xuất'
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Đã xem gần đây</Text>
          <SanPham />
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
    backgroundColor: '#fff',
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
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  flex1: {
    flex: 1,
    marginRight: 10,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  // buttonRow: {
  //   // flexDirection: 'row',
    
  //   marginTop: 20,
  // },
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
