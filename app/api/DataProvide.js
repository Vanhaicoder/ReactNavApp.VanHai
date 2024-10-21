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
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}` 
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
                    Authorization: `Bearer ${await AsyncStorage.getItem("jwt-token")}` 
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
};
