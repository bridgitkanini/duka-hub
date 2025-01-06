import MainLayout from "@/components/layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="bg-white rounded-lg p-6 text-black">
        <h2 className="text-2xl font-bold mb-4 ">Welcome to Duka Hub</h2>
        <p>Select products or shops from the sidebar to get started.</p>
      </div>
    </MainLayout>
  );
}
