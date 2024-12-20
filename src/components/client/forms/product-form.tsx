// components/client/forms/product-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Product, CreateProductDTO } from "@/lib/types";
import { productService } from "@/services/product-service";
import ImageUpload from "@/components/client/ui/image-upload";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().min(0, "Price must be positive"),
  stockLevel: z.number().min(0, "Stock level must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  shopId: z.string().min(1, "Shop is required"),
});

interface ProductFormProps {
  initialData?: Product;
  shops: { id: string; name: string }[];
  onSuccess?: () => void;
}

export function ProductForm({
  initialData,
  shops,
  onSuccess,
}: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProductDTO>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: CreateProductDTO) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        await productService.update(initialData.id, data);
      } else {
        await productService.create(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Shop</label>
        <select
          {...register("shopId")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Select a shop</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
        {errors.shopId && (
          <p className="mt-1 text-sm text-red-600">{errors.shopId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          {...register("name")}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            {...register("price", { valueAsNumber: true })}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock Level
          </label>
          <input
            {...register("stockLevel", { valueAsNumber: true })}
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {errors.stockLevel && (
            <p className="mt-1 text-sm text-red-600">
              {errors.stockLevel.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <ImageUpload
          currentImage={initialData?.imageUrl}
          onUpload={(url) => setValue("imageUrl", url)}
          onChange={(url) => setValue("imageUrl", url)}
          onRemove={() => setValue("imageUrl", "")}
          value={initialData?.imageUrl ? [initialData.imageUrl] : []}
        />
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting
          ? "Saving..."
          : initialData
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}
