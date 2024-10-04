import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { CartProvider } from './screens/Home/CartContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/DangNhap/SignUp';
import SignIn from './screens/DangNhap/SignIn';
import Home from './screens/Home';
import MyTab from './screens/Home/MyTab';
import Getstart from './screens/Getstart';
import DetailSanPham from './screens/SanPham/DetailSanPham';
import Payment from './screens/Home/Payment';
import Carts from './screens/Home/Cart';
import Notifications from './screens/Home/Notifications';
// import {MyTabs} from './screens/Home/MyTab';
import SecondRoute from './screens/Home/Profile';
// import FirstPage from './pages/FirstPage';
// import SecondPage from './pages/SecondPage';
// import ThirdPage from './pages/ThirdPage';

const Stack = createStackNavigator();

function App() {
  return (


    <Stack.Navigator initialRouteName="Getstart">
      <Stack.Screen
        name="Getstart"
        component={Getstart}
        options={{
          headerShown: false,
          title: 'Getstart ', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
          title: 'First Page', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      {/* {/* <Stack.Screen
          name="SecondPage"
          component={SecondPage}
          options={{
            title: 'Second Page', //Set Header Title
            headerStyle: {
              backgroundColor: '#f4511e', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        /> */}
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
          title: 'SignIn', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={MyTab}
        options={{
          headerShown: false,
          title: 'Home', //Set Header Title
          headerStyle: {
            backgroundColor: '#f4511e', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="DetailSanPham"
        component={DetailSanPham}
        options={{
          title: 'Chi tiết sản phẩm',
          headerStyle: {
            backgroundColor: '#fff', // Màu nền thanh tiêu đề
          },
          headerTintColor: '#000', // Màu sắc cho nút quay lại và tiêu đề
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#000', // Màu chữ tiêu đề
          },
          headerBackTitle: 'Quay lại',
        }}
      />
      <Stack.Screen name="Cart" component={Carts}
        options={{
          title: 'Giỏ hàng',
          headerStyle: {
            backgroundColor: '#fff', // Màu nền thanh tiêu đề
          },
          headerTintColor: '#000', // Màu sắc cho nút quay lại và tiêu đề
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#000', // Màu chữ tiêu đề
          },
          headerBackTitle: 'Quay lại',
        }}
      />
      {/* <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          title: 'Trang thanh toán',
          
        }}
      /> */}
    <Stack.Screen name="Profile" component={SecondRoute} 
     options={{
      
      title: 'Hoạt động',
      headerStyle: {
        backgroundColor: '#fff', // Màu nền thanh tiêu đề
      },
      headerTintColor: '#000', // Màu sắc cho nút quay lại và tiêu đề
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#000', // Màu chữ tiêu đề
      },
      headerBackTitle: 'Quay lại',
    }}/>
    </Stack.Navigator>

  );
}

export default App;
