import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper'; // Import thư viện Swiper

// Lấy chiều rộng của màn hình
const { width } = Dimensions.get('window');

export default function Banner() {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true} // Tự động chuyển đổi
        autoplayTimeout={3} // Chuyển sau mỗi 3 giây
        showsPagination={true} // Hiển thị pagination (chấm nhỏ)
        dotStyle={styles.dotStyle} // Style cho pagination dot
        activeDotStyle={styles.activeDotStyle} // Style cho pagination active dot
        paginationStyle={styles.paginationStyle} // Tùy chỉnh vị trí của pagination
        style={styles.wrapper}
      >
        <ImageBackground
          source={require('../../../assets/images/1.jpg')}
          style={styles.banner}
          resizeMode="cover"
        />
        <ImageBackground
          source={require('../../../assets/images/getstart.jpg')}
          style={styles.banner}
          resizeMode="cover"
        />
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 20, // Khoảng cách dưới banner
  },
  wrapper: {
    height: 200, // Chiều cao của swiper (banner)
  },
  banner: {
    width: width - 20, // Chiều rộng banner trừ padding hai bên
    height: 200, // Chiều cao của banner
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Đảm bảo ảnh không vượt quá biên
    marginHorizontal: 10,
  },
  dotStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  paginationStyle: {
    // bottom: 10, // Đặt vị trí pagination ở phía trong của slider (cách đáy slider 10px)
  },
});
