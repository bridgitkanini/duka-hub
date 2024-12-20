import { Shop, CreateShopDTO, UpdateShopDTO } from "@/lib/types";
import apiClient from "./api-client";

export const shopService = {
  getAll: async () => {
    const response = await apiClient.get<Shop[]>("/shops");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Shop>(`/shops/${id}`);
    return response.data;
  },

  create: async (shop: CreateShopDTO) => {
    const response = await apiClient.post<Shop>("/shops", shop);
    return response.data;
  },

  update: async (id: string, shop: UpdateShopDTO) => {
    const response = await apiClient.patch<Shop>(`/shops/${id}`, shop);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/shops/${id}`);
  },
};
