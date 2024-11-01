import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './Feed';
import Notifications from './Notifications';
import Profile from './Profile';
import Carts from './Cart';
import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { CartContext } from './CartContext';

const Tab = createBottomTabNavigator();

export default function MyTab() {
  const { productCount } = useContext(CartContext);


  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Carts}
        options={{
          headerShown: false,
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: productCount > 0 ? productCount : null,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarLabel: 'Đơn hàng',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="text-box" color={color} size={size} />
              <View
                style={{
                  position: 'absolute',
                  right: -6,
                  top: -3,
                  backgroundColor: 'red',
                  borderRadius: 6,
                  width: 10,
                  height: 10,
                }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Người dùng"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}