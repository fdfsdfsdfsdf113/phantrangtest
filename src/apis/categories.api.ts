import axiosInstance from "@/configs/instances/axios";
import type { BaseResponse, PaginatedResponse } from "@/types/common.type";
import type { Category } from "@/types/product.type";

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
}

export const categoriesApi = {
  getCategories: async (
    params?: GetCategoriesParams
  ): Promise<BaseResponse<PaginatedResponse<Category>>> => {
    const response = await axiosInstance.get("/categories", { params });
    return response.data;
  },
};
