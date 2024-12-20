export interface Shop {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Product {
    id: string;
    shopId: string;
    name: string;
    price: number;
    stockLevel: number;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export type CreateShopDTO = Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateShopDTO = Partial<CreateShopDTO>;
  export type CreateProductDTO = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateProductDTO = Partial<CreateProductDTO>;