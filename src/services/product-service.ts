import { Product, CreateProductDTO, UpdateProductDTO } from "@/lib/types";
import apiClient from "./api-client";

export const productService = {
  getAll: async () => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (product: CreateProductDTO) => {
    const response = await apiClient.post<Product>("/products", product);
    return response.data;
  },

  update: async (id: string, product: UpdateProductDTO) => {
    const response = await apiClient.patch<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`/products/${id}`);
  },
};
