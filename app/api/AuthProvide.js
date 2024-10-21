import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env'; 

export const authProvider = {
    login: async ({ username, password }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email: username,
                password: password,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            });

            const token = response.data["jwt-token"];
            await AsyncStorage.setItem("jwt-token", token);
            await AsyncStorage.setItem("username", username);
            
            // Gọi API lấy thông tin người dùng
            const userResponse = await axios.get(`${API_BASE_URL}/public/users/email/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Lưu thông tin user vào AsyncStorage
            const userInfo = userResponse.data; 
            await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)); // lưu thông tin user
            
            if (userInfo.address) {
                await AsyncStorage.setItem("address", JSON.stringify(userInfo.address));
            }
            const cartId = userResponse.data.cart.cartId;
            await AsyncStorage.setItem("cartId", cartId.toString());

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(new Error("Sai tài khoản hoặc mật khẩu. Vui lòng thử lại."));
        }
    },
    logout: async () => {
        await AsyncStorage.removeItem("jwt-token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("cartId");
        return Promise.resolve();
    },

    checkError: async ({ status }) => {
        if (status === 401 || status === 403) {
            await AsyncStorage.removeItem("jwt-token");
            await AsyncStorage.removeItem("username");
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: async () => {
        const token = await AsyncStorage.getItem("jwt-token");
        return token ? Promise.resolve() : Promise.reject();
    },

    getPermissions: () => Promise.resolve(),
};
