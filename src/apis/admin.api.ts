import axiosInstance from '@/configs/instances/axios';

export const adminApi = {
    loginAdmin: async () => {
        const response = await axiosInstance.post('/admin/login' );
        return response.data;
    }
}