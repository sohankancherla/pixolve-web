import Sidebar from "@/components/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sm:flex">
        <Sidebar />
        <main>{children}</main>
      </div>
    </>
  );
}
