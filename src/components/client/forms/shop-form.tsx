"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shop, CreateShopDTO } from "@/lib/types";
import { shopService } from "@/services/shop-service";

const shopSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logoUrl: z.string().url("Must be a valid URL"),
});

interface ShopFormProps {
  initialData?: Shop;
  onSuccess?: () => void;
}

export function ShopForm({ initialData, onSuccess }: ShopFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShopDTO>({
    resolver: zodResolver(shopSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: CreateShopDTO) => {
    try {
      setIsSubmitting(true);
      if (initialData) {
        await shopService.update(initialData.id, data);
      } else {
        await shopService.create(data);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Failed to save shop:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shop Name
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
          Logo URL
        </label>
        <input
          {...register("logoUrl")}
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
        {errors.logoUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.logoUrl.message}</p>
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
          ? "Update Shop"
          : "Create Shop"}
      </button>
    </form>
  );
}
