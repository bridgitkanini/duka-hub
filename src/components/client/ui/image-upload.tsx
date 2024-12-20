"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  disabled?: boolean;
  currentImage?: string;
  onUpload: (url: string) => void;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="your_preset_here">
        {({ open }: { open: () => void }) => {
          const onClick = () => {
            open();
          };

          return (
            <button
              type="button"
              disabled={disabled}
              onClick={onClick}
              className="
                relative
                w-[200px]
                h-[200px]
                border-2
                border-dashed
                border-gray-300
                flex
                flex-col
                items-center
                justify-center
                gap-4
                text-gray-600
                hover:opacity-70
                transition
                rounded-lg
              "
            >
              <TbPhotoPlus size={50} />
              <div className="text-sm font-semibold">Click to upload</div>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
