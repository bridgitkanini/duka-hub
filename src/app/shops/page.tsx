import MainLayout from "@/components/layout/main-layout";
import { shopService } from "@/services/shop-service";
import { DataTable } from "@/components/server/data-table";
import { Button } from "@/components/client/ui/button";
import ShopCard from "@/components/server/shop-card";

export default async function ShopsPage() {
  const shops = await shopService.getAll();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Shops Management</h1>
          <Button
            variant="default"
            size="lg"
            isLoading={false}
            onClick={() => console.log("clicked")}
          >
            Create Shop
          </Button>
        </div>
        <ShopCard
          id="1"
          name="Shop Name"
          image="/shop-image.jpg"
          location="Nairobi, Kenya"
          rating={4}
          onEdit={() => console.log("edit")}
          onDelete={() => console.log("delete")}
        />
        <DataTable
          data={shops}
          columns={[
            { accessorKey: "name", header: "Shop Name" },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "actions", header: "Actions" },
          ]}
        />
      </div>
    </MainLayout>
  );
}
