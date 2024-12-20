import Image from 'next/image';
import { Card } from '@/components/client/ui/card';
import { Star, MapPin, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/client/ui/dropdown-menu';

interface ShopCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const ShopCard = ({
  id,
  name,
  image,
  location,
  rating,
  onEdit,
  onDelete
}: ShopCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={onDelete}
                className="text-red-600"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        
        <div className="mt-2 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ShopCard;