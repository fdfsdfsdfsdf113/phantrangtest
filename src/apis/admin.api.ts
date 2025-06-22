import axiosInstance from "@/configs/instances/axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "@/types/admin.type";

export const adminApi = {
  loginAdmin: async ({
    email,
    password,
  }: LoginPayload): Promise<LoginResponse> => {
    const response = await axiosInstance.post("/admins/login", {
      usernameOrEmail: email,
      password,
    });
    return response.data;
  },

  registerAdmin: async (payload: RegisterPayload): Promise<void> => {
    await axiosInstance.post("/admins/register", payload);
  },
};
