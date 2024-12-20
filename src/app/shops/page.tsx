import MainLayout from "@/components/layout/main-layout";
import { shopService } from "@/services/shop-service";
// import { DataTable } from '@/components/server/data-table';
import { Button } from "@/components/client/ui/button";

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
        {/* <DataTable data={shops} columns={[
        { accessor: 'name', header: 'Shop Name' },
        { accessor: 'description', header: 'Description' },
        { accessor: 'actions', header: 'Actions' }
      ]} /> */}
      </div>
    </MainLayout>
  );
}
