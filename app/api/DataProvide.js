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
   
    addProductToCart: async (cartId, productId, quantity) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/public/carts/${cartId}/products/${productId}/quantity/${quantity}`,
                {},  
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
        try {
            const response = await axios.delete(
                `${API_BASE_URL}/public/carts/${cartId}/product/${productId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            console.error("Error removing product from cart:", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    getOrdersByUser: async (emailId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/public/users/${emailId}/orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`,
                },
            });
            return response.data; 
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error.message);
            throw error; 
        }
    },
    // getProductsBySearch: async (searchTerm, pageNumber = 1, pageSize = 10, sortBy = 'id', sortOrder = 'asc') => {
    //     try {
    //         const response = await axios.get(`${API_BASE_URL}/public/products/keyword/${keyword}`, {
    //             params: { searchTerm, pageNumber, pageSize, sortBy, sortOrder },
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}`
    //             },
    //         });
    //         return Promise.resolve(response.data);
    //     } catch (error) {
    //         console.error("Error searching products:", error);
    //         return Promise.reject(new Error("Không thể tìm kiếm sản phẩm. Vui lòng thử lại."));
    //     }
    // },
    
};
