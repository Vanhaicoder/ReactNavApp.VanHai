import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env'; 

export const dataProvider = {
    getCategories: async (pageNumber = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/categories`, {
                params: { pageNumber, pageSize, sortBy, sortOrder },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`,
                    withCredentials: true,
                     
                },
            });
            return Promise.resolve(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            return Promise.reject(new Error("Không thể lấy danh sách danh mục. Vui lòng thử lại."));
        }
    },

    getProducts: async (pageNumber = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/products`, {
                params: { pageNumber, pageSize, sortBy, sortOrder },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}` ,
                    
                },
            });
            return Promise.resolve(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            return Promise.reject(new Error("Không thể lấy danh sách sản phẩm. Vui lòng thử lại."));
        }
    },

    getProductsByCategory: async (categoryId, pageNumber = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/categories/${categoryId}/products`, {
                params: { pageNumber, pageSize, sortBy, sortOrder },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}` 
                },
            });
            return Promise.resolve(response.data);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            return Promise.reject(new Error("Không thể lấy danh sách sản phẩm theo danh mục. Vui lòng thử lại."));
        }
    },
    // Thêm sản phẩm vào giỏ hàng
    addProductToCart: async (cartId, productId, quantity) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/public/carts/${cartId}/products/${productId}/quantity/${quantity}`,
                {},  // API không yêu cầu body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
            throw error; 
        }
    },

    // Lấy giỏ hàng theo emailId và cartId
    getCartById: async (emailId, cartId) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/public/users/${emailId}/carts/${cartId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error.message);
            throw error; 
        }
    },
    updateCartQuantity: async (cartId, productId, newQuantity) => {
        const jwtToken = await AsyncStorage.getItem("jwt-token");
        if (!jwtToken) {
            console.error("Không có jwt-token. Người dùng có thể cần đăng nhập lại.");
            throw new Error("Unauthorized");
        }
    
        try {
            const response = await axios.put(
                `${API_BASE_URL}/public/carts/${cartId}/products/${productId}/quantity/${newQuantity}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng sản phẩm:", error.message);
            throw error;
        }
    },
    
    
    deleteProductFromCart: async (cartId, productId) => {
        const jwtToken = await AsyncStorage.getItem("jwt-token");
        if (!jwtToken) {
            console.error("No JWT token found. User may need to log in again.");
            throw new Error("Unauthorized");
        }
    
        console.log("JWT Token being sent:", jwtToken);
    
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/public/carts/${cartId}/products/${productId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            console.log("Product removed successfully:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error removing product from cart:", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    



};
